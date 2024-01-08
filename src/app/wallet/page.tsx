import { cookies } from 'next/headers';

import { ShowUserType } from '@/components/header';
import calBalance from '@/services/calcBalance';
import calcPatrimonyTotal from '@/services/calcPatrimonyTotal';
import calInvested from '@/services/calcInvested';

export default async function Page() {
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
  const userPatrimonyInvested = {
    patrimony: calcPatrimonyTotal(
      userData.active,
      userData.veliabilities,
      calBalance(userData.transactions)
    ),
    invested: calInvested(userData.active),
  };

  return (
    <>
      <main className="mt-20">
        <div className="min-h-full-screen-80px bg-black-section px-20 py-14"></div>
      </main>
    </>
  );
}
