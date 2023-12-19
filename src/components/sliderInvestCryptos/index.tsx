'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';

import { CryptoType } from '../header';

export default function SlideInvestInCryptos({
  dataCryptoassets,
}: {
  dataCryptoassets: CryptoType[];
}) {
  return (
    <Swiper
      spaceBetween={23}
      slidesPerView={4}
      // centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation={false}
      loop={true}
      modules={[Pagination, Autoplay]}
      style={{
        width: '100%',
        height: '280px',
      }}
    >
      {dataCryptoassets.map((val, index) => (
        <SwiperSlide key={index.toString()}>
          <div className="p-6 border-1 border-solid border-gray-b8bec4ff rounded h-[245px] flex flex-col gap-4 relative">
            <div className="flex gap-2 items-center ">
              <Image
                width={45}
                height={45}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${val.IMAGEURL}`}
                alt={val.NAME}
              />
              <div className="flex flex-col">
                <h2 className="font-normal text-black text-lg">{val.NAME}</h2>
                <span className="font-normal text-xs text-secondary">
                  {val.FROMSYMBOL}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-b8bec4ff h-[1.5px]"></div>
            <p className="text-black font-normal text-sm text-left">
              {val.DESCRIPTION}
            </p>
            <Link
              className="text-[15px] absolute bottom-6 self-start font-normal text-black flex items-center gap-2 hover:text-gray-000000b3 group transition-colors duration-200"
              href="/login"
            >
              Buy {val.NAME}
              <div className="w-[13px] h-[13px] fill-black flex justify-center items-center group-hover:fill-gray-000000b3 transition-colors duration-200">
                <FaArrowRight />
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
