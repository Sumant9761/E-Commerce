import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MyContext } from "../../App";
import { FaPlus } from "react-icons/fa6";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import { deleteData, postData } from "../../utils/api";

const VITE_API_RAZORPAY_KEY_ID = import.meta.env.VITE_API_RAZORPAY_KEY_ID;
const VITE_API_RAZORPAY_KEY_SECRET = import.meta.env
  .VITE_API_RAZORPAY_KEY_SECRET;

const Checkout = () => {
  const [userData, setUserData] = useState(null);
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();

  const context = useContext(MyContext);
  const history = useNavigate();
  window.scrollTo(0, 0);

  useEffect(() => {
    setUserData(context?.userData);
    setSelectedAddress(context?.userData?.address_details[0]?._id);
  }, [context?.userData, userData]);

  useEffect(() => {
    setTotalAmount(
      context?.cartData?.length !== 0
        ? context.cartData
            ?.map((item) => parseInt(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
        : 0,
    )?.toLocaleString("en-US", { style: "currency", currency: "INR" });
  }, [context?.cartData]);

  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  const handleChange = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
      setSelectedAddress(e.target.value);
    }
  };

  const checkout = (e) => {
    e.preventDefault();

    if (userData?.address_details?.length !== 0) {
      var options = {
        key: VITE_API_RAZORPAY_KEY_ID,
        key_secret: VITE_API_RAZORPAY_KEY_SECRET,
        amount: parseInt(totalAmount * 100),
        currency: "INR",
        order_receipt: "order_rcptid_" + context?.userData?.name,
        name: "E-commerce Sumant_Kumar.pvt.limited",
        description: "For testing purpose",
        handler: function (response) {
          console.log(response);

          const paymentId = response.razorpay_payment_id;

          const user = context?.userData;

          const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: paymentId,
            payment_status: "COMPLETED",
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          };

          postData(`/api/order/create`, payLoad).then((res) => {
            context.openAlertBox("success", res?.message);
            if (res?.error === false) {
              deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
                context?.getCartItems();
              });
              history("/order/success");
            } else {
              history("/order/failed");
              context.openAlertBox("error", res?.message);
            }
          });
        },
        theme: {
          color: "#ff5252",
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
    } else {
      context?.openAlertBox("error", "Please add address");
    }
  };

  const cashOnDelivery = () => {
    const user = context?.userData;

    if (user?.address_details?.length !== 0) {
      const payLoad = {
        userId: user?._id,
        products: context?.cartData,
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: selectedAddress,
        totalAmt: totalAmount,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      postData(`/api/order/create`, payLoad).then((res) => {
        context.openAlertBox("success", res?.message);
        if (res?.error === false) {
          deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
            context?.getCartItems();
          });
          history("/order/success");
        } else {
          context.openAlertBox("error", res?.message);
          history("/order/failed");
        }
      });
    } else {
      context.openAlertBox("error", "Please add address");
    }
  };

  return (
    <section className="py-10">
      <form onSubmit={checkout}>
        <div className="w-[70%] m-auto flex gap-5">
          <div className="leftCol w-[60%]">
            <div className="card bg-white shadow-md p-5 rounded-md w-full">
              <div className="flex items-center justify-between">
                <h2>Selected Delivery Address</h2>
                <Button
                  variant="outlined"
                  onClick={() => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }}
                >
                  <FaPlus />
                  ADD NEW ADDRESS
                </Button>
              </div>

              <br />

              <div className="flex flex-col gap-4">
                {userData?.address_details?.length !== 0 ? (
                  userData?.address_details?.map((address, index) => {
                    return (
                      <label
                        className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.2)] rounded-md 
                      relative ${isChecked === index && "bg-[#fff2f2]"}`}
                        key={index}
                      >
                        <div>
                          <Radio
                            size="small"
                            onChange={(e) => handleChange(e, index)}
                            checked={isChecked === index}
                            value={address?._id}
                          />
                        </div>
                        <div className="info">
                          <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md]">
                            {address?.addressType}
                          </span>
                          <h3>{userData?.name}</h3>
                          <p className="mt-0 mb-0">
                            {address?.address_line1 +
                              " " +
                              address?.city +
                              " " +
                              address?.state +
                              " " +
                              address?.country +
                              " " +
                              address?.landmark}
                          </p>
                          <p className="mb-0 font-[500]">+{address?.mobile}</p>
                        </div>

                        <div>
                          <Button
                            variant="text"
                            className="!absolute top-[15px] right-[15px]"
                            size="small"
                            onClick={() => editAddress(address?._id)}
                          >
                            EDIT
                          </Button>
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <>
                    <div className="flex items-center mt-5 justify-between flex-col gap-1 p-5">
                      <img
                        src="/web-address.png"
                        className="w-[100px] h-[100px]"
                      />
                      <h2 className="text-center">
                        No Addresses found in your account!
                      </h2>
                      <p className="mt-0">Add a delivery address.</p>
                      <Button className="btn-org">ADD ADDRESS</Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="rightCol w-[40%]">
            <div className="card shadow-md bg-white p-5 rounded-md">
              <h2 className="mb-4">Your Order</h2>

              <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[14px] font-[600]">Product</span>
                <span className="text-[14px] font-[600]">Subtotal</span>
              </div>

              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 mb-5">
                {context?.cartData?.length !== 0 &&
                  context?.cartData?.map((item, index) => {
                    return (
                      <div
                        className="flex items-center justify-between py-2"
                        key={index}
                      >
                        <div className="part1 flex items-center gap-3">
                          <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                            <img
                              src={item?.image}
                              className="w-full transition-all group-hover:scale-105"
                            />
                          </div>

                          <div className="info">
                            <h4
                              className="text-[14px]"
                              title={item?.productTitle}
                            >
                              {item?.productTitle?.substr(0, 30) + "..."}
                            </h4>
                            <span className="text-[13px]">
                              Qty : {item?.quantity}
                            </span>
                          </div>
                        </div>

                        <span className="text-[14px] font-[500]">
                          {(item?.quantity * item?.price).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "INR",
                            },
                          )}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="flex items-center flex-col gap-3 mb-2">
                <Button
                  type="submit"
                  className="w-full btn-org btn-lg flex items-center gap-2"
                >
                  <BsFillBagCheckFill className="text-[20px]" />
                  Checkout
                </Button>

                <Button
                  type="button"
                  className="btn-lg btn-dark w-full flex items-center gap-2"
                  onClick={cashOnDelivery}
                >
                  <BsFillBagCheckFill className="text-[20px]" />
                  Cash On Delivery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
