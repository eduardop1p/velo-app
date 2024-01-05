import { Metadata } from 'next';

import formatDataCrypto from '@/services/formtaDataCrypto';
import { CryptoType } from '@/components/header';
import InfoCrypto from '@/components/products/infoCrypto';
import WhatIsCrypto from '@/components/products/whatIsCrypto';
import HowToBuyCrypto from '@/components/products/howToBuyCrypto';
import InvestOtherCryptos from '@/components/products/investOtherCryptos';
import RegisterNewsletterCrypto from '@/components/products/registerNewsletterCrypto';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Ethereum: the second largest digital asset on the market | Velo',
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
          cryptoName="Ethereum"
          cryptoOverview="Invest in the asset that promises to be the foundation of the financial systems of the future"
          cryptoPoints={[
            {
              title: 'Investment in technological infrastructure',
              description: `By purchasing ether, you are supporting a solution development tool that has the potential to become one of the pillars of new business models linked to the internet, also known as Web 3.0.`,
            },
            {
              title: 'Decentralized system',
              description: `Decentralized finance is a sector of cryptoassets that offers financial services such as loans, asset trading, derivatives and other functions through decentralized applications. Most of the existing solutions in this sector are hosted on the Ethereum network. Therefore, investing in ether is also supporting the advancement of this sector.`,
            },
            {
              title: 'One of the largest communities in the sector',
              description:
                'The Ethereum network has one of the largest communities of developers and promoters in the cryptoactive sector and presents the necessary conditions to remain as the main smart contracts tool for a considerable period of time.',
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
                    d=" M-252.5,86 C-252.5,86 -190.4239959716797,86 -190.4239959716797,86 C-190.4239959716797,86 -115.76399993896484,11.32699966430664 -115.76399993896484,11.32699966430664 C-115.76399993896484,11.32699966430664 -89.75900268554688,37.33700180053711 -89.75900268554688,37.33700180053711 C-89.75900268554688,37.33700180053711 59.560001373291016,37.33700180053711 59.560001373291016,37.33700180053711 C59.560001373291016,37.33700180053711 182.87399291992188,-86 182.87399291992188,-86 C182.87399291992188,-86 250.1959991455078,-86 252.44200134277344,-86"
                  ></path>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,179,59.407997131347656)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,39.617000579833984,26.881999969482422)"
                >
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                      stroke="rgb(255,255,255)"
                      strokeOpacity="1"
                      strokeWidth="4"
                      d=" M15.807999610900879,49.5890007019043 C15.807999610900879,49.5890007019043 -39.395999908447266,35.78799819946289 -39.395999908447266,35.78799819946289 C-39.395999908447266,35.78799819946289 15.807999610900879,-25.805999755859375 15.807999610900879,-25.805999755859375 C15.807999610900879,-25.805999755859375 71.02999877929688,35.78799819946289 71.02999877929688,35.78799819946289 C71.02999877929688,35.78799819946289 15.807999610900879,49.5890007019043 15.807999610900879,49.5890007019043z"
                    ></path>
                  </g>
                </g>
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,39.617000579833984,80.86000061035156)"
                >
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                      stroke="rgb(255,255,255)"
                      strokeOpacity="1"
                      strokeWidth="4"
                      d=" M15.807999610900879,57.71500015258789 C15.807999610900879,57.71500015258789 -27.496000289916992,9.41100025177002 -27.496000289916992,9.41100025177002 C-27.496000289916992,9.41100025177002 15.807999610900879,20.238000869750977 15.807999610900879,20.238000869750977 C15.807999610900879,20.238000869750977 59.130001068115234,9.41100025177002 59.130001068115234,9.41100025177002 C59.130001068115234,9.41100025177002 15.807999610900879,57.71500015258789 15.807999610900879,57.71500015258789z"
                    ></path>
                  </g>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,179,59.407997131347656)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,39.38999938964844,17.051000595092773)"
                >
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                      stroke="rgb(255,255,255)"
                      strokeOpacity="1"
                      strokeWidth="4"
                      d=" M15.814000129699707,-15.958999633789062 C15.814000129699707,-15.958999633789062 15.814000129699707,31.833999633789062 15.814000129699707,31.833999633789062"
                    ></path>
                  </g>
                </g>
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,40.42599868774414,36.7140007019043)"
                >
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                      stroke="rgb(255,255,255)"
                      strokeOpacity="1"
                      strokeWidth="4"
                      d=" M44.06999969482422,19.493999481201172 C44.06999969482422,19.493999481201172 14.777999877929688,12.170999526977539 14.777999877929688,12.170999526977539 C14.777999877929688,12.170999526977539 -11.609000205993652,18.7549991607666 -11.609000205993652,18.7549991607666"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Ethereum"
          cryptoOverview="Ethereum is a world-leading cryptocurrency created to enable the execution of smart contracts on the blockchain. With its revolutionary technology, Ethereum is transforming the way we do business and interact in the digital age."
        />
        <HowToBuyCrypto cryptoName="Ethereum" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
