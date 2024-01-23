import { Metadata } from 'next';
import Image from 'next/image';

import { CryptoType } from '@/components/header';
import InfoCrypto from '@/components/products/infoCrypto';
import WhatIsCrypto from '@/components/products/whatIsCrypto';
import HowToBuyCrypto from '@/components/products/howToBuyCrypto';
import InvestOtherCryptos from '@/components/products/investOtherCryptos';
import RegisterNewsletterCrypto from '@/components/products/registerNewsletterCrypto';
import CryptoDoubts from '@/components/products/cryptoDoubts';
import Footer from '@/components/footer';
import UnavailablePage from '@/components/UnavailablePage';
import fetchGetFullCryptos from '@/services/fetchGetFullCryptos';

export const metadata: Metadata = {
  title: `MakerDAO: the decentralized finance revolution | Velo`,
};

export default async function Page() {
  let dataCryptoassets: CryptoType[];

  try {
    dataCryptoassets = await fetchGetFullCryptos();
  } catch {
    return <UnavailablePage />;
  }

  return (
    <>
      <main className="mt-20">
        <InfoCrypto
          cryptoName="MakerDAO"
          cryptoOverview="TA decentralized lending protocol responsible for the DAI token, a stablecoin"
          cryptoPoints={[
            {
              title: 'One of the main projects in the DeFi sector',
              description:
                'Maker is a lending platform, a pioneer in the DeFi sector. Through blockchain technology, it allows users to lend and borrow liquidity by depositing crypto assets as collateral.',
            },
            {
              title: 'Creator of the first decentralized stablecoin',
              description: `The platform is responsible for DAI, the largest decentralized stablecoin in the world. By depositing crypto assets such as ether at Maker, any user can mint DAI proportionally, being able to expose themselves to the dollar without the need to sell the tokens used as collateral.`,
            },
            {
              title: 'Reliable and efficient',
              description: `One of the oldest protocols in the crypto ecosystem, it has one of the best teams of developers on the market and a platform with a great reputation.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-28.svg"
            alt="velo-svg-28"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="MakerDAO"
          cryptoOverview="MakerDAO is a DeFi platform that operates on the Ethereum blockchain. It allows users to collateralize digital assets such as Ether (ETH) to create the stablecoin Dai (DAI), which is designed to maintain a 1:1 peg with the US dollar."
        />
        <HowToBuyCrypto cryptoName="MakerDAO" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does Dai creation work on MakerDAO?',
              description: `Users lock digital assets like ETH in a smart contract called Collateralized (CDP) and generate Dai based on the value of that collateral.`,
            },
            {
              title: 'What is a CDP (Collateralized) at MakerDAO?',
              description:
                'A CDP is a smart contract that allows users to lock up digital assets as collateral to create Dai.',
            },
            {
              title: 'How does Dai maintain its stability against the dollar?',
              description: `Dai's stability is maintained through market and arbitrage mechanisms that adjust supply and demand.`,
            },
            {
              title: 'What is the MKR token and what is its role in MakerDAO?',
              description: `The MKR token is used for governance and stability of the MakerDAO system, with MKR holders having influence on the platform's decisions.`,
            },
            {
              title: 'Is MakerDAO safe?',
              description:
                'MakerDAO is built with a focus on security, but users must take security measures when interacting with DeFi and cryptocurrencies.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
