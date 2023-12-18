import Image from 'next/image';
import Link from 'next/link';

export default function SectionNewsletter() {
  return (
    <section className="bg-black w-full px-20 py-14 flex justify-between gap-20 items-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-primary text-2xl font-normal">
          Sign up for the Velo Newsletter
        </h2>
        <p className="text-primary text-base">
          A Velo platform for you to carry out your crypto operations.
        </p>
        <div className="flex gap-7 my-2">
          <div className="flex gap-2 items-center">
            <Image
              width={24}
              height={24}
              className="flex-none"
              src="/assets/svg/velo-svg-1.svg"
              alt="velo-svg-1"
            />
            <span className="text-primary text-base">All about crypto</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              width={24}
              height={24}
              className="flex-none"
              src="/assets/svg/velo-svg-1.svg"
              alt="velo-svg-1"
            />
            <span className="text-primary text-base">
              Straight to the point
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              width={24}
              height={24}
              className="flex-none"
              src="/assets/svg/velo-svg-1.svg"
              alt="velo-svg-1"
            />
            <span className="text-primary text-base">Helps you stand out</span>
          </div>
        </div>
        <Link
          href="/newsletter"
          className="flex items-center justify-center text-sm rounded h-14 w-[300px] bg-primary text-black hover:bg-blue hover:text-primary transition-colors duration-200"
        >
          I want to sign up
        </Link>
      </div>
      <Image
        className="flex-none"
        src="/assets/imgs/velo-img-2.png"
        alt="velo-img-2"
        width={500}
        height={340}
      />
    </section>
  );
}
