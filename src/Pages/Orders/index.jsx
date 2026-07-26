import React, { useState } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

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
                There are <span className="font-bold text-primary">2</span>{" "}
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
                    <tr class="bg-neutral-primary border-b border-default">
                      <td class="px-6 py-4">
                        <Button
                          className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                          onClick={() => isShowOrderedProduct(0)}
                        >
                          {isOpenOrderedProduct === 0 ? (
                            <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          ) : (
                            <FaAngleUp  className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          )}
                        </Button>
                      </td>
                      <td class="px-6 py-4">
                        <span className="text-primary">sc24evdfbfvwvb</span>
                      </td>
                      <td class="px-6 py-4">
                        <span className="text-primary">fefeewgew</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">Sumant Kumar</td>
                      <td class="px-6 py-4">7037366838</td>
                      <td class="px-6 py-4">
                        <span className="block w-[300px]">
                          Shyam vatika colony, Surajpur Greater noida
                        </span>
                      </td>
                      <td class="px-6 py-4">201306</td>
                      <td class="px-6 py-4">15000</td>
                      <td class="px-6 py-4">sumant@gmail.com</td>
                      <td class="px-6 py-4">
                        <span className="text-primary">dskjvbdhjvbevhbej</span>
                      </td>
                      <td class="px-6 py-4">
                        <Badge status="delivered" />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">2026-27-07</td>
                    </tr>

                    {isOpenOrderedProduct === 0 && (
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
                                <tr class="bg-neutral-primary border-b border-default">
                                  <td class="px-6 py-4">
                                    <span className="text-gray-600">
                                      sc24evdfbfvwvb
                                    </span>
                                  </td>
                                  <td class="px-6 py-4">
                                    A-Line Kurti with Sharara & Du...
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <img
                                      src="/A-line Kurti.jpg"
                                      className="w-[40px] h-[40px] object-cover rounded-md"
                                    />
                                  </td>
                                  <td class="px-6 py-4">2</td>
                                  <td class="px-6 py-4">1200</td>
                                  <td class="px-6 py-4">1300</td>
                                </tr>

                                <tr class="bg-neutral-primary border-b border-default">
                                  <td class="px-6 py-4">
                                    <span className="text-gray-600">
                                      sc24evdfbfvwvb
                                    </span>
                                  </td>
                                  <td class="px-6 py-4">
                                    A-Line Kurti with Sharara & Du...
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <img
                                      src="/A-line Kurti.jpg"
                                      className="w-[40px] h-[40px] object-cover rounded-md"
                                    />
                                  </td>
                                  <td class="px-6 py-4">2</td>
                                  <td class="px-6 py-4">1200</td>
                                  <td class="px-6 py-4">1300</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                    
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
