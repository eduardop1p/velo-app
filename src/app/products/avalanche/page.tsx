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
  title: 'Avalanche: Smart Contracts platform | Velo',
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
          cryptoName="Avalanche"
          cryptoOverview="Smart contracts platform that allows the creation of decentralized applications."
          cryptoPoints={[
            {
              title: 'Decentralized Blockchain',
              description:
                'Avalanche is a decentralized smart contract platform. Through the use of smart contracts, it allows the creation of tokens, dApps and subnets within its ecosystem. Although it has EVM (Ethereum Virtual Machine) support, it is considered a competitor to the Ethereum network, having mechanics that aim to make it faster and cheaper.',
            },
            {
              title: 'Creating subnets',
              description: `Avalanche's architecture allows for the creation of internal blockchains, called subnets. These internal networks help with the scalability of the network, as they alleviate the computational burden of the main blockchain.`,
            },
            {
              title: 'Fast and cheap',
              description:
                'Its architecture divided into subnets aims to solve inefficiencies in current blockchain networks, providing users with cheap and fast transactions. This makes it one of the best alternatives to networks with higher usage and development costs, such as Ethereum.',
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-15.svg"
            alt="velo-svg-15"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Avalanche"
          cryptoOverview="Smart contracts platform that allows the creation of decentralized applications."
        />
        <HowToBuyCrypto cryptoName="Avalanche" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
