import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import QtyBox from "../QtyBox";
import Rating from "@mui/material/Rating";
import { GrCart } from "react-icons/gr";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { TiTickOutline } from "react-icons/ti";

const ProductDetailsComponent = (props) => {
  const [productActionIndex, setProductActionIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTabName, setSelectedTabName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabError, setTabError] = useState(false);
  const [viewbutton, setViewbutton] = useState(false);

  const context = useContext(MyContext);

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };

  const handleClickActiveTab = (index, item) => {
    setProductActionIndex(index);
    setSelectedTabName(item);
  };

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      openAlertBox("error", "You are not login so please login first");
      return false;
    }

    const productItem = {
      _id: product?._id,
      productTitle: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      countInStock: product?.countInStock,
      productId: product?._id,
      brand: product?.brand,
      size: props?.item?.size?.length !== 0 ? selectedTabName : "",
      ram: props?.item?.productRam?.length !== 0 ? selectedTabName : "",
      weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : "",
      oldPrice: product?.oldPrice,
      discount: product?.discount,
    };

    if (selectedTabName !== null) {
      setIsLoading(true);
      postData("/api/cart/add", productItem).then((res) => {
        if (res?.error === false) {
          context?.openAlertBox("success", res?.message);
          context?.getCartItems();
          setViewbutton(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        } else {
          context?.openAlertBox("error", res?.message);
          setIsLoading(false);
          if (res?.message === "Item already in cart") {
            setViewbutton(true);
          }
        }
      });
    } else {
      setTabError(true);
    }
  };

  useEffect(() => {
    if (context?.cartData && context?.cartData.length > 0 && props?.item?._id) {
      const itemInCart = context.cartData.find(
        (cartItem) => cartItem.productId === props?.item?._id,
      );
      if (itemInCart) {
        setViewbutton(true);
      } else {
        setViewbutton(false);
      }
    }
  }, [context?.cartData, props?.item?._id]);

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
        <span
          className="text-[13px] cursor-pointer"
          onClick={props?.gotoReviews}
        >
          Review ({props?.reviewsCount})
        </span>
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
                  className={`${productActionIndex === index ? "!bg-primary !text-white" : ""} ${
                    tabError === true && "error"
                  }`}
                  onClick={() => handleClickActiveTab(index, item)}
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
                  className={`${productActionIndex === index ? "!bg-primary !text-white" : ""} ${
                    tabError === true && "error"
                  }`}
                  onClick={() => handleClickActiveTab(index, item)}
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
                  className={`${productActionIndex === index ? "!bg-primary !text-white" : ""} ${
                    tabError === true && "error"
                  }`}
                  onClick={() => handleClickActiveTab(index, item)}
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
          <QtyBox handleSelectQty={handleSelectQty} />
        </div>

        {viewbutton === true ? (
          <Button
            className="btn primary flex gap-2 ml-4 !bg-green-500"
            disabled
          >
            <TiTickOutline className="text-[22px]" />
            Added
          </Button>
        ) : (
          <Button
            className="btn-org gap-2"
            onClick={() =>
              addToCart(props?.item, context?.userData?._id, quantity)
            }
          >
            {isLoading === true ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <GrCart className="text-[22px]" /> Add to cart
              </>
            )}
          </Button>
        )}
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
