import React, { useState } from "react";
import { Button } from "@mui/material";
import QtyBox from "../QtyBox";
import Rating from "@mui/material/Rating";
import { GrCart } from "react-icons/gr";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

const ProductDetailsComponent = (props) => {
  const [productActionIndex, setProductActionIndex] = useState(null);

  return (
    <>
      <h1 className="text-[24px] font-[600] mb-2">{props?.item?.name}</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-[13px]">
          Brands :{" "}
          <span className="font-[500] text-black opacity-75">
            {props?.item?.brand}
          </span>{" "}
        </span>

        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />
        <span className="text-[13px] cursor-pointer">Review (5)</span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
          &#x20b9; {props?.item?.oldPrice}
        </span>
        <span className="price text-primary text-[20px] font-[600]">
          &#x20b9; {props?.item?.price}
        </span>

        <span className="text-[14px]">
          Available In Stock:{" "}
          <span className="text-green-600 text-[14px] font-bold">
            {props?.item?.countInStock} Items
          </span>
        </span>
      </div>

      <p className="mt-3 pr-10 mb-5">{props?.item?.description}</p>

      {props?.item?.productRam?.length !== 0 && (
        <div className="flex items-center gap-3">
          <span className="text-[16px]">RAM:</span>
          <div className="flex items-center gap-1 actions">
            {props?.item?.productRam?.map((item, index) => {
              return (
                <Button
                  className={`${productActionIndex === index ? "!bg-primary !text-white" : ""}`}
                  onClick={() => setProductActionIndex(index)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {props?.item?.size?.length !== 0 && (
        <div className="flex items-center gap-3">
          <span className="text-[16px]">SIZE:</span>
          <div className="flex items-center gap-1 actions">
            {props?.item?.size?.map((item, index) => {
              return (
                <Button
                  className={`${productActionIndex === index ? "!bg-primary !text-white" : ""}`}
                  onClick={() => setProductActionIndex(index)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {props?.item?.productWeight?.length !== 0 && (
        <div className="flex items-center gap-3">
          <span className="text-[16px]">WEIGHT:</span>
          <div className="flex items-center gap-1 actions">
            {props?.item?.productWeight?.map((item, index) => {
              return (
                <Button
                  className={`${productActionIndex === index ? "!bg-primary !text-white" : ""}`}
                  onClick={() => setProductActionIndex(index)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[14px] mt-5 mb-2 text-[#000]">
        Free Shipping (Est. Delivery Time 2-3 Days)
      </p>
      <div className="flex items-center gap-4 py-4">
        <div className="qtyBoxWrapper w-[70px]">
          <QtyBox />
        </div>

        <Button className="btn-org gap-2">
          <GrCart className="text-[22px]" /> Add to cart
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
          <FaRegHeart className="text-[18px]" />
          Add to Wishlist
        </span>

        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
          <IoIosGitCompare className="text-[18px]" />
          Add to Compare
        </span>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
