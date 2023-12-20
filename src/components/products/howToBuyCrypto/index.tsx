import Link from 'next/link';
import { FaClock } from 'react-icons/fa6';
import Image from 'next/image';

export default function HowToBuyCrypto({ cryptoName }: { cryptoName: string }) {
  return (
    <section className="bg-secondary px-20 py-14 flex w-full justify-between items-center gap-20">
      <div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-primary font-normal">
            How to buy{' '}
            <span className="text-2xl text-blue font-semibold">
              {cryptoName}
            </span>{' '}
            on Velo?
          </h2>
          <p className="text-base text-primary font-normal">
            Everything online and in just a few steps
          </p>
        </div>
        <div className="mt-8">
          <div className="flex flex-col gap-4 relative z-[2]">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                1
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary text-base">Click</span>
                <Link
                  className="text-blue-graphic underline text-base"
                  href="/create-account"
                >
                  Open your account
                </Link>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                2
              </div>
              <span className="text-primary text-base">
                Complete the requested registration.
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                3
              </div>
              <span className="text-primary text-base">
                Make your first deposit
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                4
              </div>
              <span className="text-primary text-base">
                Ready! Now just choose {cryptoName} and start investing.
              </span>
            </div>
            <div className="absolute h-[164px] bg-blue w-1 left-[14px] -z-[1]"></div>
          </div>
          <div className="flex mt-10 gap-3 w-2/3 items-center">
            <div className="h-[25px] w-[25px] fill-blue flex-none">
              <FaClock />
            </div>
            <p className="text-sm text-primary font-normal">
              If you need help, contact our support team, available 24 hours a
              day, via chat, email or phone.
            </p>
          </div>
        </div>
      </div>
      <Image
        src="/assets/imgs/velo-img-14.png"
        alt="velo-img-14"
        width={647}
        height={431}
      />
    </section>
  );
}
