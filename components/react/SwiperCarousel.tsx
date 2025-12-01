import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import type { SwiperConfig } from '../../types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SwiperCarouselProps {
  children: React.ReactNode[];
  config?: SwiperConfig;
  className?: string;
  slideClassName?: string;
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
  children,
  config = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    },
    navigation: true
  },
  className = '',
  slideClassName = ''
}) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // Initialize any additional functionality here
    if (swiperRef.current) {
      // Swiper is ready
    }
  }, []);

  return (
    <div className={`swiper-carousel ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={config.slidesPerView}
        spaceBetween={config.spaceBetween}
        loop={config.loop}
        autoplay={config.autoplay}
        pagination={config.pagination}
        navigation={config.navigation}
        breakpoints={config.breakpoints}
        className="swiper-container"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className={slideClassName}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
