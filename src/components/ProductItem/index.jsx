import React from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaRegHeart } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";

const ProductItem = () => {
  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className="group imgWrapper w-[100%] h-[250px] rounded-md overflow-hidden relative">
        <Link to="/">
          <div className="img h-[300px] overflow-hidden">
            <img src="RedKurti1.jpg" className="w-full" />
            <img
              src="RedKurti2.jpg"
              className="w-full transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-100"
            />
          </div>
        </Link>

        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
          10%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-4 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group">
            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:text-white" />
          </Button>

          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group">
            <IoIosGitCompare className="text-[18px] !text-black group-hover:text-white" />
          </Button>

          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group">
            <FaRegHeart className="text-[18px] !text-black group-hover:text-white" />
          </Button>
        </div>
      </div>

      <div className="info p-3 py-5">
        <h6 className="text-[13px]">
          <Link to="/" className="link transition-all">
            Soylent Green
          </Link>
        </h6>
        <h3 className="text-[14px] title mt-1 font-[500] mb-1 text-[#000]">
          <Link to="/" className="link transition-all">
            Nermosa Women Red Printed Viscose Rayon Kurta Pant And Dupatta Set
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            $58.00
          </span>
          <span className="price text-primary text-[15px] font-[600]">
            $58.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
