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
  title: `Synthetix: issuance and trading of synthetic assets | Velo`,
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
