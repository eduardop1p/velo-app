import Image from 'next/image';
import { cookies } from 'next/headers';

import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import { CryptoType, ShowUserType } from '@/components/header';
import calBalance from '@/services/calcBalance';
import CryptoCurrentPrice from '@/components/cryptoCurrentPrice';
import fetchKucoinApi from '@/services/fetchKucoinApi';
import BalanceMinimum from '@/components/forms/sendCrypto/balanceMinimum';
import FormSendCrypto from '@/components/forms/sendCrypto/index';

interface WithdrawalsQuotasType {
  withdrawMinFee: string;
  withdrawMinSize: string;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { crypto: string };
  searchParams: { name: string };
}) {
  const cryptoSymbol = params.crypto.toUpperCase();
  const cryptoName = searchParams.name;

  const token = cookies().get('token')?.value;

  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show-user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  const userData = (await userRes.json()) as ShowUserType;

  const resCryptos = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=${cryptoSymbol}`,
    {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    }
  );
  const metaData = await resCryptos.json();
  const dataCrypto = {
    NAME: cryptoName,
    ...metaData.RAW[cryptoSymbol].USD,
  } as CryptoType;

  let dataWithdrawalsQuotas = (await fetchKucoinApi({
    apiEndpoint: '/api/v1/withdrawals/quotas',
    apiMethod: 'GET',
    apiQueryString: `?currency=${cryptoSymbol}`,
  })) as WithdrawalsQuotasType;
  if (!dataWithdrawalsQuotas) {
    dataWithdrawalsQuotas = {
      withdrawMinFee: '0',
      withdrawMinSize: '0',
    };
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
            balance={calBalance(userData.transactions)}
            cryptoSymbol={cryptoSymbol}
            withdrawMinSize={+dataWithdrawalsQuotas.withdrawMinSize}
          />
          <FormSendCrypto
            cryptoImgUrl={dataCrypto.IMAGEURL}
            withdrawMinSize={+dataWithdrawalsQuotas.withdrawMinSize}
            cryptoName={cryptoName}
            cryptoSymbol={cryptoSymbol}
            userBalance={calBalance(userData.transactions)}
          />
        </div>
      </div>
    </main>
  );
}
