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
  title: `The Sandbox: buy land and navigate the metaverse | Velo`,
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
          cryptoName="The Sandbox"
          cryptoOverview="Buy land and navigate the metaverse"
          cryptoPoints={[
            {
              title: 'Monetization in the metaverse:',
              description:
                'The company created its own store where items from the metaverse can be purchased and sold. Use of the SAND token is required to trade on the platform. Therefore, the asset should capture value as the volume of users grows, as this would increase demand for SAND.',
            },
            {
              title: 'Professional management:',
              description: `The Sandbox team of developers is respected in the crypto market for good management and innovations in the virtual environment. The team combines user participation with that of large investors, maintaining a balance between decentralized governance and the traditional model.`,
            },
            {
              title: 'Great partnerships:',
              description: `Its platform has a large part of active gaming and metaverse users in the crypto market. Furthermore, it was adopted by global figures and large companies such as Snoop Dogg, Paris Hilton, The Walking Dead, Atari, Gucci and Adidas, for example.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-22.svg"
            alt="velo-svg-22"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="The Sandbox"
          cryptoOverview="The Sandbox is an expanding blockchain-based metaverse that allows users to create, play and earn in a three-dimensional virtual environment. It combines elements of creation, gameplay and virtual economy into a single platform."
        />
        <HowToBuyCrypto cryptoName="The Sandbox" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title:
                'How can I create my own game or experience in The Sandbox?',
              description: `You can use The Sandbox's intuitive authoring tool to create your virtual content, no coding required.`,
            },
            {
              title: 'How does the virtual economy work in The Sandbox?',
              description:
                'You can earn SAND by creating and contributing to the metaverse, and then use SAND to purchase assets and services within the platform.',
            },
            {
              title: 'What are LANDs in The Sandbox?',
              description: `LANDs are parcels of virtual land that users can own and develop, creating unique experiences in each.`,
            },
            {
              title: 'How can I make money in The Sandbox?',
              description:
                'You can make money by selling assets, games or experiences you create, or even renting your LAND to other players.',
            },
            {
              title: 'Is The Sandbox accessible to everyone?',
              description:
                'Yes, The Sandbox is designed to be accessible to creators, players, and enthusiasts regardless of skill level.',
            },
            {
              title: 'What are typical use cases for The Sandbox?',
              description:
                'In addition to creation and gaming, The Sandbox is used for socializing, virtual education, digital art, and more.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
