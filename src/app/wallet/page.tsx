import { cookies } from 'next/headers';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import Link from 'next/link';
import Stripe from 'stripe';
import dynamic from 'next/dynamic';

const WalletGraphic = dynamic(() => import('@/components/walletGraphic'), {
  ssr: false,
  loading: () => <SkeletonWalletGraphic />,
});
import calBalance from '@/services/calcBalance';
import calcPatrimonyTotal from '@/services/calcPatrimonyTotal';
import calInvested from '@/services/calcInvested';
import calTransit from '@/services/calcTransit';
import fetchGetUser from '@/services/fetchGetUser';
import { UserPatrimonyInvestedType } from '../home/page';
import AlertSuccessDeposit from '@/components/walletReceive/alertSuccessDeposit';
import UnavailablePage from '@/components/UnavailablePage';
import { UserType } from '../api/models/users';
import SkeletonWalletGraphic from '@/components/walletGraphic/skeletonWalletGraphic';
import AlertSuccessWithdraw from '@/components/walletSend/alertSuccessWithdraw';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function Page({
  searchParams,
}: {
  searchParams: {
    payment_intent: string | undefined;
    payment_withdraw: string | undefined;
  };
}) {
  const token = cookies().get('token')?.value as string;
  let userData: UserType;
  let userPatrimonyInvested: UserPatrimonyInvestedType<number>;

  try {
    try {
      const payment_intent = searchParams.payment_intent;
      if (payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent); // eslint-disable-line
        if (paymentIntent.status === 'succeeded') { // eslint-disable-line
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/transactions-wallets`,
            {
              method: 'POST',
              body: JSON.stringify({
                type: 'money',
                method: 'deposit',
                symbol: paymentIntent.currency.toUpperCase(),
                userId: paymentIntent.metadata.userId,
                dollarValue: paymentIntent.metadata.depositAmountDollar,
                amountReceived: paymentIntent.amount_received, // apenas para depositos em moedas ficundiarias
                paymentIntent: payment_intent,
              }),
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }

    userData = await fetchGetUser(token);
    userPatrimonyInvested = {
      patrimony: calcPatrimonyTotal(
        userData.active,
        userData.veliabilities,
        calBalance(userData.transactions)
      ),
      invested: {
        active: userData.active,
        value: calInvested(userData.active),
      },
      balance: calBalance(userData.transactions),
      transit: calTransit(userData.transactions),
    };
  } catch (err) {
    console.log(err);
    return <UnavailablePage />;
  }

  return (
    <>
      <main className="mt-20">
        {searchParams.payment_intent && <AlertSuccessDeposit />}
        {searchParams.payment_withdraw && <AlertSuccessWithdraw />}
        <div className="min-h-full-screen-80px bg-black-section px-20 py-14 flex flex-col gap-16">
          <WalletGraphic userPatrimonyInvested={userPatrimonyInvested} />
          <section className="w-full flex flex-col gap-5">
            <h2 className="text-xl text-primary font-normal">
              Contracted assets
            </h2>
            <div className="flex gap-[10px]">
              <Link
                href="/wallet/send"
                className="bg-272a2eff rounded h-9 px-4 py-2 cursor-pointer flex gap-2 items-center hover:bg-34383cff transition-colors duration-200"
              >
                <div className="flex-none flex items-center justify-center h-3 w-3 fill-primary">
                  <FaArrowUp />
                </div>
                <span className="text-sm text-primary font-normal">Send</span>
              </Link>
              <Link
                href="/wallet/receive"
                className="bg-272a2eff rounded h-9 px-4 py-2 cursor-pointer flex gap-2 items-center hover:bg-34383cff transition-colors duration-200"
              >
                <div className="flex-none flex items-center justify-center h-3 w-3 fill-primary">
                  <FaArrowDown />
                </div>
                <span className="text-sm text-primary font-normal">
                  Deposit
                </span>
              </Link>
            </div>
          </section>
          <section className="w-full flex flex-col gap-3">
            <div className="w-[83px] h-[40px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
              >
                <rect
                  width="62.827"
                  height="39.515"
                  rx="19.757"
                  transform="matrix(1 0 0 -1 0 40)"
                  fill="url(#A)"
                />
                <ellipse
                  cx="19.77"
                  cy="19.66"
                  rx="19.77"
                  ry="19.66"
                  transform="matrix(0 1 1 0 43.1793 0)"
                  fill="#195ab4"
                />
                <ellipse
                  cx="19.66"
                  cy="19.77"
                  rx="19.66"
                  ry="19.77"
                  transform="matrix(1 0 0 -1 18.9624 39.54)"
                  fill="url(#B)"
                />
                <defs>
                  <linearGradient
                    id="A"
                    x1="0"
                    y1="19.786"
                    x2="62.827"
                    y2="19.786"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#195ab4" />
                    <stop offset="1" stop-color="#549cff" />
                  </linearGradient>
                  <linearGradient
                    id="B"
                    x1="0"
                    y1="19.799"
                    x2="22.643"
                    y2="19.758"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#195ab4" />
                    <stop offset="1" stop-color="#195ab4" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-xl text-primary font-normal">
              {userData.transactions.length
                ? 'Make a deposit'
                : 'Make your first deposit'}
            </h1>
            <p className="text-sm text-primary font-normal">
              To acquire assets, simply deposit them into your wallet. It is
              also possible to bring your crypto assets from another account to
              Velo.
            </p>
            <Link
              href="/wallet/receive"
              className="text-primary w-fit bg-195ab4ff hover:bg-blue transition-colors duration-200 text-sm font-medium h-9 px-4 py-2 rounded flex items-center justify-center"
            >
              Deposit now
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
