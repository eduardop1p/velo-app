import Image from 'next/image';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';

import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import { CryptoType } from '@/components/header';
import CryptoCurrentPrice from '@/components/cryptoCurrentPrice';
import fetchKucoinApi from '@/services/fetchKucoinApi';
import BalanceMinimum from '@/components/forms/sendCrypto/balanceMinimum';
import SkeletonFormSendCrypto from '@/components/forms/sendCrypto/skeletonFormSendCrypto';
const FormSendCrypto = dynamic(
  () => import('@/components/forms/sendCrypto/index'),
  {
    ssr: false,
    loading: () => <SkeletonFormSendCrypto />,
  }
);
import { cryptosNames } from '@/services/formatDataCrypto';
import UnavailablePage from '@/components/UnavailablePage';
import fetchGetUser from '@/services/fetchGetUser';
import { UserType } from '@/app/api/models/users';

interface WithdrawalsQuotasType {
  withdrawMinFee: number;
  withdrawMinSize: number;
}

export default async function Page({ params }: { params: { crypto: string } }) {
  const cryptoSymbol = params.crypto.toUpperCase();
  const cryptoName = cryptosNames.find(val => val.symbol === cryptoSymbol)?.name!; // eslint-disable-line


  const token = cookies().get('token')?.value as string;

  let userData: UserType;
  let userCryptoBalance: number;
  let dataCrypto: CryptoType;
  let dataWithdrawalsQuotas: WithdrawalsQuotasType = {
    withdrawMinFee: 0,
    withdrawMinSize: 0,
  };

  try {
    userData = await fetchGetUser(token);
    userCryptoBalance = userData.transactions
      .filter(val => val.symbol === cryptoSymbol && val.type === 'crypto')
      .reduce((prev, val) => prev + val.cryptoValue, 0);

    const resCrypto = await fetch(
      `${process.env.CRYPTO_API_URL}&fsyms=${cryptoSymbol}`,
      {
        method: 'GET',
        next: {
          revalidate: 60,
        },
      }
    );
    const metaData = await resCrypto.json();
    dataCrypto = {
      NAME: cryptoName,
      ...metaData.RAW[cryptoSymbol].USD,
    };

    const { dataKucoin, errKucoin } = await fetchKucoinApi({
      apiEndpoint: '/api/v1/withdrawals/quotas',
      apiMethod: 'GET',
      apiQueryString: `?currency=${cryptoSymbol}`,
    });
    if (errKucoin) {
      throw new Error(errKucoin.msg);
    }
    if (dataKucoin) {
      dataWithdrawalsQuotas = {
        withdrawMinFee: +dataKucoin.withdrawMinFee,
        withdrawMinSize: +dataKucoin.withdrawMinSize,
      };
    }
  } catch (err) {
    console.log(err);
    return <UnavailablePage />;
  }

  return (
    <main className="mt-20">
      <div className="min-h-full-screen-80px bg-black-section px-20 py-14 flex flex-col gap-5">
        <div className="self-start">
          <Back />
        </div>
        <div className="self-start">
          <PrevUrl
            url1={{
              name: 'Wallet',
              url: '/wallet',
            }}
            url2={{
              name: 'Select a currency',
              url: '/wallet/send',
            }}
            color="text-primary"
            fill="fill-primary"
            currentPage={cryptoName}
          />
        </div>
        <Image
          width={74}
          height={74}
          src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${dataCrypto.IMAGEURL}`}
          alt={cryptoName}
          className="-ml-2 rounded-full"
        />
        <div className="flex flex-col">
          <h2 className="text-primary text-xl font-normal">
            Send {cryptoName}
          </h2>
          <CryptoCurrentPrice
            cryptoName={cryptoName}
            cryptoSymbol={cryptoSymbol}
          />
        </div>
        <div className="flex flex-col gap-5 ">
          <BalanceMinimum
            userCryptoBalance={userCryptoBalance}
            cryptoSymbol={cryptoSymbol}
            withdrawMinSize={dataWithdrawalsQuotas.withdrawMinSize * 1.1}
          />
          <FormSendCrypto
            cryptoImgUrl={dataCrypto.IMAGEURL}
            withdrawMinSize={dataWithdrawalsQuotas.withdrawMinSize * 1.1}
            withdrawMinFee={dataWithdrawalsQuotas.withdrawMinFee}
            cryptoName={cryptoName}
            cryptoSymbol={cryptoSymbol}
            userCryptoBalance={userCryptoBalance}
            token={token as string}
          />
        </div>
      </div>
    </main>
  );
}
