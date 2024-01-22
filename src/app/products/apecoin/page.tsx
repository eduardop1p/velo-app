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
import UnavailablePage from '@/components/UnavailablePage';

export const metadata: Metadata = {
  title: `ApeCoin: Yuga Labs Metaverse Governance and Utility | Velo`,
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
          cryptoName="ApeCoin"
          cryptoOverview="Yuga Labs metaverse governance and utility token."
          cryptoPoints={[
            {
              title: 'Largest NFT player on the market',
              description:
                'ApeCoin is the governance and utility token of the ecosystem built by Yuga Labs. The company is responsible for creating the largest NFT collection in the world, the Bored Ape Yatch Club, and for the rights to some of the most popular NFT collections on the market.',
            },
            {
              title: 'Exposure to the Metaverse',
              description: `The cryptocurrency is the main currency of exchange within the Otherside metaverse, under development by Yuga Labs. The proposal is to be a platform where developers can easily create games and experiences, while everyone will need the APE token to buy and sell digital assets.`,
            },
            {
              title: 'Brand strength',
              description: `Yuga Labs gained attention in the media spotlight after its NFT collections became a hype in the last bull market. APE tokens were launched with an airdrop (donation) for NFT holders to interact with the company's metaverse and strengthen the community, demonstrating Yuga Labs' ability to generate value for its users and ecosystem.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-33.svg"
            alt="velo-svg-33"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="ApeCoin"
          cryptoOverview="Apecoin is a digital currency focused on the Asia-Pacific region, offering innovative payment options."
        />
        <HowToBuyCrypto cryptoName="ApeCoin" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
