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
  title:
    'Bitcoin: invest in the largest crypto asset on the digital market | Velo',
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
          cryptoName="Bitcoin"
          cryptoOverview="Invest in the cryptocurrency of the century safely"
          cryptoPoints={[
            {
              title: 'Diversification',
              description:
                'Driven by different risk and return factors than traditional investments, bitcoin can be strategic in building an investment portfolio.',
            },
            {
              title: 'Empowerment',
              description:
                'Bitcoin is an asymmetrically attractive asset, that is, the chances of capturing gains that will multiply the portion of your capital allocated to the asset are greater than the risk of losing the entire amount invested.',
            },
            {
              title: 'Decentralization and innovation',
              description:
                'Support an asset that promotes global financial inclusion through decentralization. Buying bitcoin and other cryptoactives is a way to directly expose yourself and invest in innovation.',
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
                transform="matrix(1,0,0,1,0,0)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,209.19700622558594,211.9290008544922)"
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
                      d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                    ></path>
                  </g>
                </g>
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,209.19700622558594,49.104000091552734)"
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
                      d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                    ></path>
                  </g>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,27,0)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,209.19700622558594,211.9290008544922)"
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
                      d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                    ></path>
                  </g>
                </g>
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,209.19700622558594,49.104000091552734)"
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
                      d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                    ></path>
                  </g>
                </g>
              </g>
              <g
                style={{ display: 'block' }}
                transform="matrix(1,0,0,1,184.25,61.99999237060547)"
                opacity="1"
              >
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,53,31.934999465942383)"
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
                      d=" M-52.823001861572266,-31.784000396728516 C-52.823001861572266,-31.784000396728516 8.14900016784668,-31.934999465942383 8.14900016784668,-31.934999465942383 C25.773000717163086,-31.934999465942383 40.073001861572266,-17.635000228881836 40.073001861572266,0.012000000104308128 C40.073001861572266,17.63599967956543 25.79599952697754,31.934999465942383 8.14900016784668,31.934999465942383 C8.14900016784668,31.934999465942383 -40.073001861572266,31.934999465942383 -40.073001861572266,31.934999465942383"
                    ></path>
                  </g>
                </g>
                <g
                  opacity="1"
                  transform="matrix(1,0,0,1,57.33599853515625,100.14099884033203)"
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
                      d=" M8.137999534606934,-36.270999908447266 C28.18000030517578,-36.270999908447266 44.409000396728516,-20.04199981689453 44.409000396728516,0 C44.409000396728516,20.04199981689453 28.18000030517578,36.270999908447266 8.137999534606934,36.270999908447266 C8.137999534606934,36.270999908447266 -57.159000396728516,36.42300033569336 -57.159000396728516,36.42300033569336"
                    ></path>
                  </g>
                </g>
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    fill="rgb(255,255,255)"
                    fillOpacity="1"
                    d=" M13.25,0.9380000233650208 C13.25,0.9380000233650208 13.25,135.875 13.25,135.875"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="4"
                    d=" M13.25,0.9380000233650208 C13.25,0.9380000233650208 13.25,135.875 13.25,135.875"
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
          cryptoName="Bitcoin"
          cryptoOverview="Bitcoin is a decentralized cryptocurrency that allows direct
            transactions between people, without the need for intermediaries.
            Based on blockchain technology, it offers security and anonymity,
            attracting investors in search of gains."
        />
        <HowToBuyCrypto cryptoName="Bitcoin" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'What is Bitcoin?',
              description:
                'Bitcoin is a decentralized digital currency, allowing direct transactions between users without intermediaries. It works with blockchain technology, ensuring security and privacy.',
            },
            {
              title: 'How to buy Bitcoin?',
              description: `To acquire Bitcoin, you need a digital wallet and you can buy it from specialized brokers. Sign up, deposit money, choose the desired amount and that's it!`,
            },
            {
              title: 'How does Bitcoin security work?',
              description: `Bitcoin's security comes from the blockchain, a public, immutable record of transactions. Advanced encryption protects transactions and decentralization prevents fraud.`,
            },
            {
              title: 'What is the appreciation potential of Bitcoin?',
              description:
                'The value of Bitcoin is volatile and can vary greatly. Their limited supply and growing interest can lead to significant appreciation, but remember that investments have risks.',
            },
            {
              title: 'Is it possible to use Bitcoin in everyday life?',
              description:
                'Yes, more and more businesses are accepting Bitcoin as payment. However, its adoption is still limited compared to traditional currencies.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
