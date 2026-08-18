import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem";

const ProductSlider = (props) => {
  return (
    <div className="productsSlider py-3">
      <Swiper
        slidesPerView={props.items || 5}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: props.items || 5, spaceBetween: 10 }
        }}
        className="mySwiper"
      >
        {props?.data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ProductItem item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
