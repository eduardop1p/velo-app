'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

export default function SlideMarketOverview() {
  return (
    <div className="w-full max-h-[300px]">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          modifierClass: 'swiper-pagination-market-overview-',
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
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden">
            <Image
              src="/assets/imgs/velo-img-16.png"
              alt="velo-img-16"
              sizes="100vw"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
              }}
              width={500}
              height={300}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden">
            <Image
              src="/assets/imgs/velo-img-17.png"
              alt="velo-img-17"
              sizes="100vw"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
              }}
              width={500}
              height={300}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden">
            <Image
              src="/assets/imgs/velo-img-18.png"
              alt="velo-img-18"
              sizes="100vw"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
              }}
              width={500}
              height={300}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-1 border-solid border-272a2eff rounded-lg overflow-hidden">
            <Image
              src="/assets/imgs/velo-img-19.png"
              alt="velo-img-19"
              sizes="100vw"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
              }}
              width={500}
              height={300}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
