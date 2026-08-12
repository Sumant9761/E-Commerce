import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { FaShippingFast } from "react-icons/fa";
import AdsBannerSlider from "../../components/AddsBannerSlider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductSlider from "../../components/ProductSlider";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BlogItem from "../../components/BlogItem";
import HomeBannerV2 from "../../components/HomeSliderV2";
import BannerBoxV2 from "../../components/BannerBoxV2";
import AdsBannerSliderV2 from "../../components/AddsBannerSliderV2";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import ProductLoading from "../../components/ProductLoading";

const Home = () => {
  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProduct, setPopularProduct] = useState([]);
  const [allProductData, setAllProductData] = useState([]);
  const [allFeaturedProductData, setAllFeaturedProductData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data);
    });
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductData(res?.products);
    });
    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setAllFeaturedProductData(res?.products);
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`,
    ).then((res) => {
      if (res?.error === false) {
        setPopularProduct(res?.products);
      }
    });
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setPopularProduct([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProduct(res?.products);
      }
    });
  };

  return (
    <>
      {homeSlidesData?.length !== 0 && <HomeSlider data={homeSlidesData} />}

      

      {context?.catData?.length !== 0 && (
        <HomeCatSlider data={context?.catData} />
      )}

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[20px] font-[600]">Popular Products</h2>
              <p className="text-[14px] font-[400] mt-0 mb-0">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((cat, index) => {
                    return (
                      <Tab
                        label={cat?.name}
                        onClick={() => filterByCatId(cat?._id)}
                      />
                    );
                  })}
              </Tabs>
            </div>
          </div>

          {popularProduct?.length === 0 && <ProductLoading />}

          {popularProduct?.length !== 0 && (
            <ProductSlider items={6} data={popularProduct} />
          )}
        </div>
      </section>

      <section className="py-6">
        <div className="container flex gap-5">
          <div className="part1 w-[70%]">
            {
              allProductData?.length !== 0 && <HomeBannerV2 data={allProductData} />
            }
            
          </div>

          <div className="part2 w-[30%] flex items-center gap-5 justify-between flex-col">
            <BannerBoxV2 info="left" image={"/sub-banner-1.jpg"} />
            <BannerBoxV2 info="lerightft" image={"/sub-banner-2.jpg"} />
          </div>
        </div>
      </section>

      <section className="py-4 pt-2 bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] m-auto py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7">
            <div className="col1 flex items-center gap-4">
              <FaShippingFast className="text-[50px]" />
              <span className="text-[20px] font-[600] uppercase">
                Free Shipping
              </span>
            </div>

            <div className="col2 ">
              <p className="mb-0 font-[500]">
                Free Delivery Now On Your First Order and over $200
              </p>
            </div>

            <p className="font-bold text-[25px]">- Only $200*</p>
          </div>

          <AdsBannerSliderV2 items={4} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Latest Products</h2>

          {allProductData?.length === 0 && <ProductLoading />}

          {allProductData?.length !== 0 && (
            <ProductSlider items={6} data={allProductData} />
          )}

          <AdsBannerSlider items={4} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Feature Products</h2>

          {allFeaturedProductData?.length === 0 && <ProductLoading />}

          {allFeaturedProductData?.length !== 0 && (
            <ProductSlider items={6} data={allFeaturedProductData} />
          )}

          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className="py-5 pb-8 pt-0 bg-white blogSection">
        <div className="container">
          <h2 className="text-[20px] font-[600] mb-4">From The Blog</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="blogSlider"
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;
