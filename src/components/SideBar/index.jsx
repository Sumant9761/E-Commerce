import React, { useContext, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../SideBar/style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import * as RangeSliderModule from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";

const RangeSlider = RangeSliderModule.default.default;

const Sidebar = (props) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);

  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 25,
  });

  const [price, setPrice] = useState([0, 60000]);

  const context = useContext(MyContext);
  const location = useLocation();

  const handleCheckboxChange = (field, value) => {
    const currentValues = filters[field] || [];
    const updatedValues = currentValues?.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues,
    }));

    if (field === "catId") {
      setFilters((prev) => ({
        ...prev,
        subCatId: [],
        thirdsubCatId: [],
      }));
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);

    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
    }
    if (url.includes("subCatId")) {
      const subcategoryId = queryParameters.get("subCatId");
      const subcatArr = [];
      subcatArr.push(subcategoryId);
      filters.subCatId = subcatArr;
      filters.catId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
    }
    if (url.includes("thirdsubCatId")) {
      const thirdsubcategoryId = queryParameters.get("thirdsubCatId");
      const thirdsubcatArr = [];
      thirdsubcatArr.push(thirdsubcategoryId);
      filters.thirdsubCatId = thirdsubcatArr;
      filters.catId = [];
      filters.subCatId = [];
      filters.rating = [];
    }

    filters.page = 1;
    setTimeout(() => {
      filtersData();
    }, 200);
  }, [location]);

  const filtersData = () => {
    props?.setIsLoading(true);

    postData(`/api/product/filters`, filters).then((res) => {
      props.setProductData(res);
      props?.setIsLoading(false);
      props.setTotalPages(res.totalPages);
      window.scrollTo(0, 0);
    });
  };

  useEffect(() => {
    filters.page = props.page;
    filtersData();
  }, [filters, props.page]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);

  return (
    <aside className="sidebar py-5 sticky top-[130px] z-[50]">
      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Shop By Category
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            {context?.catData?.length !== 0 &&
              context?.catData?.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={item?._id}
                    control={<Checkbox />}
                    checked={filters?.catId?.includes(item?._id)}
                    label={item?.name}
                    onChange={() => handleCheckboxChange("catId", item?._id)}
                    className="w-full"
                  />
                );
              })}
          </div>
        </Collapse>
      </div>

      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Filter By Price
        </h3>

        <RangeSlider
          min={100}
          max={60000}
          step={5}
          value={price}
          onInput={setPrice}
        />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From: <strong className="text-dark">Rs: {price[0]}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            From: <strong className="text-dark">Rs: {price[1]}</strong>
          </span>
        </div>
      </div>

      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Filter By Rating
        </h3>

        <div className="flex items-center">
          <FormControlLabel
            value={5}
            control={<Checkbox />}
            checked={filters?.rating?.includes(5)}
            onChange={() => handleCheckboxChange("rating", 5)}
          />

          <Rating size="small" name="rating" value={5} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={4}
            control={<Checkbox />}
            checked={filters?.rating?.includes(4)}
            onChange={() => handleCheckboxChange("rating", 4)}
          />

          <Rating size="small" name="rating" value={4} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={3}
            control={<Checkbox />}
            checked={filters?.rating?.includes(3)}
            onChange={() => handleCheckboxChange("rating", 3)}
          />

          <Rating size="small" name="rating" value={3} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={2}
            control={<Checkbox />}
            checked={filters?.rating?.includes(2)}
            onChange={() => handleCheckboxChange("rating", 2)}
          />

          <Rating size="small" name="rating" value={2} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={1}
            control={<Checkbox />}
            checked={filters?.rating?.includes(1)}
            onChange={() => handleCheckboxChange("rating", 1)}
          />

          <Rating size="small" name="rating" value={1} readOnly />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
