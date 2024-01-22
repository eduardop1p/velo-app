import Image from 'next/image';
import { cookies } from 'next/headers';

import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import { CryptoType, ShowUserType } from '@/components/header';
import CryptoCurrentPrice from '@/components/cryptoCurrentPrice';
import fetchKucoinApi from '@/services/fetchKucoinApi';
import BalanceMinimum from '@/components/forms/sendCrypto/balanceMinimum';
import FormSendCrypto from '@/components/forms/sendCrypto/index';
import { cryptosNames } from '@/services/formtaDataCrypto';
import UnavailablePage from '@/components/UnavailablePage';

interface WithdrawalsQuotasType {
  withdrawMinFee: number;
  withdrawMinSize: number;
}

export default async function Page({ params }: { params: { crypto: string } }) {
  const cryptoSymbol = params.crypto.toUpperCase();
  const cryptoName = cryptosNames.find(val => val.symbol === cryptoSymbol)
    ?.name as string;

  const token = cookies().get('token')?.value;

  let userData;
  let userCryptoBalance;
  let dataCrypto;
  let dataWithdrawalsQuotas: WithdrawalsQuotasType = {
    withdrawMinFee: 0,
    withdrawMinSize: 0,
  };

  try {
    const userRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/show-user`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      }
    );
    userData = (await userRes.json()) as ShowUserType;
    const findUserCryptoBalance = userData.cryptos.find(
      val => val.name === cryptoName
    );
    userCryptoBalance = findUserCryptoBalance ? findUserCryptoBalance.value : 0;

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
    dataCrypto = {
      NAME: cryptoName,
      ...metaData.RAW[cryptoSymbol].USD,
    } as CryptoType;

    const { dataKucoin, errKucoin } = await fetchKucoinApi({
      apiEndpoint: '/api/v1/withdrawals/quotas',
      apiMethod: 'GET',
      apiQueryString: `?currency=${cryptoSymbol}`,
    });
    if (errKucoin) {
      throw new Error('Internal server error');
    }
    if (dataKucoin) {
      dataWithdrawalsQuotas = {
        withdrawMinFee: +dataKucoin.withdrawMinFee,
        withdrawMinSize: +dataKucoin.withdrawMinSize,
      };
    }
  } catch (err) {
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
