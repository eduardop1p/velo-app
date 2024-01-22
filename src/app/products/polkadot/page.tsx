import { Metadata } from 'next';

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
  title: 'Polkadot: Decentralized Blockchain Web 3.0 | Velo',
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
          cryptoName="Polkadot"
          cryptoOverview="The most powerful blockchain connection on the market"
          cryptoPoints={[
            {
              title: 'Decentralized platform',
              description:
                'Polkadot is a decentralized platform for creating applications of the most diverse types. It was developed with the concept of increasing transaction processing capacity in mind. To achieve this goal, it works with parallel networks, called “parachains”, which serve specific purposes around the heart of the network, called a “relay chain”.',
            },
            {
              title: 'Third generation blockchain',
              description: `Like Cardano and Solana, it is a third generation blockchain, which aims to improve the technical aspects of its predecessors, such as bitcoin and Ethereum.`,
            },
            {
              title: 'Builds connections between different blockchains',
              description:
                'Bridges blockchains on Polkadot with other networks such as Ethereum and Bitcoin.',
            },
          ]}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 505 438"
            width="505"
            height="438"
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: '100%',
              height: '100%',
              transform: 'translate3d(0px, 0px, 0px)',
              contentVisibility: 'visible',
            }}
          >
            <defs>
              <clipPath>
                <rect width="505" height="438" x="0" y="0"></rect>
              </clipPath>
            </defs>
            <g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,228,132)"
                opacity="1"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M0,-130.5 C72.02294921875,-130.5 130.5,-72.02294921875 130.5,0 C130.5,72.02294921875 72.02294921875,130.5 0,130.5 C-72.02294921875,130.5 -130.5,72.02294921875 -130.5,0 C-130.5,-72.02294921875 -72.02294921875,-130.5 0,-130.5z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,229.08399963378906,74.01399993896484)"
                opacity="1"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M0,15.180000305175781 C14.451000213623047,15.180000305175781 26.166000366210938,8.383999824523926 26.166000366210938,0 C26.166000366210938,-8.383999824523926 14.451000213623047,-15.180000305175781 0,-15.180000305175781 C-14.451000213623047,-15.180000305175781 -26.166000366210938,-8.383999824523926 -26.166000366210938,0 C-26.166000366210938,8.383999824523926 -14.451000213623047,15.180000305175781 0,15.180000305175781z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,278.6910095214844,104.23500061035156)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(0.865492582321167,-0.5009217262268066,0.5009217262268066,0.865492582321167,0,0)"
                >
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M0,26.117000579833984 C8.39900016784668,26.117000579833984 15.208000183105469,14.423999786376953 15.208000183105469,0 C15.208000183105469,-14.423999786376953 8.39900016784668,-26.117000579833984 0,-26.117000579833984 C-8.39900016784668,-26.117000579833984 -15.208000183105469,-14.423999786376953 -15.208000183105469,0 C-15.208000183105469,14.423999786376953 -8.39900016784668,26.117000579833984 0,26.117000579833984z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,278.71600341796875,161.4199981689453)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(0.49912306666374207,-0.8665311336517334,0.8665311336517334,0.49912306666374207,0,0)"
                >
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M0,15.208000183105469 C14.423999786376953,15.208000183105469 26.117000579833984,8.39900016784668 26.117000579833984,0 C26.117000579833984,-8.39900016784668 14.423999786376953,-15.208000183105469 0,-15.208000183105469 C-14.423999786376953,-15.208000183105469 -26.117000579833984,-8.39900016784668 -26.117000579833984,0 C-26.117000579833984,8.39900016784668 -14.423999786376953,15.208000183105469 0,15.208000183105469z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,229.08399963378906,189.98599243164062)"
                opacity="1"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M0,15.180000305175781 C14.451000213623047,15.180000305175781 26.166000366210938,8.383999824523926 26.166000366210938,0 C26.166000366210938,-8.383999824523926 14.451000213623047,-15.180000305175781 0,-15.180000305175781 C-14.451000213623047,-15.180000305175781 -26.166000366210938,-8.383999824523926 -26.166000366210938,0 C-26.166000366210938,8.383999824523926 -14.451000213623047,15.180000305175781 0,15.180000305175781z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,179.38800048828125,161.41700744628906)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(0.865492582321167,-0.5009217262268066,0.5009217262268066,0.865492582321167,0,0)"
                >
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M0,26.117000579833984 C8.404999732971191,26.117000579833984 15.218999862670898,14.423999786376953 15.218999862670898,0 C15.218999862670898,-14.423999786376953 8.404999732971191,-26.117000579833984 0,-26.117000579833984 C-8.404999732971191,-26.117000579833984 -15.218999862670898,-14.423999786376953 -15.218999862670898,0 C-15.218999862670898,14.423999786376953 -8.404999732971191,26.117000579833984 0,26.117000579833984z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,179.41700744628906,104.23200225830078)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(0.49912306666374207,-0.8665311336517334,0.8665311336517334,0.49912306666374207,0,0)"
                >
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M0,15.218999862670898 C14.423999786376953,15.218999862670898 26.117000579833984,8.404999732971191 26.117000579833984,0 C26.117000579833984,-8.404999732971191 14.423999786376953,-15.218999862670898 0,-15.218999862670898 C-14.423999786376953,-15.218999862670898 -26.117000579833984,-8.404999732971191 -26.117000579833984,0 C-26.117000579833984,8.404999732971191 -14.423999786376953,15.218999862670898 0,15.218999862670898z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,252.5,349.75)"
                opacity="1"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(107,170,255)"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d=" M-252.5,86 C-252.5,86 -190.4239959716797,86 -190.4239959716797,86 C-190.4239959716797,86 -115.76399993896484,11.32699966430664 -115.76399993896484,11.32699966430664 C-115.76399993896484,11.32699966430664 -89.75900268554688,37.33700180053711 -89.75900268554688,37.33700180053711 C-89.75900268554688,37.33700180053711 59.560001373291016,37.33700180053711 59.560001373291016,37.33700180053711 C59.560001373291016,37.33700180053711 182.87399291992188,-86 182.87399291992188,-86 C182.87399291992188,-86 252.5,-86 252.5,-86"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Polkadot"
          cryptoOverview="Polkadot is a blockchain platform that facilitates interoperability between different blockchains, allowing them to work together as part of a larger ecosystem."
        />
        <HowToBuyCrypto cryptoName="Polkadot" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does interoperability work on Polkadot?',
              description: `Polkadot uses a central hub called a "relay chain" to connect different blockchains called "parachains" and "parathreads", allowing the exchange of information and assets.`,
            },
            {
              title: 'What are some example use cases for Polkadot?',
              description: `Polkadot is used in DeFi applications, NFTs, decentralized governance, and more thanks to its interoperability.`,
            },
            {
              title: 'What is on-chain governance on Polkadot?',
              description: `On-chain governance allows DOT holders to directly vote on network upgrade proposals and governance decisions.`,
            },
            {
              title: 'What upgrades are planned for Polkadot?',
              description:
                'Polkadot continues to evolve with updates and strategic partnerships to enhance its functionality and security.',
            },
            {
              title: 'How can I contribute to the Polkadot ecosystem?',
              description:
                'You can actively participate in the Polkadot community, explore projects, develop applications, and engage in discussion forums.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
