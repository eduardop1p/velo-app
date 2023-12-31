'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

export default function SlideMarketOverview() {
  return (
    <div className="w-full h-[330px]">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        loop={true}
        modules={[Pagination, Autoplay]}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <SwiperSlide>
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden relative w-full h-[291px]">
            <Image
              src="/assets/imgs/velo-img-16.png"
              alt="velo-img-16"
              fill
              sizes="100%"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden relative w-full h-[291px]">
            <Image
              src="/assets/imgs/velo-img-17.png"
              alt="velo-img-17"
              fill
              sizes="100%"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden relative w-full h-[291px]">
            <Image
              src="/assets/imgs/velo-img-18.png"
              alt="velo-img-18"
              fill
              sizes="100%"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden relative w-full h-[291px]">
            <Image
              src="/assets/imgs/velo-img-19.png"
              alt="velo-img-19"
              fill
              sizes="100%"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
