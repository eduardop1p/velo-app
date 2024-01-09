import Link from 'next/link';
import Image from 'next/image';

import TimeLineApp from '@/components/TimeLineApp';
import SectionNewsletter from '@/components/sectionNewsletter';
import PrevUrl from '@/components/prevUrl';
import Footer from '@/components/footer';

export default function Page() {
  return (
    <>
      <main className="mt-20">
        <section className="w-full px-20 py-14 h-[450px] bg-black relative overflow-hidden">
          <PrevUrl
            firstIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 576 512"
              >
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
            }
            url1={{
              name: 'Home',
              url: '/',
            }}
            currentPage="About us"
            color="text-primary"
            fill="fill-primary"
          />
          <div className="flex justify-between items-center gap-20">
            <div className="mt-16 w-1/3 flex flex-col gap-4">
              <h2 className="text-primary text-2xl font-normal">
                The platform that will facilitate your access to
                cryptocurrencies.
              </h2>
              <p className="text-sm text-primary font-normal">
                Get to know Velo
              </p>
              <Link
                href="/create-account"
                className="h-12 px-4 bg-primary text-sm text-black font-normal w-fit rounded flex justify-center items-center hover:bg-blue hover:text-primary transition-colors duration-200"
              >
                Open your account
              </Link>
            </div>
          </div>
          <Image
            src="/assets/imgs/velo-img-8.png"
            alt="velo-img-8"
            width={440}
            height={460}
            className="flex-none absolute bottom-0 right-24"
          />
        </section>
        <section className="bg-gray-section w-full flex flex-col gap-4 px-20 py-14">
          <div className="flex flex-col">
            <h2 className="text-blue text-2xl font-semibold mb-6">Velo</h2>
            <div className="flex justify-between w-5/6">
              <div>
                <p className="text-xl text-gray-000000b3 font-normal mb-4">
                  Differences
                </p>
              </div>
              <div>
                <p className="text-xl text-gray-000000b3 font-normal mb-4">
                  Purpose
                </p>
                <p className="text-gray-000000b3 text-sm font-normal">
                  Creating a world where people feel safe to explore new ways of
                  investing.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-3 mb-8">
              <span className="text-gray-000000b3 text-sm relative before:content-[''] before:absolute before:top-[40%] before:-left-3 before:-translate-y-[40%] before:bg-blue before:w-[5px] before:h-[5px] before:rounded-full">
                Investing in crypto safely and easily.
              </span>
              <span className="text-gray-000000b3 text-sm relative before:content-[''] before:absolute before:top-[40%] before:-left-3 before:-translate-y-[40%] before:bg-blue before:w-[5px] before:h-[5px] before:rounded-full">
                Clear platform to understand and intuitive to use.
              </span>
              <span className="text-gray-000000b3 text-sm relative before:content-[''] before:absolute before:top-[40%] before:-left-3 before:-translate-y-[40%] before:bg-blue before:w-[5px] before:h-[5px] before:rounded-full">
                Humanized service in English.
              </span>
              <span className="text-gray-000000b3 text-sm relative before:content-[''] before:absolute before:top-[40%] before:-left-3 before:-translate-y-[40%] before:bg-blue before:w-[5px] before:h-[5px] before:rounded-full">
                Agile support to help you whenever you need it.
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl text-black font-normal">
                Your safety is fundamental - A Velo company
              </p>
              <p className="text-black text-sm">
                At Velo, we take security seriously. We are a platform plugged
                into OP Financial Group, which has been in the investment market
                for 40 years. With all this expertise, we work tirelessly to
                offer a safe environment for you, your investments, your assets
                and your data.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-primary w-full flex justify-between items-center gap-8 px-20 py-14">
          <Image
            width={520}
            height={530}
            src="/assets/imgs/velo-img-1.png"
            alt="velo-img-1"
            className="rounded-sm"
          />
          <div className="flex flex-col">
            <h2 className="text-black text-2xl font-normal mb-3">
              How to become a Velo customer and start investing in cryptos?
            </h2>
            <p className="text-base text-gray-000000b3 font-normal">
              You can register our website
            </p>
            <div className="mt-7">
              <TimeLineApp />
            </div>
          </div>
        </section>
        <SectionNewsletter />
      </main>
      <Footer />
    </>
  );
}
