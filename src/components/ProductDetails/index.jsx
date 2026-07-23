import React, { useState } from "react";
import { Button } from "@mui/material";
import QtyBox from "../QtyBox";
import Rating from "@mui/material/Rating";
import { GrCart } from "react-icons/gr";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

const ProductDetailsComponent = () => {
    const [productActionIndex, setProductActionIndex] = useState(null);

  return (
    <>
      <h1 className="text-[24px] font-[600] mb-2">
        Nermosa Women Red Printed Viscose Rayon Kurta Pant And Dupatta Set|
        Kurta Set Women
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-[13px]">
          Brands :{" "}
          <span className="font-[500] text-black opacity-75">Nermosa</span>{" "}
        </span>

        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <span className="text-[13px] cursor-pointer">Review (5)</span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
          $58.00
        </span>
        <span className="price text-primary text-[20px] font-[600]">
          $58.00
        </span>

        <span className="text-[14px]">
          Available In Stock:{" "}
          <span className="text-green-600 text-[14px] font-bold">
            147 Items
          </span>
        </span>
      </div>

      <p className="mt-3 pr-10 mb-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since 1966, when designers at Letraset and James Mosley, the librarian
        at St Bride Printing Library in London, took a 1914 Cicero translation
        and scrambled it to make dummy text for Letraset's Body Type sheets.
      </p>

      <div className="flex items-center gap-3">
        <span className="text-[16px]">Size:</span>
        <div className="flex items-center gap-1 actions">
          <Button
            className={`${productActionIndex === 0 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setProductActionIndex(0)}
          >
            S
          </Button>
          <Button
            className={`${productActionIndex === 1 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setProductActionIndex(1)}
          >
            M
          </Button>
          <Button
            className={`${productActionIndex === 2 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setProductActionIndex(2)}
          >
            L
          </Button>
          <Button
            className={`${productActionIndex === 3 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setProductActionIndex(3)}
          >
            XL
          </Button>
        </div>
      </div>

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
