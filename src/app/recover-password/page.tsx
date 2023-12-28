import { Metadata } from 'next';
import Image from 'next/image';

import FormRecoverPassword from '@/components/formRecoverPassword';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Log in and start investing | Velo',
};

export default async function Page() {
  return (
    <>
      <main className="mt-20">
        <section className="w-full px-20 py-14 bg-black flex gap-20 h-full-screen-80px items-center justify-between relative">
          <h2 className="text-primary text-4xl font-normal self-start mt-10">
            Login to your crypto account
          </h2>
          <Image
            src="/assets/imgs/velo-img-8.png"
            alt="velo-img-8"
            width={401}
            height={364}
            className="absolute bottom-0"
          />
          <FormRecoverPassword />
        </section>
      </main>
      <Footer footerAddress />
    </>
  );
}
