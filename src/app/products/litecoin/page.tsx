import Image from 'next/image';
import { Metadata } from 'next';

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
  title: 'LiteCoin: digital silver | Velo',
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
          cryptoName="LiteCoin"
          cryptoOverview="Developed as a more agile and economical option compared to Bitcoin."
          cryptoPoints={[
            {
              title: 'Speed ​​and low transaction costs',
              description: `Litecoin was designed to be a faster and more cost-efficient alternative to Bitcoin. The Litecoin network processes blocks every 2.5 minutes, compared to Bitcoin's 10 minutes, which allows for faster transactions and shorter wait times for confirmation. Additionally, transaction costs on the Litecoin network are generally lower, making it an attractive option for investors and users looking to make quick, cost-effective transactions.`,
            },
            {
              title: 'Adoption and use in commerce',
              description: `Litecoin has wide acceptance in commerce and is supported by several payment platforms such as Coinbase Commerce and BitPay. This widespread adoption has increased investor interest and the utility of Litecoin as a digital currency for everyday payments. As more companies accept Litecoin as a form of payment, its value and demand could increase, benefiting investors`,
            },
            {
              title: 'Technological innovation and continuous development',
              description:
                'The Litecoin development team has been committed to continually improving the technology behind the cryptocurrency. Some of the notable innovations include the implementation of SegWit (Segregated Witness) technology and the exploration of the Lightning Network, both aimed at increasing network scalability and efficiency. This dedication to innovation and continuous improvement can attract investors seeking projects with a strong commitment to technological advancement.',
            },
          ]}
        >
          <Image
            src="/assets/svg/velo-svg-14.svg"
            alt="velo-svg-14"
            fill
            sizes="100%"
            className="object-contain"
          />
        </InfoCrypto>
        <WhatIsCrypto
          cryptoName="LiteCoin"
          cryptoOverview="Litecoin is a fast and secure payment cryptocurrency widely used in everyday transactions."
        />
        <HowToBuyCrypto cryptoName="Litecoin" />
        <InvestOtherCryptos dataCryptoassets={dataCryptoassets} />
        <RegisterNewsletterCrypto />
      </main>
      <Footer footerAddress />
    </>
  );
}
