import { Metadata } from 'next';
import Image from 'next/image';

import { CryptoType } from '@/components/header';
import InfoCrypto from '@/components/products/infoCrypto';
import WhatIsCrypto from '@/components/products/whatIsCrypto';
import HowToBuyCrypto from '@/components/products/howToBuyCrypto';
import InvestOtherCryptos from '@/components/products/investOtherCryptos';
import RegisterNewsletterCrypto from '@/components/products/registerNewsletterCrypto';
import Footer from '@/components/footer';
import UnavailablePage from '@/components/UnavailablePage';
import fetchGetFullCryptos from '@/services/fetchGetFullCryptos';

export const metadata: Metadata = {
  title: `Optimism: the scalability revolution on Ethereum | Velo`,
};

export default async function Page() {
  let dataCryptoassets: CryptoType[];

  try {
    dataCryptoassets = await fetchGetFullCryptos();
  } catch {
    return <UnavailablePage />;
  }

  return (
    <>
      <main className="mt-20">
        <InfoCrypto
          cryptoName="Optimism"
          cryptoOverview="Ethereum network scalability protocol."
          cryptoPoints={[
            {
              title: 'Scalability solution',
              description:
                'Optimism is a second layer protocol that aims to assist in the scalability of the Ethereum network. Its architecture allows the network to process clusters of information as transactions, validating them on Ethereum as a single transaction, which saves computational power and makes using the ecosystem cheaper and faster.',
            },
            {
              title: 'Vast ecosystem',
              description: `Being one of the most popular scalability solutions for Ethereum, it has the second highest TVL (Total Value Locked) on the market and a vast ecosystem of decentralized applications with the most diverse purposes. And as they are all integrated with Ethereum, this brings interoperability and allows interaction with even more solutions.`,
            },
            {
              title: 'Strong partnerships',
              description: `The Optimism network has been used by several large institutions that are interested in its architectural advantages. Such adoption both by market giants and by the users it brings adds even more value to the OP token, the network's governance instrument.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-20.svg"
            alt="velo-svg-20"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Optimism"
          cryptoOverview="Optimism is a scaling solution designed for Ethereum to improve network efficiency."
        />
        <HowToBuyCrypto cryptoName="Optimism" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
