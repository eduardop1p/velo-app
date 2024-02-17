/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import { cookies } from 'next/headers';

import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import { CryptoType } from '@/components/header';
import { cryptosNames } from '@/services/formatDataCrypto';
import UnavailablePage from '@/components/UnavailablePage';
import fetchGetUser from '@/services/fetchGetUser';
import fetchKucoinApi from '@/services/fetchKucoinApi';
import CopyWalletAddress from '@/components/walletReceive/copyWalletAddress';
import QRcodeReceive from '@/components/walletReceive/qrCode';

interface WalletAddressType {
  address: string;
  chain: string;
}

export default async function Page({ params }: { params: { crypto: string } }) {
  const cryptoSymbol = params.crypto.toUpperCase();
  const cryptoName = cryptosNames.find(val => val.symbol === cryptoSymbol)?.name!; // eslint-disable-line

  let dataWalletAddress: WalletAddressType;
  let dataCrypto: CryptoType;

  try {
    const dataCreateDepositAddresses = await fetchKucoinApi({
      apiEndpoint: '/api/v1/deposit-addresses',
      apiMethod: 'POST',
      body: { currency: cryptoSymbol },
      apiQueryString: '',
    });
    if (
      dataCreateDepositAddresses.errKucoin &&
      dataCreateDepositAddresses.errKucoin.code === 260000
    ) {
      const dataGetDepositAddresses = await fetchKucoinApi({
        apiEndpoint: '/api/v1/deposit-addresses',
        apiMethod: 'GET',
        apiQueryString: `?currency=${cryptoSymbol}`,
      });
      if (dataGetDepositAddresses.errKucoin) {
        throw new Error(dataGetDepositAddresses.errKucoin.msg);
      }
      dataWalletAddress = {
        address: dataGetDepositAddresses.dataKucoin.address,
        chain: dataGetDepositAddresses.dataKucoin.chain,
      };
    } else {
      if (dataCreateDepositAddresses.errKucoin) {
        throw new Error(dataCreateDepositAddresses.errKucoin.msg);
      }
      dataWalletAddress = {
        address: dataCreateDepositAddresses.dataKucoin.address,
        chain: dataCreateDepositAddresses.dataKucoin.chain,
      };
    }

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
              url: '/wallet/receive',
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
        <div className="flex flex-col gap-[14px]">
          <h2 className="text-primary text-xl font-normal">
            Receive {cryptoName}
          </h2>
          <p className="text-primary font-normal text-sm">
            To receive this currency, copy and use the address below or read the
            QR Code.
          </p>
        </div>

        <div className="mt-5 flex gap-8 justify-between w-9/12 items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-primary opacity-70 font-normal text-xs">
                Name
              </span>
              <h3 className="text-primary font-medium text-[15px]">
                {cryptoName} wallet
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-primary opacity-70 font-normal text-xs">
                Velo address for deposit
              </span>
              <div className="flex gap-3 items-center">
                <h3 className="text-primary font-medium text-[15px]">
                  {dataWalletAddress.address}
                </h3>
                <CopyWalletAddress copyValue={dataWalletAddress.address} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-primary opacity-70 font-normal text-xs">
                Network
              </span>
              <h3 className="text-primary font-medium text-[15px]">
                {dataWalletAddress.chain}
              </h3>
            </div>
          </div>
          <QRcodeReceive qrvalue={dataWalletAddress.address} />
        </div>
      </div>
    </main>
  );
}
