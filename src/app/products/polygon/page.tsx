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
  title: `Matic: Ethereum's leading scaling solution | Velo`,
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
          cryptoName="Polygon"
          cryptoOverview="The leading Ethereum scaling solution"
          cryptoPoints={[
            {
              title: 'Need',
              description:
                'Polygon, the company behind the MATIC token, is the leading scaling solution for creating new Ethereum blockchains. The network refers to itself as the "Ethereum internet of blockchains" because one of its main missions is to support a multi-chain ecosystem.',
            },
            {
              title: 'Cost benefit',
              description: `Polygon's ecosystem of smart contracts and functionalities allow access to the Ethereum network with greater agility, low transaction costs and solutions ranging from user identification (Polygon ID) to asset transaction solutions between chains (bridges). The network infrastructure also allows the development of various games and applications. The asset has several partnerships with real-world companies, such as Disney, Google and Instagram, among others.`,
            },
            {
              title: 'Capitalization',
              description: `With a market capitalization of US$6 billion, they have already received investment from several Venture Capital funds, with the latest round of US$450 million led by Sequoia Capital India and with the participation of other major players such as Tiger Global, SoftBank, Galaxy Digital, Republic Capital, Makers Fund, Alameda Research, Alan Howard, Dune Ventures, Alexis Ohanian's Seven Seven Six, Steadview Capital, Unacademy, Elevation Capital, Animoca Brands, Spartan Fund, Dragonfly Capital, Variant Fund and Sino Global Capital.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-19.svg"
            alt="velo-svg-19"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Polygon"
          cryptoOverview="A scaling solution for the Ethereum network designed to accelerate the adoption of decentralized applications and improve UX. It offers a series of solutions, including sidechains, to increase the processing capacity of Ethereum."
        />
        <HowToBuyCrypto cryptoName="Polygon" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does Polygon improve Ethereum scalability?',
              description: `Polygon uses sidechains and scaling solutions to alleviate congestion on the Ethereum network, enabling faster and cheaper transactions.`,
            },
            {
              title: 'What are the benefits of using Polygon for developers?',
              description:
                'Polygon simplifies DApp development, provides security and Ethereum compatibility, and reduces transaction costs.',
            },
            {
              title:
                'What is the MATIC token and what is its role in the Polygon network?',
              description: `The MATIC token is used to pay transaction fees, governance, and as rewards for sidechain validators on the Polygon network.`,
            },
            {
              title: 'Is Polygon safe?',
              description:
                'Polygon implements strict security protocols and is widely used in the cryptocurrency community.',
            },
            {
              title: 'What are typical use cases for Polygon?',
              description:
                'Polygon is used to develop DApps, NFTs, games, and a wide range of blockchain applications.',
            },
            {
              title: 'How does Polygon promote interoperability?',
              description:
                'Polygon is compatible with Ethereum, allowing assets and DApps to move between the two networks efficiently.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
