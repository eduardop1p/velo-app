import Image from 'next/image';
import { Metadata } from 'next';

import formatDataCrypto from '@/services/formtaDataCrypto';
import { CryptoType } from '@/components/header';
import InfoCrypto from '@/components/products/infoCrypto';
import WhatIsCrypto from '@/components/products/whatIsCrypto';
import HowToBuyCrypto from '@/components/products/howToBuyCrypto';
import InvestOtherCryptos from '@/components/products/investOtherCryptos';
import RegisterNewsletterCrypto from '@/components/products/registerNewsletterCrypto';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Dogecoin: peer-to-peer “meme-coin” | Velo',
};

export default async function Page() {
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
  const dataCryptoassets = formatDataCrypto(
    'full-data',
    metaData.RAW
  ) as CryptoType[];

  return (
    <>
      <main className="mt-20">
        <InfoCrypto
          cryptoName="Dogecoin"
          cryptoOverview="The viral cryptocurrency that enchants the world with its unique
          charm and disruptive potential."
          cryptoPoints={[
            {
              title: 'Popularity and engaged community',
              description:
                'Dogecoin has a loyal fan base and an extremely engaged community, which has driven its popularity and acceptance as a form of payment. This community, often driven by public figures such as Elon Musk, has been crucial to the visibility and adoption of the cryptoactive, making it one of the most well-known and discussed tokens on the market.',
            },
            {
              title: 'Affordable Mining',
              description:
                'Unlike Bitcoin, which has a fixed maximum supply, Dogecoin has an inflationary controlled supply, meaning that new coins continue to be created at a predefined rate. This could make the crypto asset more resilient to the loss of mining incentives in the long term. Furthermore, Dogecoin mining uses the Scrypt algorithm, which is less demanding in terms of energy and hardware, allowing more people to participate in the mining process.',
            },
            {
              title: 'Growing acceptance as a form of payment',
              description:
                'Although it began as a meme currency, Dogecoin is gaining acceptance as a form of payment in a growing number of stores and services both online and offline. With community support and increased adoption, Dogecoin has the potential to become a viable option for everyday transactions and value transfers, which could further increase its usage and value in the market.',
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-12.svg"
            alt="velo-svg-12"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Dogecoin"
          cryptoOverview="Dogecoin is a meme-based digital currency characterized by low-cost transactions."
        />
        <HowToBuyCrypto cryptoName="Dogecoin" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
