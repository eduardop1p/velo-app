import Link from 'next/link';
import Image from 'next/image';

export default function RegisterNewsletterCrypto() {
  return (
    <section className="bg-primary px-20 py-14 w-full">
      <div className="w-full flex p-6 justify-between items-center bg-secondary rounded">
        <div className="flex items-center gap-4">
          <Image
            width={88}
            height={88}
            src="/assets/svg/velo-svg-11.svg"
            alt="velo-svg-11"
          />
          <div className="flex flex-col gap-[2px]">
            <p className="text-primary text-xl font-normal">
              Stay up to date with everything about crypto
            </p>
            <p className="text-primary text-sm font-normal">
              Find out which are the best opportunities for your portfolio.
            </p>
          </div>
        </div>
        <Link
          href="/newsletters"
          className="bg-primary text-black font-normal text-sm flex items-center justify-center h-14 w-fit px-8 rounded hover:text-primary hover:bg-blue transition-colors duration-200"
        >
          Sign up for Velo newsletter
        </Link>
      </div>
    </section>
  );
}
