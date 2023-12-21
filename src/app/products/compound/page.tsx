import { Metadata } from 'next';
import Image from 'next/image';

import formatDataCrypto from '@/services/formtaDataCrypto';
import { CryptoType } from '@/components/header';
import InfoCrypto from '@/components/products/infoCrypto';
import WhatIsCrypto from '@/components/products/whatIsCrypto';
import HowToBuyCrypto from '@/components/products/howToBuyCrypto';
import InvestOtherCryptos from '@/components/products/investOtherCryptos';
import RegisterNewsletterCrypto from '@/components/products/registerNewsletterCrypto';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: `Compound: undisputed leader in DeFi finance | Velo`,
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
          cryptoName="Compound"
          cryptoOverview="The undisputed and highly regarded leader in the field of decentralized finance (DeFi), revolutionizing decentralized lending."
          cryptoPoints={[
            {
              title: 'Pioneering platform in DeFi lending',
              description:
                'Compound is one of the first and most respected decentralized lending platforms in the decentralized finance (DeFi) space. Its reputation and track record of success attract investors and users looking for a reliable and secure solution to earn interest on their crypto assets or take out loans in a decentralized way.',
            },
            {
              title: 'Governance tool',
              description: `The COMP token plays a key role in the governance of the Compound protocol, allowing token holders to participate in the decisions and future development of the platform. This creates an incentive for investors to acquire and hold the COMP token as they seek to influence and benefit from the platform's success. Additionally, the COMP token is distributed as a reward to users who interact with the platform, providing an incentive mechanism to increase adoption and usage of the protocol.`,
            },
            {
              title: 'Integration and strategic partnerships',
              description: `Compound has been widely adopted and integrated into various projects and platforms in the DeFi ecosystem, which expands its reach and usefulness. The platform has established partnerships and collaborations with high-profile projects such as MetaMask wallet and decentralized exchange Uniswap. These partnerships and integrations not only increase the project's visibility, but also reinforce investors' confidence in the platform and its long-term growth potential.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-30.svg"
            alt="velo-svg-30"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Compound"
          cryptoOverview="Compound is a DeFi protocol that facilitates decentralized borrowing."
        />
        <HowToBuyCrypto cryptoName="Compound" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
