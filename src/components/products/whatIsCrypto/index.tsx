import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

export default function WhatIsCrypto({
  cryptoName,
  cryptoOverview,
}: {
  cryptoName: string;
  cryptoOverview: string;
}) {
  return (
    <section className="px-20 py-10 w-full">
      <div className="flex gap-20 w-full justify-between items-start">
        <div className="w-4/5">
          <h2 className="text-2xl text-black font-normal mb-5">
            What is{' '}
            <span className="text-blue text-2xl font-semibold">
              {cryptoName}?
            </span>
          </h2>
          <p className="text-gray-000000b3 font-normal text-sm">
            {cryptoOverview}
          </p>
          <Link
            className="text-[15px] font-normal text-black mt-16 flex items-center gap-3 hover:text-gray-000000b3 group transition-colors duration-200"
            href="/create-account"
          >
            Investing in {cryptoName}
            <div className="w-4 h-4 fill-black flex justify-center items-center group-hover:fill-gray-000000b3 transition-colors duration-200">
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="relative w-[295px] h-[244px] overflow-hidden flex-none">
          <Image
            src="/assets/imgs/velo-img-13.png"
            alt="velo-img-13"
            width={295}
            height={400}
          />
          <div
            style={{
              transform: 'rotate3d(2.5, 3, 1, 57deg)',
            }}
            className="absolute w-[77px] h-[94px] flex items-center justify-center top-[120px] left-[32px]"
          >
            <span className="text-primary font-semibold text-xl">velo</span>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-black font-normal text-2xl">
          Why Velo is the best platform to buy{' '}
          <span className="text-blue font-normal text-2xl">{cryptoName}</span>?
        </h2>
        <p className="mt-8 text-[15px] text-gray-000000b3">
          Velo is a Finnish cryptocurrency platform for you to invest with
          security and confidence. Our security standard is the same as that
          used at OP Financial Group, the largest investment bank in Finland. It
          is the same standard of protection for more than $1 billion in assets
          under the {`company's`} management and administration.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-6">
        <div className="border-1 border-gray-00000033 border-solid rounded p-6 flex flex-col gap-3">
          <Image
            src="/assets/svg/velo-svg-10.svg"
            alt="velo-svg-10"
            width={31}
            height={31}
            className="flex-none"
          />
          <span className="text-sm text-black font-medium">
            Humanized service, 24/7
          </span>
          <p className="text-sm text-gray-000000b3 font-normal">
            The only crypto platform in Finland with service provided by real
            people
          </p>
        </div>
        <div className="border-1 border-gray-00000033 border-solid rounded p-6 flex flex-col gap-3">
          <Image
            src="/assets/svg/velo-svg-9.svg"
            alt="velo-svg-9"
            width={31}
            height={31}
            className="flex-none"
          />
          <span className="text-sm text-black font-medium">
            The best cryptoactives
          </span>
          <p className="text-sm text-gray-000000b3 font-normal">
            Our curation is carried out to offer only what we believe is best
            for you
          </p>
        </div>
        <div className="border-1 border-gray-00000033 border-solid rounded p-6 flex flex-col gap-3">
          <div className="w-[31px] h-[31px] relative">
            <Image
              src="/assets/svg/velo-svg-8.svg"
              alt="velo-svg-8"
              fill
              sizes="100%"
              className="flex-none object-contain"
            />
          </div>
          <span className="text-sm text-black font-medium">
            Your safety is paramount
          </span>
          <p className="text-sm text-gray-000000b3 font-normal">
            With all this expertise, we work to offer a safe environment for
            you, your investments, your assets and your data
          </p>
        </div>
        <Link
          href="/create-account"
          className="text-black text-sm h-12 px-4 w-fit flex rounded items-center justify-center bg-blue hover:bg-bluehover hover:text-primary transition-colors duration-200"
        >
          Open your account
        </Link>
      </div>
    </section>
  );
}
