import { Metadata } from 'next';

import PrevUrl from '@/components/prevUrl';
import NewsletterForm from '@/components/newsletterForm';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Learn how to invest in cryptocurrencies | Velo',
};

export default function Page() {
  return (
    <>
      <main className="mt-20">
        <section className="flex">
          <div className="flex flex-col relative min-h-full-screen-80px bg-black-section px-20 py-14 w-1/2 items-center justify-center">
            <div className="absolute top-14 left-20">
              <PrevUrl
                currentPage="News"
                color="text-primary"
                fill="fill-primary"
              />
            </div>
            <div className="flex flex-col gap-4 self-start">
              <h2 className="text-3xl text-primary font-semibold">
                Newsletters Velo
              </h2>
              <p className="text-primary-2 text-[15px] font-normal">
                Receive the best content about crypto directly in your email and
                stay up to date with all the news. Discover Velo Direct and
                Market Overview.
              </p>
            </div>
          </div>
          <div className="bg-black-section-2 min-h-full-screen-80px flex flex-col justify-between w-1/2 px-20 py-14">
            <div>
              <h2 className="text-primary font-semibold text-3xl mb-3">
                sign up
              </h2>
              <p className="text-primary font-normal text-sm">
                Do like thousands of people who are learning about crypto in a
                simple way.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer footerAddress />
    </>
  );
}
