import React, { useEffect, useState } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";
import { fetchDataFromApi } from "../../utils/api";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [orders, setOrders] = useState([]);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, []);

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>

        <div className="col2 w-[80%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My Orders</h2>
              <p className="mt-0">
                There are{" "}
                <span className="font-bold text-primary">{orders?.length}</span>{" "}
                orders
              </p>

              <div class="relative overflow-x-auto mt-5 bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table class="w-full text-sm text-left rtl:text-right text-body">
                  <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        &nbsp;
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Order Id
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Payment Id
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Pincode
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Total amount
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        User Id
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Order Status
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 font-medium whitespace-nowrap"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.length !== 0 &&
                      orders?.map((order, index) => {
                        return (
                          <>
                            <tr class="bg-neutral-primary border-b border-default">
                              <td class="px-6 py-4">
                                <Button
                                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                  onClick={() => isShowOrderedProduct(index)}
                                >
                                  {isOpenOrderedProduct === index ? (
                                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                  ) : (
                                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                  )}
                                </Button>
                              </td>
                              <td class="px-6 py-4">
                                <span className="text-primary">
                                  {order?._id}
                                </span>
                              </td>
                              <td class="px-6 py-4">
                                <span className="text-primary">
                                  {order?.paymentId
                                    ? order?.paymentId
                                    : "CASH ON DELIVERY"}
                                </span>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                {order?.userId?.name}
                              </td>
                              <td class="px-6 py-4">
                                +{order?.userId?.mobile}
                              </td>
                              <td class="px-6 py-4">
                                <span className="block w-[300px]">
                                  {order?.delivery_address?.address_line1 +
                                    " " +
                                    order?.delivery_address?.city +
                                    "," +
                                    order?.delivery_address?.landmark +
                                    "," +
                                    order?.delivery_address?.state +
                                    " , " +
                                    order?.delivery_address?.country}
                                </span>
                              </td>
                              <td class="px-6 py-4">
                                {order?.delivery_address?.pincode}
                              </td>
                              <td class="px-6 py-4">{order?.totalAmt}</td>
                              <td class="px-6 py-4">{order?.userId?.email}</td>
                              <td class="px-6 py-4">
                                <span className="text-primary">
                                  {order?.userId?._id}
                                </span>
                              </td>
                              <td class="px-6 py-4">
                                <Badge status={order?.order_status} />
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                {order?.createdAt?.split("T")[0]}
                              </td>
                            </tr>

                            {isOpenOrderedProduct === index && (
                              <tr>
                                <td className="pl-20" colSpan="6">
                                  <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                                    <table class="w-full text-sm text-left rtl:text-right text-body">
                                      <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                                        <tr>
                                          <th
                                            scope="col"
                                            class="px-6 py-3 font-medium whitespace-nowrap"
                                          >
                                            Product Id
                                          </th>
                                          <th
                                            scope="col"
                                            class="px-6 py-3 font-medium whitespace-nowrap"
                                          >
                                            Product Title
                                          </th>
                                          <th
                                            scope="col"
                                            class="px-6 py-3 font-medium whitespace-nowrap"
                                          >
                                            Image
                                          </th>
                                          <th
                                            scope="col"
                                            class="px-6 py-3 font-medium whitespace-nowrap"
                                          >
                                            Quantity
                                          </th>
                                          <th
                                            scope="col"
                                            class="px-6 py-3 font-medium whitespace-nowrap"
                                          >
                                            Price
                                          </th>
                                          <th
                                            scope="col"
                                            class="px-6 py-3 font-medium whitespace-nowrap"
                                          >
                                            SubTotal
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order?.products?.map((item, index) => {
                                          return (
                                            <tr class="bg-neutral-primary border-b border-default">
                                              <td class="px-6 py-4">
                                                <span className="text-gray-600">
                                                  {item?._id}
                                                </span>
                                              </td>
                                              <td class="px-6 py-4">
                                                <div className="w-[200px]">
                                                  {item?.productTitle}
                                                </div>
                                              </td>
                                              <td class="px-6 py-4 whitespace-nowrap">
                                                <img
                                                  src={item?.image}
                                                  className="w-[60px] h-[80px] object-cover rounded-md"
                                                />
                                              </td>
                                              <td class="px-6 py-4">
                                                {item?.quantity}
                                              </td>
                                              <td class="px-6 py-4">
                                                {item?.price?.toLocaleString(
                                                  "en-US",
                                                  {
                                                    style: "currency",
                                                    currency: "INR",
                                                  },
                                                )}
                                              </td>
                                              <td class="px-6 py-4">
                                                {item?.subTotal?.toLocaleString(
                                                  "en-US",
                                                  {
                                                    style: "currency",
                                                    currency: "INR",
                                                  },
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
