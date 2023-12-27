import { Metadata } from 'next';
import Image from 'next/image';

import PrevUrl from '@/components/prevUrl';
import FormNewsletter from '@/components/formNewsletter';
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
            <FormNewsletter />
          </div>
        </section>
        <section className="flex gap-40 p-20 items-center justify-center">
          <Image
            width={240}
            height={240}
            src="/assets/svg/velo-svg-34.svg"
            alt="velo-svg-34"
          />
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-2xl text-black font-normal">Market Overview</h2>
            <p className="text-sm text-black font-normal">
              Invest in the crypto market intelligently. Weekly report produced
              by Velo Research and Products team so you can understand in just
              10 minutes everything that is happening in the crypto market.
            </p>
          </div>
        </section>
        <section className="flex justify-between gap-20 px-20 py-14 bg-black items-center">
          <div className="flex flex-col gap-3 w-1/2">
            <h2 className="text-primary text-2xl font-semibold">Velo Direct</h2>
            <p className="text-primary font-normal text-sm">
              Velo fortnightly newsletter with the biggest market news and the
              most interesting stories from the crypto world.
            </p>
            <div className="flex gap-2 items-center mt-2">
              <Image
                width={30}
                height={30}
                src="/assets/svg/velo-svg-35.svg"
                alt="velo-svg-35"
              />
              <div className="flex flex-col gap-[2px]">
                <h5 className="text-xs text-blue font-medium">
                  All about crypto
                </h5>
                <p className="text-primary font-normal text-xs">
                  Your biweekly dose of news from the crypto world.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <Image
                width={30}
                height={30}
                src="/assets/svg/velo-svg-36.svg"
                alt="velo-svg-36"
              />
              <div className="flex flex-col gap-[2px]">
                <h5 className="text-xs text-blue font-medium">
                  Straight to the point
                </h5>
                <p className="text-primary font-normal text-xs">
                  No unnecessary text. Just what you need to know.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <Image
                width={30}
                height={30}
                src="/assets/svg/velo-svg-37.svg"
                alt="velo-svg-37"
              />
              <div className="flex flex-col gap-[2px]">
                <h5 className="text-xs text-blue font-medium">
                  Help you stand out
                </h5>
                <p className="text-primary font-normal text-xs">
                  Market news so you can be the most up-to-date person in the
                  circle.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <Image
                width={30}
                height={30}
                src="/assets/svg/velo-svg-38.svg"
                alt="velo-svg-38"
              />
              <div className="flex flex-col gap-[2px]">
                <h5 className="text-xs text-blue font-medium">
                  Your lighter day
                </h5>
                <p className="text-primary font-normal text-xs">
                  Curated memes about crypto to make you happier.
                </p>
              </div>
            </div>
          </div>
          <div className="relative mr-14">
            <Image
              width={240}
              height={240}
              src="/assets/svg/velo-svg-34.svg"
              alt="velo-svg-34"
            />
            <div className="absolute rounded-xl w-[350px] overflow-hidden left-1/2 -translate-x-1/2 top-36">
              <div className="flex justify-center items-center h-12 bg-3d3d3d w-full">
                <h3 className="text-sm text-primary font-medium">
                  What was it like investing in dollars with velo?
                </h3>
              </div>
              <p className="bg-primary  text-base font-medium flex justify-center items-center w-full p-8">
                An incredible and trustworthy experience for crypto beginners
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer footerAddress />
    </>
  );
}
