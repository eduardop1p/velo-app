import { CryptoType } from '@/components/header';
import Image from 'next/image';
import Link from 'next/link';

export default function NegotiateRecommendations({
  layer1Cryptos,
  defiCryptos,
  recommendedWallet1,
  recommendedWallet2,
  recommendedWallet3,
  showTitle,
}: {
  layer1Cryptos: CryptoType[];
  defiCryptos: CryptoType[];
  recommendedWallet1: CryptoType[];
  recommendedWallet2: CryptoType[];
  recommendedWallet3: CryptoType[];
  showTitle: boolean;
}) {
  return (
    <section className="w-full flex flex-col gap-4">
      {showTitle && (
        <h2 className="text-primary text-2xl font-normal">
          Crypto recommendations
        </h2>
      )}
      <div className="w-full grid grid-cols-3 gap-5">
        <Link
          className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
          href="/negotiate/recommendations/smart-contracts"
        >
          <div className="flex justify-between">
            <h4 className="text-base font-normal text-primary">
              Smart contracts
            </h4>
            <div className="bg-3d2d66ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
              Moderate
            </div>
          </div>
          <p className="text-xs opacity-50 text-primary font-normal">
            Smart Contract Networks
          </p>
          <div className="flex my-3 items-center">
            <div className="relative rounded-full flex items-center justify-center bg-627eea w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[0].IMAGEURL}`}
                width={30}
                height={30}
                alt={layer1Cryptos[0].NAME}
              />
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[1].IMAGEURL}`}
                width={30}
                height={30}
                alt={layer1Cryptos[1].NAME}
              />
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[2].IMAGEURL}`}
                width={30}
                height={30}
                alt={layer1Cryptos[2].NAME}
              />
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-ff0420 w-[35px] h-[35px]">
              <span className="text-primary text-xs italic font-semibold">
                OP
              </span>
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-ed3e43 w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[4].IMAGEURL}`}
                width={30}
                height={30}
                alt={layer1Cryptos[4].NAME}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xs opacity-50 text-primary font-normal">
              Minimum investment
            </p>
            <span className="text-primary text-[15px] font-medium">
              $500.00
            </span>
          </div>
          <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
        </Link>

        <Link
          className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
          href="/negotiate/recommendations/defi"
        >
          <div className="flex justify-between">
            <h4 className="text-base font-normal text-primary">DeFi</h4>
            <div className="bg-123570ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
              Sophisticated
            </div>
          </div>
          <p className="text-xs opacity-50 text-primary font-normal">
            Decentralized Finance
          </p>
          <div className="flex my-3 items-center">
            <div className="relative rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[0].IMAGEURL}`}
                width={30}
                height={30}
                alt={defiCryptos[0].NAME}
              />
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[1].IMAGEURL}`}
              width={35}
              height={35}
              alt={defiCryptos[1].NAME}
              className="relative z-[2] -ml-2 rounded-full !object-none"
            />
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-12d2b0 w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[2].IMAGEURL}`}
                width={30}
                height={30}
                alt={defiCryptos[2].NAME}
              />
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[3].IMAGEURL}`}
                width={30}
                height={30}
                alt={defiCryptos[3].NAME}
              />
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[4].IMAGEURL}`}
              width={35}
              height={35}
              alt={defiCryptos[4].NAME}
              className="relative z-[2] -ml-2 rounded-full !object-none"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs opacity-50 text-primary font-normal">
              Minimum investment
            </p>
            <span className="text-primary text-[15px] font-medium">
              $250.00
            </span>
          </div>
          <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
        </Link>

        <Link
          className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
          href="/negotiate/recommendations/3"
        >
          <div className="flex justify-between">
            <h4 className="text-base font-normal text-primary">
              Wallet recommendation
            </h4>
            <div className="bg-123570ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
              Sophisticated
            </div>
          </div>
          <p className="text-xs opacity-50 text-primary font-normal">
            Recommended Crypto Wallet
          </p>
          <div className="flex my-3 items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet1[0].IMAGEURL}`}
              width={35}
              height={35}
              alt={recommendedWallet1[0].NAME}
              className="rounded-full !object-none"
            />
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet1[1].IMAGEURL}`}
                width={30}
                height={30}
                alt={recommendedWallet1[1].NAME}
              />
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-ff0420 w-[35px] h-[35px]">
              <span className="text-primary text-xs italic font-semibold">
                OP
              </span>
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet1[3].IMAGEURL}`}
                width={30}
                height={30}
                alt={recommendedWallet1[3].NAME}
              />
            </div>
            <div className="text-primary font-medium text-sm relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-34383cff w-[35px] h-[35px]">
              +6
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xs opacity-50 text-primary font-normal">
              Minimum investment
            </p>
            <span className="text-primary text-[15px] font-medium">
              $820.00
            </span>
          </div>
          <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
        </Link>

        <Link
          className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
          href="/negotiate/recommendations/4"
        >
          <div className="flex justify-between">
            <h4 className="text-base font-normal text-primary">
              Wallet recommendation
            </h4>
            <div className="bg-3d2d66ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
              Moderate
            </div>
          </div>
          <p className="text-xs opacity-50 text-primary font-normal">
            Recommended Crypto Wallet
          </p>
          <div className="flex my-3 items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[0].IMAGEURL}`}
              width={35}
              height={35}
              alt={recommendedWallet2[0].NAME}
              className="rounded-full !object-none"
            />
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-627eea w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[1].IMAGEURL}`}
                width={30}
                height={30}
                alt={recommendedWallet2[1].NAME}
              />
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[2].IMAGEURL}`}
                width={30}
                height={30}
                alt={recommendedWallet2[2].NAME}
              />
            </div>
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[3].IMAGEURL}`}
                width={30}
                height={30}
                alt={recommendedWallet2[3].NAME}
              />
            </div>
            <div className="text-primary font-medium text-sm relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-34383cff w-[35px] h-[35px]">
              +5
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xs opacity-50 text-primary font-normal">
              Minimum investment
            </p>
            <span className="text-primary text-[15px] font-medium">
              $820.00
            </span>
          </div>
          <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
        </Link>
        <Link
          className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
          href="/negotiate/recommendations/5"
        >
          <div className="flex justify-between">
            <h4 className="text-base font-normal text-primary">
              Wallet recommendation
            </h4>
            <div className="bg-0e613aff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
              Conservative
            </div>
          </div>
          <p className="text-xs opacity-50 text-primary font-normal">
            Recommended Crypto Wallet
          </p>
          <div className="flex my-3 items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet3[0].IMAGEURL}`}
              width={35}
              height={35}
              alt={recommendedWallet3[0].NAME}
              className="rounded-full !object-none"
            />
            <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-627eea w-[35px] h-[35px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet3[1].IMAGEURL}`}
                width={30}
                height={30}
                alt={recommendedWallet3[1].NAME}
              />
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet3[2].IMAGEURL}`}
              width={35}
              height={35}
              alt={recommendedWallet3[2].NAME}
              className="rounded-full !object-none relative z-[2] -ml-2"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs opacity-50 text-primary font-normal">
              Minimum investment
            </p>
            <span className="text-primary text-[15px] font-medium">
              $250.00
            </span>
          </div>
          <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
        </Link>
      </div>
    </section>
  );
}
