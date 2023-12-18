import Image from 'next/image';
import Link from 'next/link';

export default function TimeLineApp() {
  return (
    <div className="flex gap-8 flex-col">
      <div className="flex flex-col gap-3 relative z-[2]">
        <div className="flex gap-3 items-center">
          <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
            1
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black text-base">Click</span>
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
          <span className="text-black text-base">
            Complete the requested registration.
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
            3
          </div>
          <span className="text-black text-base">
            Confirm your activation email
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
            4
          </div>
          <span className="text-black text-base">
            Ready! Now you can invest in crypto with ease.
          </span>
        </div>
        <div className="absolute h-[164px] bg-blue w-1 left-[14px] -z-[1]"></div>
      </div>
      <div className="flex gap-4 flex-col">
        <span className="text-sm text-black">
          Or download our app and start your registration directly there.
        </span>
        <div className="flex gap-4">
          <Image
            width={126}
            height={68}
            className="flex-none rounded"
            src="/assets/imgs/velo-img-11.png"
            alt="velo-img-11"
          />
          <Image
            width={126}
            height={68}
            className="flex-none rounded"
            src="/assets/imgs/velo-img-12.png"
            alt="velo-img-12"
          />
        </div>
      </div>
    </div>
  );
}
