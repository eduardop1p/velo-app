import PrevUrl from '@/components/prevUrl';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function InfoCrypto({
  children,
  cryptoName,
  cryptoOverview,
  cryptoPoints,
}: {
  children: ReactNode;
  cryptoName: string;
  cryptoOverview: string;
  cryptoPoints: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <section className="min-h-full-screen-80px min flex">
      <div className="bg-gray-section-2 min-h-full-screen-80px w-2/5 flex-none">
        <div className="bg-secondary w-full h-full-screen-80px flex justify-center items-center">
          <div className="w-3/4 h-3/4 fill-primary flex-none relative">
            {children}
          </div>
        </div>
      </div>
      <div className="px-20 py-14 flex-none w-3/5 bg-gray-section-2">
        <div className="flex flex-col gap-8">
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
            currentPage={cryptoName}
            color="text-black"
            fill="fill-black"
          />
          <span className="text-blue text-3xl font-semibold">{cryptoName}</span>
          <p className="text-black text-2xl font-normal">{cryptoOverview}</p>
          <Link
            href="/create-account"
            className="rounded text-sm flex items-center justify-center font-normal whitespace-nowrap h-12 px-16 w-60 bg-blue text-primary hover:bg-bluehover transition-colors duration-200"
          >
            Open your account
          </Link>
        </div>
        <div className="grid grid-cols-3 mt-16 gap-8">
          {cryptoPoints.map((val, index) => (
            <div className="flex flex-col gap-5" key={index.toString()}>
              <div className="w-8 h-8 fill-blue flex-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  width="100%"
                  viewBox="0 0 576 512"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V428.7c-2.7 1.1-5.4 2-8.2 2.7l-60.1 15c-3 .7-6 1.2-9 1.4c-.9 .1-1.8 .2-2.7 .2H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 381l-9.8 32.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.8 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8h8.9c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7L384 203.6V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM549.8 139.7c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM311.9 321c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L512.1 262.7l-71-71L311.9 321z" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-black font-normal text-base text-left">
                  {val.title}
                </span>
                <p className="text-sm text-gray-000000b3 font-normal">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
