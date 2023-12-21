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
  title: `Uniswap: the largest DeFi by volume and market capitalization | Velo`,
};

export default async function Page() {
  const resCryptoassets = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
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
          cryptoName="Uniswap"
          cryptoOverview="The largest DeFi by volume and market capitalization"
          cryptoPoints={[
            {
              title:
                'One of the most valued projects in the decentralized finance sector',
              description:
                'A pioneering business model, Uniswap offers incentives for deposits into liquidity pools in passive income, where liquidity providers earn from multiple levels of fees and concentrated liquidity, known as liquidity mining.',
            },
            {
              title: 'Security and vision of the future',
              description: `Uniswap is integrated with the Ethereum system and is seen among investors as one of the most important projects in the Web3 ecosystem. This reinforces the protocol's security measures, which undergo constant assessments and have decentralized governance.`,
            },
            {
              title: 'The boom in the market',
              description: `Present in media channels focused on blockchain, Uniswap has increased market potential due to the number of people who know, approve and use the protocol. The contributions made by respected investors, in addition to the increase in capitalization, increasingly demonstrate confidence in the technology.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-27.svg"
            alt="velo-svg-27"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Uniswap"
          cryptoOverview="Uniswap is a decentralized exchange (DEX) platform built on the Ethereum blockchain. It allows users to exchange digital assets directly from their wallets, eliminating the need for intermediaries and offering constant liquidity."
        />
        <HowToBuyCrypto cryptoName="Uniswap" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does Uniswap work?',
              description: `Uniswap uses smart contracts to facilitate the peer-to-peer exchange of digital assets, ensuring constant liquidity through liquidity pools.`,
            },
            {
              title: 'What assets can I exchange on Uniswap?',
              description:
                'You can exchange a wide range of cryptocurrencies and ERC-20 tokens on Uniswap.',
            },
            {
              title: 'What is the UNI token and what is its role at Uniswap?',
              description: `The UNI token is used for platform governance and can also be used as a reward for liquidity providers.`,
            },
            {
              title: 'Is it safe to use Uniswap?',
              description:
                'Uniswap is considered safe, but it is important to take security measures such as verifying contracts and using secure wallets.',
            },
            {
              title: 'How can I contribute to the Uniswap community?',
              description:
                'You can participate in Uniswap governance by voting on proposals, providing liquidity and participating in community discussions.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
