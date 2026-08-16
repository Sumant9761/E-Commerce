import React from "react";
import { useState, useEffect, useContext } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import { MyContext } from "../../App";

import { deleteData, fetchDataFromApi } from "../../utils/api";
import AddressBox from "./addressBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Address = () => {
  const context = useContext(MyContext);

  const [address, setAddress] = useState([]);

  // Delete address
  const removeAddress = (id) => {
    deleteData(`/api/address/delete/${id}`).then((res) => {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`,
      ).then((res) => {
        setAddress(res?.data);
        context?.getUserDetails();
      });
    });
  };

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setAddress(context?.userData?.address_details);
    }
  }, [context?.userData]);

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md mb-5">
              <div className="flex items-center pb-3">
                <h2 className="pb-3">Address</h2>
              </div>

              <div
                className="mt-6 py-4 text-center border border-dashed border-blue-200 rounded bg-blue-50 
                cursor-pointer hover:bg-blue-100 font-semibold text-xs sm:text-sm"
                onClick={() => {
                  context?.setOpenAddressPanel(true);
                  context?.setAddressMode("add");
                }}
              >
                + Add Address
              </div>

              <div className="flex gap-2 flex-col mt-4">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <AddressBox
                        address={address}
                        key={index}
                        removeAddress={removeAddress}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Address;
