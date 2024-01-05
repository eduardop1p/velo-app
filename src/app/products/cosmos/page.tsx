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
  title: `Cosmos: interconnected blockchain network | Velo`,
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
          cryptoName="Cosmos"
          cryptoOverview="Smart contracts platform focused on interoperability."
          cryptoPoints={[
            {
              title: 'The internet of blockchains',
              description:
                'Cosmos is a smart contract platform focused on interoperability. Through its modular architecture, the network functions as a hub that has several spaces that can be used by developers to create intercommunicable blockchains and dApps.',
            },
            {
              title: 'Vast ecosystem',
              description: `Being a modular blockchain, it has an ecosystem extremely full of dApps that serve the most diverse purposes, from solutions focused on decentralized finance to metaverse experiences and NFTs. As the network works intercommunicatively, all these platforms can interact with each other.`,
            },
            {
              title: 'Ease of use',
              description: `Through the Cosmos SDK build tool, developers can easily program any decentralized solutions within the network. Furthermore, the intuitive interface allows users to navigate the Cosmos ecosystem with ease, which positively reflects on the blockchain adoption curve.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-32.svg"
            alt="velo-svg-32"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Cosmos"
          cryptoOverview="Smart contracts platform focused on interoperability."
        />
        <HowToBuyCrypto cryptoName="Cosmos" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
