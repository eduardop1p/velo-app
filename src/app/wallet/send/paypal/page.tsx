/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Image from 'next/image';
import { cookies } from 'next/headers';

import PrevUrl from '@/components/prevUrl';
import Back from '@/components/searchFaq/back';
import UnavailablePage from '@/components/UnavailablePage';
import fetchGetUser from '@/services/fetchGetUser';
import { UserType } from '@/app/api/models/users';
import formatPrice from '@/services/formatPrice';
import calBalance from '@/services/calcBalance';
import PaypalForm from '@/components/walletSend/paypalForm';

export default async function Page() {
  const token = cookies().get('token')?.value!;
  let userData: UserType;
  const minimumWithdraw = 10;

  try {
    userData = await fetchGetUser(token);
  } catch {
    return <UnavailablePage />;
  }

  return (
    <main className="mt-20">
      <div className="min-h-full-screen-80px bg-black-section px-20 py-14 flex flex-col gap-5">
        <Back />
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
          currentPage="PayPal"
        />
        <Image
          width={70}
          height={70}
          src="/assets/imgs/paypal.png"
          alt="paypal"
          className="-ml-2 py-1 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-primary text-xl font-normal">
            Send funds to a PayPal wallet
          </h2>
          <p className="text-primary font-normal text-sm">
            Your data registered with Velo will be used to send funds. Fill in
            the fields below with the destination details:
          </p>
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="flex gap-4 justify-between w-1/2">
            <div className="flex gap-1">
              <h3 className="text-primary-2 font-normal text-[15px] whitespace-nowrap">
                Balance available:
              </h3>
              <span className="text-[15px] font-normal text-primary whitespace-nowrap">
                {formatPrice(calBalance(userData.transactions))}
              </span>
            </div>
            <div className="flex gap-1">
              <h3 className="text-primary-2 font-normal text-[15px] whitespace-nowrap">
                Minimum value:
              </h3>
              <span className="text-[15px] font-normal text-primary whitespace-nowrap">
                {formatPrice(minimumWithdraw)}
              </span>
            </div>
          </div>
          <PaypalForm
            balance={calBalance(userData.transactions)}
            token={token}
            minimumWithdraw={minimumWithdraw}
          />
        </div>
      </div>
    </main>
  );
}
