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
import UnavailablePage from '@/components/UnavailablePage';

export const metadata: Metadata = {
  title: `Quant: variety of solutions for private initiatives | Velo`,
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
          cryptoName="Quantity"
          cryptoOverview="Variety of solutions for private initiatives from different sectors, from financial institutions to supply chains"
          cryptoPoints={[
            {
              title: 'Interoperability technology',
              description:
                'Quant Network is a company that offers blockchain interoperability solutions. It was developed with the aim of making it easier for information to circulate between different blockchains more easily, increasing the scope of possibilities that can be achieved through interconnections.',
            },
            {
              title: 'Strong team of developers and partners',
              description: `It has a robust team of developers, all with decades of experience in the field of cybersecurity and finance. Furthermore, the company has several partnerships with renowned institutions and is part of internationally known bodies, which increases its trust among both investors and regulatory entities.`,
            },
            {
              title: 'Viewed favorably by governments',
              description: `Due to its centralized nature with a bias in favor of partnerships with governments, Quant Network has not had any problems with regulatory bodies. This makes it likely to be viewed favorably by nations that are in the process of developing their CBDCs (Central Bank Digital Currency) and that may choose to use its blockchain interoperability technology.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-31.svg"
            alt="velo-svg-31"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Quant"
          cryptoOverview="Quant is a platform that allows you to create decentralized applications with ease."
        />
        <HowToBuyCrypto cryptoName="Quant" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
