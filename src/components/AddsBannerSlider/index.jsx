import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items || 4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: props.items || 4, spaceBetween: 10 }
        }}
        className="smlBtn"
      >
        <SwiperSlide >
            <BannerBox img={'/AddsBanner-1.jpg'} link={'/'} />
        </SwiperSlide>
        
        <SwiperSlide >
            <BannerBox img={'/AddsBanner-2.jpg'} link={'/'} />
        </SwiperSlide>

        <SwiperSlide >
            <BannerBox img={'/AddsBanner-3.jpg'} link={'/'} />
        </SwiperSlide>

        <SwiperSlide >
            <BannerBox img={'/AddsBanner-4.jpg'} link={'/'} />
        </SwiperSlide>

        <SwiperSlide >
            <BannerBox img={'/AddsBanner-1.jpg'} link={'/'} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
