import { Metadata } from 'next';
import { cookies } from 'next/headers';
// import dynamic from 'next/dynamic';

// const UserPatrimony = dynamic(() => import('@/components/userPatrimony'), {
//   ssr: false,
// });
import UserPatrimony from '@/components/userPatrimony';
import { CryptoType, ShowUserType } from '@/components/header';
import SlideMarketOverview from '@/components/slideMarketOverview';
import FollowMarket from '@/components/followMarket';
import formatDataCrypto from '@/services/formtaDataCrypto';

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

  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show-user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  const userData = (await userRes.json()) as ShowUserType;
  const userBalance = {
    patrimony: userData.balance,
    invested: userData.invested,
  };

  const resCryptos = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,XRP,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
    {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    }
  );
  const metaData = await resCryptos.json();
  const dataCryptos = formatDataCrypto(
    'full-data',
    metaData.RAW
  ) as CryptoType[];

  return (
    <>
      <main className="mt-20">
        <div className="bg-black-section min-h-full-screen-80px px-20 py-10 flex flex-col gap-16 items-center w-full">
          <UserPatrimony userBalance={userBalance} />
          <SlideMarketOverview />
          <FollowMarket dataCryptos={dataCryptos} />
        </div>
      </main>
    </>
  );
}
