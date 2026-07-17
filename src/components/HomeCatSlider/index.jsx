import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider py-8">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/Features HomeCatSlider.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Fashion</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/Footwear.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Footwear</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/Groceries.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Groceries</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/jewellery.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Jewellery</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/bags img.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Bags</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/wellness.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Wellness</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/Beauty img.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Beauty</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/electronics.png"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[16px] font-[500] mt-3">Electronics</h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
