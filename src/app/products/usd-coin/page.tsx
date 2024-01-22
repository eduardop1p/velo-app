import { Metadata } from 'next';
import Image from 'next/image';

import formatDataCrypto from '@/services/formtaDataCrypto';
import { CryptoType } from '@/components/header';
import InfoCrypto from '@/components/products/infoCrypto';
import WhatIsCrypto from '@/components/products/whatIsCrypto';
import HowToBuyCrypto from '@/components/products/howToBuyCrypto';
import InvestOtherCryptos from '@/components/products/investOtherCryptos';
import RegisterNewsletterCrypto from '@/components/products/registerNewsletterCrypto';
import CryptoDoubts from '@/components/products/cryptoDoubts';
import Footer from '@/components/footer';
import UnavailablePage from '@/components/UnavailablePage';

export const metadata: Metadata = {
  title: 'USDC: the dollar-backed stablecoin | Velo',
};

export default async function Page() {
  let dataCryptoassets: CryptoType[];

  try {
    const resCryptoassets = await fetch(
      `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,XRP,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
      {
        method: 'GET',
        next: {
          revalidate: 60,
        },
      }
    );
    const metaData = await resCryptoassets.json();
    dataCryptoassets = formatDataCrypto(
      'full-data',
      metaData.RAW
    ) as CryptoType[];
  } catch {
    return <UnavailablePage />;
  }

  return (
    <>
      <main className="mt-20">
        <InfoCrypto
          cryptoName="USD Coin"
          cryptoOverview="The dollar-backed stablecoin"
          cryptoPoints={[
            {
              title: 'Stability',
              description:
                'Because it is pegged to the US dollar, USDC is a currency with low volatility and risk directly linked to that of the US national currency USD.',
            },
            {
              title: 'Reliability',
              description: `It is issued and backed by large, trusted and audited blockchain companies, and has a high level of transparency about the backing reserves in the market.`,
            },
            {
              title: 'Integration and inclusion',
              description:
                'Price-backed digital (crypto) currencies allow interaction between the traditional financial system and the digital economy of blockchain networks. It allows the inclusion of 1.7 billion people without access to the banking system and who do not want to expose themselves to the risk of highly volatile cryptocurrencies into the financial system, in addition to offering faster and cheaper global transactions.',
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-17.svg"
            alt="velo-svg-17"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="USD Coin"
          cryptoOverview="The USD Coin (USDC) is a stablecoin pegged to the U.S. dollar, designed to maintain a value equivalent to $1. Issued by regulated financial entities, USDC provides price stability and is widely used as a store of value and medium of exchange in the cryptocurrency ecosystem."
        />
        <HowToBuyCrypto cryptoName="USD Coin" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does USDC maintain its stability?',
              description:
                'USDC maintains its stability by anchoring each coin in circulation to a US dollar held in reserve.',
            },
            {
              title: 'How can I check the transparency of USDC reserves?',
              description:
                'USDC reserves are regularly audited by independent companies and the results are publicly accessible.',
            },
            {
              title: 'What are common use cases for USDC?',
              description:
                'USDC is widely used to facilitate exchange trades, remittances, payments, and as a store of value.',
            },
            {
              title: 'Is USDC safe?',
              description:
                'Yes, USDC is designed with security in mind, including regular reserve audits and regulatory compliance.',
            },
            {
              title: 'Can I earn interest by holding USDC?',
              description:
                'You can convert USDC to fiat currency or other cryptocurrencies on exchanges that offer this functionality.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
