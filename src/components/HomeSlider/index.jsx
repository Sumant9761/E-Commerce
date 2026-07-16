import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomeSlider = () => {
  return (
    <div className="homeslider">
      <div className="container">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <img
              src="https://bacola-server.advanceuitechniques.com/download/file_1783572199269_NewProject.jpg"
              alt="Banner slide"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://bacola-server.advanceuitechniques.com/download/file_1783572128692_NewProject(6).jpg"
              alt="Banner slide"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://bacola-server.advanceuitechniques.com/download/file_1783572162440_NewProject(11).jpg"
              alt="Banner slide"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://bacola-server.advanceuitechniques.com/download/file_1783572184095_NewProject(1).jpg"
              alt="Banner slide"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://bacola-server.advanceuitechniques.com/download/file_1784208027398_NewProject(3).png"
              alt="Banner slide"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://bacola-server.advanceuitechniques.com/download/file_1783571871195_NewProject(27).jpg"
              alt="Banner slide"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://bacola-server.advanceuitechniques.com/download/file_1784207968935_NewProject(10).jpg"
              alt="Banner slide"
              className="w-full"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
