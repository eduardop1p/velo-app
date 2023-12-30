import { Metadata } from 'next';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';

const UserPatrimony = dynamic(() => import('@/components/userPatrimony'), {
  ssr: false,
});
import { ShowUserType } from '@/components/header';

export const metadata: Metadata = {
  title: 'Bitcoin, Ethereum and other cryptocurrencies | Velo',
  description:
    'Buying and selling bitcoin, ethereum and other cryptoactives with the credibility of OP Financial Group. Open your account.',
};

export interface UserBalanceType {
  patrimony: string;
  invested: string;
}

export default async function Page() {
  const token = cookies().get('token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show-user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  const userData = (await res.json()) as ShowUserType;
  const userBalance = {
    patrimony: userData.balance,
    invested: userData.invested,
  };

  return (
    <>
      <main className="mt-20">
        <div className="bg-black-section min-h-full-screen-80px px-20 py-10 flex flex-col items-center w-full">
          <UserPatrimony userBalance={userBalance} />
        </div>
      </main>
    </>
  );
}
