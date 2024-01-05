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

export const metadata: Metadata = {
  title: 'Solana: transaction processing capabilities | Velo',
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
          cryptoName="Solana"
          cryptoOverview="Invest in one of the largest transaction processing capabilities today"
          cryptoPoints={[
            {
              title: 'Scalable platform',
              description:
                'Solana has made its platform more scalable and agile using a combination of elements such as proof of stake and proof of history, which organizes transactions more efficiently.',
            },
            {
              title: 'Third generation blockchain',
              description: `It is classified as a third generation network, faster, cheaper and more efficient than previous protocols such as Bitcoin and Ethereum.`,
            },
            {
              title: 'Lower fees',
              description:
                'One of the projects with the lowest transaction fee and highest processing capacity in the crypto ecosystem today.',
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
                transform="matrix(1,0,0,1,226.6790008544922,91.1989974975586)"
                opacity="1"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="2.5"
                    d=" M-43.5890007019043,-13.524999618530273 C-44.77399826049805,-13.524999618530273 -45.92499923706055,-13.036999702453613 -46.79600143432617,-12.199999809265137 C-46.79600143432617,-12.199999809265137 -68.6520004272461,9.654999732971191 -68.6520004272461,9.654999732971191 C-70.08100128173828,11.083999633789062 -69.06999969482422,13.524999618530273 -67.0479965209961,13.524999618530273 C-67.0479965209961,13.524999618530273 43.5890007019043,13.524999618530273 43.5890007019043,13.524999618530273 C44.808998107910156,13.524999618530273 45.95899963378906,13.036999702453613 46.79600143432617,12.199999809265137 C46.79600143432617,12.199999809265137 68.6520004272461,-9.654999732971191 68.6520004272461,-9.654999732971191 C70.08100128173828,-11.083999633789062 69.06999969482422,-13.524999618530273 67.0479965209961,-13.524999618530273 C67.0479965209961,-13.524999618530273 -43.5890007019043,-13.524999618530273 -43.5890007019043,-13.524999618530273z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,226.6790008544922,132)"
                opacity="1"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="2.5"
                    d=" M43.5890007019043,-13.524999618530273 C44.808998107910156,-13.524999618530273 45.95899963378906,-13.036999702453613 46.79600143432617,-12.199999809265137 C46.79600143432617,-12.199999809265137 68.6520004272461,9.654999732971191 68.6520004272461,9.654999732971191 C70.08100128173828,11.083999633789062 69.06999969482422,13.524999618530273 67.0479965209961,13.524999618530273 C67.0479965209961,13.524999618530273 -43.5890007019043,13.524999618530273 -43.5890007019043,13.524999618530273 C-44.808998107910156,13.524999618530273 -45.95899963378906,13.036999702453613 -46.79600143432617,12.199999809265137 C-46.79600143432617,12.199999809265137 -68.6520004272461,-9.654999732971191 -68.6520004272461,-9.654999732971191 C-70.08100128173828,-11.083999633789062 -69.06999969482422,-13.524999618530273 -67.0479965209961,-13.524999618530273 C-67.0479965209961,-13.524999618530273 43.5890007019043,-13.524999618530273 43.5890007019043,-13.524999618530273z"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,226.6790008544922,172.80099487304688)"
                opacity="1"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="2.5"
                    d=" M-43.5890007019043,-13.524999618530273 C-44.808998107910156,-13.524999618530273 -45.95899963378906,-13.036999702453613 -46.79600143432617,-12.199999809265137 C-46.79600143432617,-12.199999809265137 -68.6520004272461,9.654999732971191 -68.6520004272461,9.654999732971191 C-70.08100128173828,11.083999633789062 -69.06999969482422,13.524999618530273 -67.0479965209961,13.524999618530273 C-67.0479965209961,13.524999618530273 43.5890007019043,13.524999618530273 43.5890007019043,13.524999618530273 C44.808998107910156,13.524999618530273 45.95899963378906,13.036999702453613 46.79600143432617,12.199999809265137 C46.79600143432617,12.199999809265137 68.6520004272461,-9.654999732971191 68.6520004272461,-9.654999732971191 C70.08100128173828,-11.083999633789062 69.06999969482422,-13.524999618530273 67.0479965209961,-13.524999618530273 C67.0479965209961,-13.524999618530273 -43.5890007019043,-13.524999618530273 -43.5890007019043,-13.524999618530273z"
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
          cryptoName="Solana"
          cryptoOverview="Solana is a high-performance blockchain designed to meet the demands of decentralized applications and high-volume financial services."
        />
        <HowToBuyCrypto cryptoName="Solana" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does Solana achieve its high scalability?',
              description: `Solana utilizes a unique PoH (Proof of History) and PoS (Proof of Stake) consensus architecture to achieve high speed and scalability.`,
            },
            {
              title: 'What are typical use cases for Solana?',
              description: `Solana is used to build decentralized applications, DEXs, NFTs, and many other use cases on the blockchain.`,
            },
            {
              title: 'How does Solana keep transaction fees low?',
              description: `Solana's low fees are maintained due to its scalability and network efficiency.`,
            },
            {
              title: 'How can I participate in the Solana community?',
              description:
                'You can join the Solana community by participating in forums, hackathons, and exploring projects and applications on the network.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
