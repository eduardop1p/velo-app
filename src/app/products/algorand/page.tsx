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
  title: 'Algorand: the innovative cryptocurrency | Velo',
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
          cryptoName="Algorand"
          cryptoOverview="Smart contracts protocol focused on being scalable, secure and decentralized"
          cryptoPoints={[
            {
              title: 'Fast and cheap blockchain',
              description:
                'Algorand is a smart contracts platform. Through blockchain technology, it allows the creation and implementation of decentralized applications that can be used by users at any time quickly and cheaply.',
            },
            {
              title: 'Focus on sustainability',
              description: `Considered the “greenest blockchain”, Algorand is extremely efficient in its energy consumption. Possessing a consensus mechanism that does not require much computational power, it became one of the first first-layer networks with negative carbon emissions, fitting the ESG narrative.`,
            },
            {
              title: 'Involvement with CBDCs',
              description:
                'Having an architecture that values ​​security and transparency, the network has been studied by several government bodies that are interested in using its architecture to implement central bank digital currencies, or CBDCs (Central Bank Digital Currencies), in their nations.',
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-16.svg"
            alt="velo-svg-16"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Algorand"
          cryptoOverview="Algorand is a high-performance and secure blockchain suitable for a variety of applications."
        />
        <HowToBuyCrypto cryptoName="Algorand" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
