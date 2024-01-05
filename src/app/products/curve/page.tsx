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

export const metadata: Metadata = {
  title: `Curve: Leading DeFi Platform Exchanges | Velo`,
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
          cryptoName="Curve"
          cryptoOverview="Top 5 protocols with the highest locked value in the DeFi sector"
          cryptoPoints={[
            {
              title: 'Innovation and technology',
              description:
                'Curve stands out for having technologies that promote liquidity in cryptoactive pairs with low price deviation in large operations. Furthermore, it is ahead in the market due to its innovation and technological contributions to better control the price of assets in liquidity pools.',
            },
            {
              title: 'Investment at scale',
              description: `It allows token holders to obtain value in three different ways: staking to earn a percentage of trading fees on the protocol, boosting returns to provide liquidity in pools, and governance power that increases as the user holds the token.`,
            },
            {
              title: 'Use and diversity',
              description: `The protocol is among the leaders in AMM (Automated Market Maker) for offering pools of concentrated liquidity, in addition to lending, insurance and other DeFi services.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-24.svg"
            alt="velo-svg-24"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Curve"
          cryptoOverview="Curve Finance is an asset exchange platform optimized for assets with low volatility such as stablecoins. It is designed to provide efficient and low-cost exchanges, facilitating the management of digital assets."
        />
        <HowToBuyCrypto cryptoName="Curve" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does Curve Finance work?',
              description: `Curve uses liquidity pools to exchange assets, optimizing exchange efficiency for assets with low volatility.`,
            },
            {
              title: 'What assets can I trade on Curve?',
              description:
                'Curve is especially useful for exchanges involving stablecoins, but it also supports other digital assets.',
            },
            {
              title: 'What is the CRV token and what is its role at Curve?',
              description: `CRV is Curve's native token, used for governance and rewards on its platform.`,
            },
            {
              title: 'Is Curve Finance safe?',
              description:
                'Curve is an established platform and considered secure, but it is always important to take security measures when dealing with digital assets.',
            },
            {
              title: 'Is Curve Finance accessible to everyone?',
              description:
                'Yes, Curve is a platform accessible to anyone who wants to exchange or manage digital assets.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
