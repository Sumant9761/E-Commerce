import React, { useRef, useState } from "react";
import ZoomModule from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const InnerImageZoom = ZoomModule.default;

const ProductZoom = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSliderIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="slider w-[15%]">
          <Swiper
            ref={zoomSliderSml}
            direction={"vertical"}
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[570px] overflow-hidden"
          >
            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 0 ? 'opacity-1' : 'opacity-30'}`}
                onClick={() => goto(0)}
              >
                <img
                  src="/RedKurti1.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 1 ? 'opacity-1' : 'opacity-30'}`}
                onClick={() => goto(1)}
              >
                <img
                  src="/RedKurti2.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="zoomContainer w-[85%] h-[570px] overflow-hidden rounded-md">
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
          >
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={"/RedKurti1.jpg"}
              />
            </SwiperSlide>

            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={"/RedKurti2.jpg"}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
