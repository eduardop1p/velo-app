/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import { cookies } from 'next/headers';

import Deposit from '@/components/walletReceive/deposit';
import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import minimumDeposit from '@/services/minimunDeposit';

export default async function Page() {
  const token = cookies().get('token')?.value as string;

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
            currentPage="Deposit"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-normal text-primary">Deposit</h1>
          <p className="text-primary font-normal text-sm">
            Minimum deposit ${(minimumDeposit / 100).toFixed(2)}
          </p>
        </div>
        <div className="flex items-start gap-8 justify-between">
          {/* <Deposit token={token} /> */}
          <Image
            src="/assets/imgs/velo-img-8.png"
            alt="velo-img-8"
            width={400}
            height={200}
            className="-mt-[6.7rem]"
          />
        </div>
      </div>
    </main>
  );
}
