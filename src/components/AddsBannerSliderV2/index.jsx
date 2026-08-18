import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import BannerBoxV2 from "../BannerBoxV2";

const AdsBannerSliderV2 = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items || 3}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: props.items || 3, spaceBetween: 10 }
        }}
        className="smlBtn"
      >
        {props?.data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <BannerBoxV2
                info={item?.alignInfo}
                item={item}
                image={item?.images[0]}
                link={"/"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AdsBannerSliderV2;
