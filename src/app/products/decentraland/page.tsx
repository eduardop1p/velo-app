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
  title: `Decentraland: explore the crypto market’s first metaverse | Velo`,
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
          cryptoName="Decentraland"
          cryptoOverview="Explore the crypto market’s first metaverse"
          cryptoPoints={[
            {
              title: 'Pioneer in virtual worlds:',
              description:
                'It was one of the first relevant projects to create a decentralized metaverse. Built on Ethereum, Decentraland allows users to explore and monetize their virtual lands. The MANA token is essential to the project because it is used for payments within the ecosystem.',
            },
            {
              title: 'Browse, build and monetize:',
              description: `In the Decentraland metaverse, users can explore the open world, interact with other players and discover new environments such as art galleries, music shows, events and games.`,
            },
            {
              title: 'Endless use cases:',
              description: `In addition to being able to create various digital assets and new applications in the virtual world, the user can consume services, attend live shows, hold conferences, participate in exhibitions and even parties, all in an immersive way. Its platform was adopted by global figures and large companies such as Samsung, Carrefour, Adidas, HSBC and Tommy Hilfiger, in addition to being chosen to host the MVFW, Metaverse Fashion Week, in 2022.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-23.svg"
            alt="velo-svg-23"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Decentraland"
          cryptoOverview="Decentraland is a blockchain-based decentralized metaverse where you can own, build and explore virtual properties. It's a shared, collaborative virtual universe where you are the creator and explorer."
        />
        <HowToBuyCrypto cryptoName="Decentraland" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How can I create my own property on Decentraland?',
              description: `You can use the scene editor to create your own virtual property, customizing it with buildings, art, games, and more.`,
            },
            {
              title: 'How does the virtual economy work in Decentraland?',
              description:
                'You can earn MANA by crafting, participating in events, selling assets, and renting properties. MANA is the currency used within the metaverse.',
            },
            {
              title: 'What are LANDs in Decentraland?',
              description: `LANDs are parcels of virtual land that users can own and develop. They are the space where creativity flourishes.`,
            },
            {
              title: 'What are some ways to socialize in Decentraland?',
              description:
                'You can attend parties, conferences, art exhibitions, and social events across the metaverse.',
            },
            {
              title: 'Is Decentraland accessible to everyone?',
              description:
                'Yes, Decentraland is an open platform accessible to people of all abilities and interests.',
            },
            {
              title: 'What are common use cases for Decentraland?',
              description:
                'In addition to creation and gaming, Decentraland is used for virtual education, social events, digital art, and more.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
