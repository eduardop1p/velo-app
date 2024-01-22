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
  title: `Aave: Largest blockchain lending protocol | Velo`,
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
          cryptoName="Aave"
          cryptoOverview="Largest blockchain lending protocol"
          cryptoPoints={[
            {
              title: 'Crypto portfolio diversificationy',
              description:
                'Aave is a decentralized crypto lending protocol, supporting leading blockchain networks and scalability.',
            },
            {
              title: 'Strong market cap in DeFi',
              description: `Aave has a decentralized governance system, which reduces regulatory risks and creates a sense of community among investors and DAO participants. The protocol is among the most innovative and with the highest volume of transactions in the segment.`,
            },
            {
              title: 'Multiplier effect',
              description: `Aave token holders can stake the tokens, allowing the protocol to use them as insurance for times of low liquidity. Thus, users earn more tokens for staking, in addition to a percentage of the protocol fees.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-26.svg"
            alt="velo-svg-26"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Aave"
          cryptoOverview="Aave is a DeFi (decentralized finance) platform that enables lending and borrowing of crypto assets. It allows users to earn interest on deposited assets and access liquidity efficiently, all in a decentralized way."
        />
        <HowToBuyCrypto cryptoName="Aave" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'How does lending and borrowing work at Aave?',
              description: `Users can lend crypto assets by depositing them on the platform and earn interest on these assets. They can also borrow assets from other users.`,
            },
            {
              title:
                'What is the AAVE token and what is its role on the platform?',
              description:
                'The AAVE token is used for governance and as a form of insurance on the platform.',
            },
            {
              title: 'Is it safe to use Aave?',
              description: `Aave is designed with security in mind, but it's important to take security measures when interacting with DeFi, such as using secure wallets.`,
            },
            {
              title: 'What are the future prospects for Aave?',
              description:
                'Aave continues to evolve with updates and strategic partnerships to expand its functionality and supported assets.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
