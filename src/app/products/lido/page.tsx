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
  title: `Lido: Ultimate solution for Ethereum staking | Velo`,
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
          cryptoName="Lido"
          cryptoOverview="The main liquidity staking protocol in the crypto market"
          cryptoPoints={[
            {
              title: 'Staking with immediate liquidity',
              description:
                'The decentralized platform allows users to stake tokens to earn interest. In addition to not imposing a minimum access value on the user, Lido offers a solution that facilitates the delegation of tokens for staking and provides access to immediate liquidity for allocated assets.',
            },
            {
              title: 'Several cryptos in the same place',
              description: `Lido increasingly expands the platform by allowing the user to allocate tokens from different staked networks, some of the available tokens are: Ethereum, Solana, Polygon and Polkadot.`,
            },
            {
              title: 'Second highest DeFi TVL',
              description: `A relevant metric for the crypto market, Lido stands out for its value in Total Value Locked (TVL), which shows the investor the number of tokens locked in the protocol and, consequently, how much blockchain users trust the security of the protocol and see usefulness in the service. offered.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-25.svg"
            alt="velo-svg-25"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Lido"
          cryptoOverview="Platform that allows users to participate in staking even if they do not have the minimum amount of 32 ETH to do so independently. It simultaneously offers a simple way to earn from staking and maintain liquid assets."
        />
        <HowToBuyCrypto cryptoName="Lido" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title:
                'How does Lido allow staking on Ethereum 2.0 without the minimum amount of 32 ETH?',
              description: `Lido pools tokens from multiple users and validates them as a single node on the Ethereum 2.0 network.`,
            },
            {
              title: 'What is the stETH token and how does it work?',
              description:
                'The stETH token represents your staking stake and can be used on other DeFi platforms to earn additional rewards.',
            },
            {
              title: 'Is Lido safe?',
              description: `Lido is designed with security in mind, undergoes regular audits, and has an active community of developers and validators.`,
            },
            {
              title: 'What are the future prospects for Lido Finance?',
              description:
                'Lido continues to expand its features and partnerships, providing more earning opportunities for its users.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
