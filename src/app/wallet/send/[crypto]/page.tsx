import Image from 'next/image';
import { cookies } from 'next/headers';

import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import { CryptoType, ShowUserType } from '@/components/header';
import calBalance from '@/services/calcBalance';
import CryptoCurrentPrice from '@/components/cryptoCurrentPrice';
import fetchKucoinApi from '@/services/fetchKucoinApi';
import FormSendCrypto from '@/components/forms/sendCrypto';

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

  const dataWithdrawalsQuotas = await fetchKucoinApi({
    apiEndpoint: '/api/v1/withdrawals/quotas',
    apiMethod: 'GET',
    apiQueryString: `?currency=${cryptoSymbol}`,
  });

  const handleFormatPrice = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleFixedPointPrice = () => {
    const currentCryptoBalance =
      calBalance(userData.transactions) / +dataCrypto.PRICE.toFixed(2);
    if (cryptoSymbol === 'BTC') return currentCryptoBalance.toFixed(8);
    if (cryptoSymbol === 'USDC' || cryptoSymbol === 'USDT')
      return currentCryptoBalance.toFixed(2);
    return currentCryptoBalance.toFixed(6);
  };

  const handleFixedPointWithdrawMinSize = () => {
    if (!dataWithdrawalsQuotas) return;
    const withdrawMinSize = parseFloat(dataWithdrawalsQuotas.withdrawMinSize);
    // if (cryptoSymbol === 'BTC') return withdrawMinSize.toFixed(8);
    // if (cryptoSymbol === 'USDC' || cryptoSymbol === 'USDT')
    //   return withdrawMinSize.toFixed(2);
    return withdrawMinSize >= 1 ? withdrawMinSize.toFixed(2) : withdrawMinSize;
  };

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
          <div className="flex gap-4 justify-between w-1/2">
            <div className="flex gap-1">
              <h3 className="text-primary-2 font-normal text-[15px]">
                Balance available:
              </h3>
              <span className="text-[15px] font-normal text-primary">
                {handleFixedPointPrice()} {cryptoSymbol} |{' '}
                {handleFormatPrice(calBalance(userData.transactions))}
              </span>
            </div>
            <div className="flex gap-1">
              <h3 className="text-primary-2 font-normal text-[15px]">
                Minimum value:
              </h3>
              <span className="text-[15px] font-normal text-primary">
                {handleFixedPointWithdrawMinSize()} {cryptoSymbol}
              </span>
            </div>
          </div>
          <FormSendCrypto />
        </div>
      </div>
    </main>
  );
}
