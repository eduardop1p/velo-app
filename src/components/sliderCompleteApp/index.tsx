'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

export default function SliderCompleteApp() {
  return (
    <div className="w-[380px] h-[610px]">
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
          <Image
            width={380}
            height={513}
            src="/assets/imgs/velo-img-5.png"
            alt="velo-img-5"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={380}
            height={513}
            src="/assets/imgs/velo-img-6.png"
            alt="velo-img-6"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={380}
            height={513}
            src="/assets/imgs/velo-img-3.png"
            alt="velo-img-3"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
