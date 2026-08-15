import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

export default function CartItems(props) {
  const [selectedValue, setSelectedValue] = useState(
    props?.item?.size || props?.item?.ram || props?.item?.weight || "",
  );
  const [sizeanchorEl, setSizeAnchorEl] = useState(null);
  const opensize = Boolean(sizeanchorEl);

  const [selectedQty, setSelectedQty] = useState(props?.item?.quantity || 1);
  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const openQty = Boolean(qtyanchorEl);

  const [productOptions, setProductOptions] = useState([]);
  const [optionType, setOptionType] = useState("");

  const context = useContext(MyContext);

  // Fetch the product details to get size/ram/weight options
  useEffect(() => {
    if (props?.item?.productId) {
      fetchDataFromApi(`/api/product/${props.item.productId}`).then((res) => {
        if (res?.error === false) {
          const product = res?.product;

          // Determine which type of options exist and set accordingly with proper heading
          if (product?.size && product?.size.length > 0) {
            setProductOptions(product.size);
            setOptionType("Size");
          } else if (product?.productRam && product?.productRam.length > 0) {
            setProductOptions(product.productRam);
            setOptionType("RAM");
          } else if (
            product?.productWeight &&
            product?.productWeight.length > 0
          ) {
            setProductOptions(product.productWeight);
            setOptionType("Weight");
          } else {
            setProductOptions([]);
            setOptionType("");
          }
        }
      });
    }
  }, [props?.item?.productId]);

  // Update cart item in backend
  const updateCartItem = async (itemId, updates) => {
    try {
      editData(`/api/cart/update-cart-item`, {
        _id: itemId,
        ...updates,
      }).then(() => {
        context?.openAlertBox("success", "Cart updated successfully");
        context?.getCartItems();
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };

  const handleCloseSize = (Value) => {
    setSizeAnchorEl(null);
    if (Value !== null && Value !== selectedValue) {
      setSelectedValue(Value);

      // Determine which field to update based on optionType
      const updateField =
        optionType === "Size"
          ? { size: Value }
          : optionType === "RAM"
            ? { ram: Value }
            : optionType === "Weight"
              ? { weight: Value }
              : {};

      // Update backend
      updateCartItem(props?.item?._id, updateField);
    }
  };

  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };

  const handleCloseQty = (Value) => {
    setQtyAnchorEl(null);
    if (Value !== null && Value !== selectedQty) {
      setSelectedQty(Value);

      // Calculate new subTotal
      const newSubTotal = props?.item?.price * Value;

      // Update backend
      updateCartItem(props?.item?._id, {
        qty: Value,
        subTotal: newSubTotal,
      });
    }
  };

  const removeItem = (itemId) => {
    deleteData(`/api/cart/delete-cart-item/${itemId}`).then(() => {
      context?.openAlertBox("success", "Item removed from cart");
      context?.getCartItems();
    });
  };

  return (
    <div className="cartItems w-[100%] flex items-center gap-2 border-[1px] border-[rgba(0,0,0,0.1)] rounded-md p-3">
      <div className="imgWrapper w-[100px] flex items-center justify-center rounded-md overflow-hidden flex-[0_0_100px]">
        <Link to={`/product/${props?.item?._id}`}>
          <img src={props?.item?.image} className="w-full" />
        </Link>
      </div>
      <div className="info flex-1">
        <h5 className="text-[14px] font-[500] mb-2">
          {props?.item?.productTitle?.substr(0, 40) + "..."}
        </h5>
        <Rating
          className="mb-2"
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />
        <div className="flex items-center gap-2">
          {productOptions && productOptions.length > 0 && (
            <div>
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleClickSize}
              >
                <span className="text-[12px] font-[600]">{optionType}: </span>
                <span className="bg-[#f1f1f1] p-1 rounded-md text-[13px] font-[600] flex items-center gap-1">
                  {selectedValue || "Select"} <GoTriangleDown />
                </span>
              </span>
              <Menu
                className="dropDown"
                anchorEl={sizeanchorEl}
                open={opensize}
                onClose={() => handleCloseSize(null)}
              >
                {productOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    className={
                      option === selectedValue
                        ? "!bg-blue-500 !text-white"
                        : "!bg-white !text-black"
                    }
                    onClick={() => handleCloseSize(option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <span
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleClickQty}
            >
              <span className="text-[12px] font-[600]">Qty: </span>
              <span className="bg-[#f1f1f1] p-1 rounded-md text-[13px] font-[600] flex items-center gap-1">
                {selectedQty} <GoTriangleDown />
              </span>
            </span>
            <Menu
              className="dropDown"
              anchorEl={qtyanchorEl}
              open={openQty}
              onClose={() => handleCloseQty(null)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                <MenuItem
                  key={qty}
                  className={
                    qty === selectedQty
                      ? "!bg-blue-500 !text-white"
                      : "!bg-white !text-black"
                  }
                  onClick={() => handleCloseQty(qty)}
                >
                  {qty}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="oldPrice font-[600] text-[14px] text-gray-500 line-through">
            &#x20b9; {props?.item?.oldPrice}
          </span>
          <span className="newPrice text-[14px] font-[600]">
            &#x20b9; {props?.item?.price}
          </span>
          <span className="newPrice text-[14px] text-primary font-[600]">
            {props?.item?.discount}% OFF
          </span>
        </div>
      </div>
      <button
        className="removeBtn cursor-pointer w-auto h-auto rounded-full bg-[rgba(0,0,0,0.05)] p-2 primary"
        onClick={() => removeItem(props?.item?._id)}
      >
        <MdDelete className="text-[22px] font-500 cursor-pointer" />
      </button>
    </div>
  );
}
