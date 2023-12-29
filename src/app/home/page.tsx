import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bitcoin, Ethereum and other cryptocurrencies | Velo',
  description:
    'Buying and selling bitcoin, ethereum and other cryptoactives with the credibility of OP Financial Group. Open your account.',
};

export default function Page() {
  return (
    <>
      <main className="mt-20">
        <section className="h-full-screen-80px bg-black">
          <h1 className="text-black">Home wallet</h1>
        </section>
      </main>
    </>
  );
}
