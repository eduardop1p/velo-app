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
  title: `Link: The leading real-world data connection to blockchain | Velo`,
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
          cryptoName="Chainlink"
          cryptoOverview="Integration and connectivity with the real world"
          cryptoPoints={[
            {
              title: 'Necessity and dominance',
              description:
                'Chainlink acts as an oracle within networks, creating bridges for data between the real world and the crypto universe. Thus, it plays an essential role in the growth and development of infrastructure for blockchains and their applications. With a large volume of partner projects, Chainlink is almost a monopoly in the data/oracles category.',
            },
            {
              title: 'Capillarity',
              description: `The company provides oracle services for several L1 blockchains and more than a thousand application protocols, such as Aave, Compound, ENS, Paxos, Synthetix, etc. It uses several nodes of the decentralized network itself to automate contracts, mitigating the risks of manual intervention and centralized servers.`,
            },
            {
              title: 'Capitalization',
              description: `With US$3.1 billion in capitalization, its main institutional investors are Consensus Capital, One Block Capital, Framework Ventures, 8Decimal Capital, Anmi OECD and Outlier Ventures.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-21.svg"
            alt="velo-svg-21"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Chainlink"
          cryptoOverview="Chainlink is a decentralized oracle network that allows blockchains to obtain real-world information reliably and securely. This makes it possible to execute smart contracts based on real-world events."
        />
        <HowToBuyCrypto cryptoName="Chainlink" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
        <CryptoDoubts
          doubts={[
            {
              title: 'What are oracles on Chainlink?',
              description:
                'Oracles on Chainlink are trusted sources of real-world data that feed external information to smart contracts.',
            },
            {
              title: 'How does Chainlink ensure the security of oracular data?',
              description:
                'Chainlink uses an ecosystem of decentralized oracle nodes and an escrow mechanism to ensure data accuracy.',
            },
            {
              title: 'How can I use Chainlink in my smart contracts?',
              description: `You can integrate Chainlink's services into your smart contracts using its documentation and SDKs.`,
            },
            {
              title: 'What are common use cases for Chainlink?',
              description:
                'Chainlink is used in programmable payments, insurance, staking, market predictions, and more.',
            },
            {
              title:
                'What is the LINK token and what is its role in Chainlink?',
              description:
                'The LINK token is used to pay for services on the Chainlink network and to reward oracle node operators.',
            },
          ]}
        />
      </main>
      <Footer footerAddress />
    </>
  );
}
