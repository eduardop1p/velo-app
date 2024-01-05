import { Metadata } from 'next';
import Image from 'next/image';

import formatDataCrypto from '@/services/formtaDataCrypto';
import { CryptoType } from '@/components/header';
import InfoCrypto from '@/components/products/infoCrypto';
import WhatIsCrypto from '@/components/products/whatIsCrypto';
import HowToBuyCrypto from '@/components/products/howToBuyCrypto';
import InvestOtherCryptos from '@/components/products/investOtherCryptos';
import RegisterNewsletterCrypto from '@/components/products/registerNewsletterCrypto';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Tether: Cryptocurrency Pegged to US Dollar Value | Velo',
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
          cryptoName="Tether"
          cryptoOverview="Stable crypto tied to the dollar for stability. Widely used in crypto for payments and digital reserves, bridging traditional assets to the blockchain."
          cryptoPoints={[
            {
              title: 'Value Stability',
              description:
                'Tether is known for its stability, maintaining close parity with the US dollar. This provides users with a cryptocurrency option that is less volatile compared to other digital currencies.',
            },
            {
              title: 'Facilitator of Efficient Transactions',
              description: `As a stable cryptocurrency, Tether is often used as an efficient medium of exchange in the crypto ecosystem. Its stable nature and quick transferability make it a popular choice for daily transactions and value transfers.`,
            },
            {
              title: 'Integration between Traditional and Crypto Assets',
              description:
                'Tether serves as a bridge between the traditional finance world and the blockchain environment. By being pegged to the value of the dollar, USDT allows investors and users to navigate between traditional and crypto assets, facilitating a smooth transition between these two financial realms.',
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-18.svg"
            alt="velo-svg-18"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Tether"
          cryptoOverview="Tether is a stable cryptocurrency, pegged to the dollar. Widely utilized for value stability and efficient transactions, Tether facilitates payments and digital reserves in the crypto ecosystem, serving as a bridge between traditional assets and the blockchain universe"
        />
        <HowToBuyCrypto cryptoName="Tether" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
