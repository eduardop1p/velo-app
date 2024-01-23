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
  title: `Synthetix: issuance and trading of synthetic assets | Velo`,
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
          cryptoName="Synthetix"
          cryptoOverview="Protocol that allows the issuance and trading of synthetic assets."
          cryptoPoints={[
            {
              title: 'Decentralized trading platform',
              description:
                'Synthetix is ​​a decentralized finance platform focused on derivatives trading. Although it also allows spot trading, its difference is the range of derivatives represented by synthetic tokens, offering exposure to options and futures contracts.',
            },
            {
              title: 'Liquidity with zero slippage',
              description: `The platform does not use traditional order book mechanics, negotiations are carried out through Synthetix's own liquidity reserves, so that, regardless of the size of the transaction, it does not affect the price of the synthetic being traded.`,
            },
            {
              title: 'Faster and cheaper',
              description: `The fees charged for transactions within Synthetix are cheaper than most competitors, and part of these fees are redirected to holders who stake SNX.`,
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-29.svg"
            alt="velo-svg-29"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="Synthetix"
          cryptoOverview="Synthetix is ​​a DeFi platform that allows trading of synthetic assets on blockchain."
        />
        <HowToBuyCrypto cryptoName="Synthetix" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
