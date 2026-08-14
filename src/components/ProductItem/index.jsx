import React, { useContext, useEffect, useState } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaRegHeart, FaMinus, FaPlus } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap, MdOutlineShoppingCart } from "react-icons/md";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../utils/api";

const ProductItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowActiveTab, setIsShowActiveTab] = useState(false);
  const [selectedTabName, setSelectedTabName] = useState(null);

  const context = useContext(MyContext);

  const addToCart = (product, userId, quantity) => {
    const productItem = {
      _id: product?._id,
      productTitle: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      quantity,
      subTotal: parseInt(product?.price * quantity),
      countInStock: product?.countInStock,
     
      productId: product?._id,
      brand: product?.brand,
      size: selectedTabName,
      ram: selectedTabName,
      weight: selectedTabName,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
    };
    if (props?.item?.size?.length !== 0) {
      setIsShowActiveTab(true);
    } else {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowActiveTab(false);
    }
    if (activeTab !== null) {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowActiveTab(false);
    }
  };

  useEffect(() => {
    const item = context?.cartData?.filter((cartItem) =>
      cartItem.productId.includes(props?.item?._id),
    );

    if (item.length !== 0) {
      setCartItem(item);
      setIsAdded(true);
      setQuantity(item[0]?.quantity);
    } else {
      setQuantity(1);
    }
  }, [context?.cartData]);

  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1) {
      deleteData(`/api/cart/delete-cart-item/${cartItem[0]._id}`).then(
        (res) => {
          setIsAdded(false);
          context?.openAlertBox("success", res?.message);
          context?.getCartItems();
        },
      );
    } else {
      const obj = {
        _id: cartItem[0]._id,
        qty: quantity - 1,
        subTotal: cartItem[0].price * (quantity - 1),
      };
      editData("/api/cart/update-cart-item", obj).then((res) => {
        context?.getCartItems();
        context?.openAlertBox("success", res?.data?.message);
      });
    }
  };

  const addQty = () => {
    setQuantity(quantity + 1);
    const obj = {
      _id: cartItem[0]._id,
      qty: quantity + 1,
      subTotal: cartItem[0].price * (quantity + 1),
    };
    editData("/api/cart/update-cart-item", obj).then((res) => {
      context?.getCartItems();
      context?.openAlertBox("success", res?.data?.message);
    });
  };

  const handleClickActiveTab = (index, name) => {
    setActiveTab(index);
    setSelectedTabName(name);
  };

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className="group imgWrapper w-[100%] h-[250px] rounded-md overflow-hidden relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img h-[300px] overflow-hidden">
            <img src={props?.item?.images[0]} className="w-full" />
            <img
              src={props?.item?.images[1]}
              className="w-full transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 
              group-hover:scale-100"
            />
          </div>
        </Link>

        {isShowActiveTab === true && (
          <div
            className="flex items-center justify-center absolute top-0 left-0 w-full h-full
        bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2"
          >
            {props?.item?.size?.length !== 0 &&
              props?.item?.size?.map((size, index) => {
                return (
                  <span
                    key={index}
                    className={`flex items-center justify-center p-1 px-2 bg-[rgba(255,255,255,0.8)] max-w-[35px]
                  h-[25px] rounded-sm cursor-pointer hover:bg-white 
                  ${activeTab === index && "!bg-primary text-white"}`}
                    onClick={() => handleClickActiveTab(index, size)}
                  >
                    {size}
                  </span>
                );
              })}
          </div>
        )}

        <span
          className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white 
        rounded-lg p-1 text-[12px] font-[500]"
        >
          {props?.item?.discount}%
        </span>

        <div
          className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-4 flex-col w-[50px] 
        transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100"
        >
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary 
            hover:text-white group"
            onClick={() =>
              context.handleOpenProductDetailsModel(true, props?.item)
            }
          >
            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:text-white" />
          </Button>

          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary 
          hover:text-white group"
          >
            <IoIosGitCompare className="text-[18px] !text-black group-hover:text-white" />
          </Button>

          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary 
          hover:text-white group"
          >
            <FaRegHeart className="text-[18px] !text-black group-hover:text-white" />
          </Button>
        </div>
      </div>

      <div className="info p-3 py-5 relative pb-[50px] h-[190px]">
        <h6 className="text-[13px] !font-[400]">
          <span className="link transition-all">{props?.item?.brand}</span>
        </h6>
        <h3 className="text-[14px] title mt-1 font-[500] mb-1 text-[#000]">
          <Link
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.name?.substr(0, 30) + "..."}
          </Link>
        </h3>

        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            &#x20b9; {props?.item?.oldPrice}
          </span>
          <span className="price text-primary text-[15px] font-[600]">
            &#x20b9; {props?.item?.price}
          </span>
        </div>

        <div className="!absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
          {isAdded === false ? (
            <Button
              className="btn-org btn-border flex w-full btn-sm gap-2"
              size="small"
              onClick={() =>
                addToCart(props?.item, context?.userData?._id, quantity)
              }
            >
              <MdOutlineShoppingCart className="text-[18px]" />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between overflow-hidden rounded-full border border-gray-300 bg-white w-full">
              <Button
                className="!min-w-[35px] !w-[35px] !h-[30px] !bg-[#f1f1f1] !rounded-none"
                onClick={minusQty}
              >
                <FaMinus className="text-[rgba(0,0,0,0.7)]" />
              </Button>
              <span className="px-2 sm:px-4 font-semibold text-xs sm:text-base">
                {quantity}
              </span>
              <Button
                className="!min-w-[35px] !w-[35px] !h-[30px] !bg-primary !rounded-none"
                onClick={addQty}
              >
                <FaPlus className="text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
