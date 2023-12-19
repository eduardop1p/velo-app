import Link from 'next/link';
import { FaArrowRight, FaClock } from 'react-icons/fa6';
import Image from 'next/image';

import PrevUrl from '@/components/prevUrl';
import formatDataCrypto from '@/services/formtaDataCrypto';
import { CryptoType } from '@/components/header';
import SlideInvestInCryptos from '@/components/sliderInvestCryptos';
import Doubts from '@/components/doubts';
import Footer from '@/components/footer';

export default async function Page() {
  const resCryptoassets = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
    {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    }
  );
  const metaData = await resCryptoassets.json();
  const dataCryptoassets = formatDataCrypto(
    'full-data',
    metaData.RAW
  ) as CryptoType[];

  return (
    <>
      <main className="mt-20">
        <section className="-h-full-screen-80px min flex">
          <div className="bg-secondary h-full w-2/5 flex justify-center items-center flex-none">
            <div className="w-3/4 h-3/4 fill-primary flex-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 505 438"
                width="505"
                height="438"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: 'translate3d(0px, 0px, 0px)',
                  contentVisibility: 'visible',
                }}
              >
                <defs>
                  <clipPath>
                    <rect width="505" height="438" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g>
                  <g
                    style={{ display: 'block' }}
                    transform="matrix(1,0,0,1,228,132)"
                    opacity="1"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(255,255,255)"
                        strokeOpacity="1"
                        strokeWidth="3"
                        d=" M0,-130.5 C72.02294921875,-130.5 130.5,-72.02294921875 130.5,0 C130.5,72.02294921875 72.02294921875,130.5 0,130.5 C-72.02294921875,130.5 -130.5,72.02294921875 -130.5,0 C-130.5,-72.02294921875 -72.02294921875,-130.5 0,-130.5z"
                      ></path>
                    </g>
                  </g>
                  <g
                    style={{ display: 'block' }}
                    transform="matrix(1,0,0,1,0,0)"
                    opacity="1"
                  >
                    <g
                      opacity="1"
                      transform="matrix(1,0,0,1,209.19700622558594,211.9290008544922)"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                          stroke="rgb(255,255,255)"
                          strokeOpacity="1"
                          strokeWidth="4"
                          d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                        ></path>
                      </g>
                    </g>
                    <g
                      opacity="1"
                      transform="matrix(1,0,0,1,209.19700622558594,49.104000091552734)"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                          stroke="rgb(255,255,255)"
                          strokeOpacity="1"
                          strokeWidth="4"
                          d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                        ></path>
                      </g>
                    </g>
                  </g>
                  <g
                    style={{ display: 'block' }}
                    transform="matrix(1,0,0,1,27,0)"
                    opacity="1"
                  >
                    <g
                      opacity="1"
                      transform="matrix(1,0,0,1,209.19700622558594,211.9290008544922)"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                          stroke="rgb(255,255,255)"
                          strokeOpacity="1"
                          strokeWidth="4"
                          d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                        ></path>
                      </g>
                    </g>
                    <g
                      opacity="1"
                      transform="matrix(1,0,0,1,209.19700622558594,49.104000091552734)"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                          stroke="rgb(255,255,255)"
                          strokeOpacity="1"
                          strokeWidth="4"
                          d=" M0,-13.206000328063965 C0,-13.206000328063965 0,13.206000328063965 0,13.206000328063965"
                        ></path>
                      </g>
                    </g>
                  </g>
                  <g
                    style={{ display: 'block' }}
                    transform="matrix(1,0,0,1,184.25,61.99999237060547)"
                    opacity="1"
                  >
                    <g
                      opacity="1"
                      transform="matrix(1,0,0,1,53,31.934999465942383)"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                          stroke="rgb(255,255,255)"
                          strokeOpacity="1"
                          strokeWidth="4"
                          d=" M-52.823001861572266,-31.784000396728516 C-52.823001861572266,-31.784000396728516 8.14900016784668,-31.934999465942383 8.14900016784668,-31.934999465942383 C25.773000717163086,-31.934999465942383 40.073001861572266,-17.635000228881836 40.073001861572266,0.012000000104308128 C40.073001861572266,17.63599967956543 25.79599952697754,31.934999465942383 8.14900016784668,31.934999465942383 C8.14900016784668,31.934999465942383 -40.073001861572266,31.934999465942383 -40.073001861572266,31.934999465942383"
                        ></path>
                      </g>
                    </g>
                    <g
                      opacity="1"
                      transform="matrix(1,0,0,1,57.33599853515625,100.14099884033203)"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                          stroke="rgb(255,255,255)"
                          strokeOpacity="1"
                          strokeWidth="4"
                          d=" M8.137999534606934,-36.270999908447266 C28.18000030517578,-36.270999908447266 44.409000396728516,-20.04199981689453 44.409000396728516,0 C44.409000396728516,20.04199981689453 28.18000030517578,36.270999908447266 8.137999534606934,36.270999908447266 C8.137999534606934,36.270999908447266 -57.159000396728516,36.42300033569336 -57.159000396728516,36.42300033569336"
                        ></path>
                      </g>
                    </g>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(255,255,255)"
                        fillOpacity="1"
                        d=" M13.25,0.9380000233650208 C13.25,0.9380000233650208 13.25,135.875 13.25,135.875"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(255,255,255)"
                        strokeOpacity="1"
                        strokeWidth="4"
                        d=" M13.25,0.9380000233650208 C13.25,0.9380000233650208 13.25,135.875 13.25,135.875"
                      ></path>
                    </g>
                  </g>
                  <g
                    style={{ display: 'block' }}
                    transform="matrix(1,0,0,1,252.5,349.75)"
                    opacity="1"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(107,170,255)"
                        strokeOpacity="1"
                        strokeWidth="3"
                        d=" M-252.5,86 C-252.5,86 -190.4239959716797,86 -190.4239959716797,86 C-190.4239959716797,86 -115.76399993896484,11.32699966430664 -115.76399993896484,11.32699966430664 C-115.76399993896484,11.32699966430664 -89.75900268554688,37.33700180053711 -89.75900268554688,37.33700180053711 C-89.75900268554688,37.33700180053711 59.560001373291016,37.33700180053711 59.560001373291016,37.33700180053711 C59.560001373291016,37.33700180053711 182.87399291992188,-86 182.87399291992188,-86 C182.87399291992188,-86 252.5,-86 252.5,-86"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="px-20 py-14 flex-none w-3/5">
            <div className="flex flex-col gap-8">
              <PrevUrl
                currentPage="Bitcoin"
                color="text-black"
                fill="fill-black"
              />
              <span className="text-blue text-3xl font-semibold">Bitcoin</span>
              <p className="text-black text-2xl font-normal">
                Invest in the cryptocurrency of the century safely
              </p>
              <Link
                href="/create-account"
                className="rounded text-sm flex items-center justify-center font-normal whitespace-nowrap h-12 px-16 w-60 bg-blue text-primary hover:bg-bluehover transition-colors duration-200"
              >
                Open your account
              </Link>
            </div>
            <div className="grid grid-cols-3 mt-16 gap-8">
              <div className="flex flex-col gap-5">
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
                    Diversification
                  </span>
                  <p className="text-sm text-gray-000000b3 font-normal">
                    Driven by different risk and return factors than traditional
                    investments, bitcoin can be strategic in building an
                    investment portfolio.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
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
                    Empowerment
                  </span>
                  <p className="text-sm text-gray-000000b3 font-normal">
                    Bitcoin is an asymmetrically attractive asset, that is, the
                    chances of capturing gains that will multiply the portion of
                    your capital allocated to the asset are greater than the
                    risk of losing the entire amount invested.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
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
                    Decentralization and innovation
                  </span>
                  <p className="text-sm text-gray-000000b3 font-normal">
                    Support an asset that promotes global financial inclusion
                    through decentralization. Buying bitcoin and other
                    cryptoactives is a way to directly expose yourself and
                    invest in innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-20 py-10 w-full">
          <div className="flex gap-20 w-full justify-between items-start">
            <div className="w-4/5">
              <h2 className="text-2xl text-black font-normal mb-5">
                What is{' '}
                <span className="text-blue text-2xl font-semibold">
                  Bitcoin?
                </span>
              </h2>
              <p className="text-gray-000000b3 font-normal text-sm">
                Bitcoin is a decentralized cryptocurrency that allows direct
                transactions between people, without the need for
                intermediaries. Based on blockchain technology, it offers
                security and anonymity, attracting investors in search of gains.
              </p>
              <Link
                className="text-[15px] font-normal text-black mt-16 flex items-center gap-3 hover:text-gray-000000b3 group transition-colors duration-200"
                href="/create-account"
              >
                Investing in Bitcoin
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
              <span className="text-blue font-normal text-2xl">Bitcoin</span>?
            </h2>
            <p className="mt-8 text-[15px] text-gray-000000b3">
              Velo is a Finnish cryptocurrency platform for you to invest with
              security and confidence. Our security standard is the same as that
              used at OP Financial Group, the largest investment bank in
              Finland. It is the same standard of protection for more than $1
              billion in assets under the {`company's`} management and
              administration.
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
                The only crypto platform in Finland with service provided by
                real people
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
                Our curation is carried out to offer only what we believe is
                best for you
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
        <section className="bg-secondary px-20 py-14 flex w-full justify-between items-center gap-20">
          <div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl text-primary font-normal">
                How to buy{' '}
                <span className="text-2xl text-blue font-semibold">
                  Bitcoin
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
                    Ready! Now just choose Bitcoin and start investing.
                  </span>
                </div>
                <div className="absolute h-[164px] bg-blue w-1 left-[14px] -z-[1]"></div>
              </div>
              <div className="flex mt-10 gap-3 w-2/3 items-center">
                <div className="h-[25px] w-[25px] fill-blue flex-none">
                  <FaClock />
                </div>
                <p className="text-sm text-primary font-normal">
                  If you need help, contact our support team, available 24 hours
                  a day, via chat, email or phone.
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
        <section className="bg-primary px-20 py-14 w-full">
          <h2 className="text-black text-2xl font-normal">
            Invest in other cryptos with Velo!
          </h2>
          <div className="mt-10 w-full">
            <SlideInvestInCryptos dataCryptoassets={dataCryptoassets} />
          </div>
        </section>
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
              href="/newsletter"
              className="bg-primary text-black font-normal text-sm flex items-center justify-center h-14 w-fit px-8 rounded hover:text-primary hover:bg-blue transition-colors duration-200"
            >
              Sign up for Velo newsletter
            </Link>
          </div>
        </section>
        <section className="w-full bg-primary px-20 py-14">
          <h2 className="text-2xl text-black font-normal">Doubts?</h2>
          <Doubts />
        </section>
      </main>
      <Footer footerAddress />
    </>
  );
}
