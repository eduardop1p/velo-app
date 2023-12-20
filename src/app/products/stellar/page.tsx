import Image from 'next/image';
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
  title: 'Stellar: fast and low-cost network | Velo',
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
          cryptoName="Stellar"
          cryptoOverview="An open source network optimized for payments and digital asset issuance"
          cryptoPoints={[
            {
              title: 'Fast and low-cost network',
              description:
                'The Stellar blockchain has low transaction costs and extremely fast transaction speed. Its architecture, in order to preserve efficiency, does not require approval from the entire body of miners on the network to validate each block, only from a portion of trusted nodes chosen by each member node.',
            },
            {
              title: 'Relevant partnerships',
              description: `The Stellar ecosystem has several partnerships such as with IBM and MoneyGram. The partnership with IBM, started in 2019, involved the construction of the World Wire payments network. In 2021, MoneyGram chose Stellar's blockchain to integrate smart contract logic into its operation, allowing its customers to convert USDC into fiat currency and vice versa.`,
            },
            {
              title: 'Decentralized Blockchain',
              description:
                'Being completely decentralized, it can be accessed by any user worldwide. This absence of geographic restrictions results in greater democratization of finance, allowing people to transact internationally cheaply and quickly.',
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-13.svg"
            alt="velo-svg-13"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Stellar"
          cryptoOverview="Stellar is a fast and affordable global payment network, facilitating cross-border transactions."
        />
        <HowToBuyCrypto cryptoName="Stellar" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
