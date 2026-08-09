import React from "react";
import { useState, useEffect, useContext } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import Radio from "@mui/material/Radio";
import { MyContext } from "../../App";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import { FaRegTrashAlt } from "react-icons/fa";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Address = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
    userId: "",
    selected: false,
  });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  // Delete address
  const removeAddress = async (id) => {
    try {
      const deleteRes = await deleteData(`/api/address/delete/${id}`);
      if (deleteRes?.success) {
        context.openAlertBox("success", "Address deleted successfully");
        const updatedAddresses = await fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        );
        if (updatedAddresses?.data) {
          setAddress(updatedAddresses.data);
          context?.setAddress(updatedAddresses.data);
        }
      } else {
        context.openAlertBox("error", "Failed to delete address");
      }
    } catch {
      context.openAlertBox("error", "Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.openAlertBox("error", "Please enter your address");
      setIsLoading(false);
      return false;
    }
    if (formFields.city === "") {
      context.openAlertBox("error", "Please enter your city");
      setIsLoading(false);
      return false;
    }
    if (formFields.state === "") {
      context.openAlertBox("error", "Please enter your State");
      setIsLoading(false);
      return false;
    }
    if (formFields.pincode === "") {
      context.openAlertBox("error", "Please enter your Pincode");
      setIsLoading(false);
      return false;
    }
    if (formFields.country === "") {
      context.openAlertBox("error", "Please enter your Country Name");
      setIsLoading(false);
      return false;
    }
    if (formFields.status === "") {
      context.openAlertBox("error", "Please select status");
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    postData(`/api/address/addAddress`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);

        setIsOpenModal(false);

        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`,
        ).then((res) => {
          setAddress(res?.data);
        });
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`,
      ).then((res) => {
        setAddress(res?.data);
      });
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
                onClick={() => setIsOpenModal(true)}
              >
                + Add Address
              </div>

              <div className="flex gap-2 flex-col mt-4">
                {address?.length > 0 &&
                  address?.map((addr, idx) => {
                    return (
                      <>
                        <label
                          key={addr._id || idx}
                          className="group relative border border-dashed border-blue-200 addressBox w-full flex items-center 
                                justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer"
                        >
                          <div className="mr-auto">
                            <Radio
                              {...label}
                              name="address"
                              checked={selectedValue === addr._id}
                              value={addr._id}
                              onChange={handleChange}
                            />
                            <span className="text-[12px]">
                              {`${addr.address_line1} ${addr.city} ${addr.country} ${addr.state} ${addr.pincode}`}
                            </span>
                          </div>

                          <span
                            className="hidden group-hover:flex items-center justify-center w-[28px] h-[28px] 
                            rounded-full bg-gray-600 text-white ml-auto cursor-pointer"
                            onClick={() => removeAddress(addr._id)}
                          >
                            <FaRegTrashAlt />
                          </span>
                        </label>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModal}>
        <DialogTitle>Add Address</DialogTitle>

        <form className="p-8 py-3 pb-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[100%]">
              <TextField
                className="w-full"
                label="Address Line 1"
                variant="outlined"
                size="small"
                name="address_line1"
                value={formFields.address_line1}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="City"
                variant="outlined"
                size="small"
                name="city"
                value={formFields.city}
                onChange={onChangeInput}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="State"
                variant="outlined"
                size="small"
                name="state"
                value={formFields.state}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Pincode"
                variant="outlined"
                size="small"
                name="pincode"
                value={formFields.pincode}
                onChange={onChangeInput}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Country"
                variant="outlined"
                size="small"
                name="country"
                value={formFields.country}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields((prev) => ({ ...prev, mobile: phone }));
                }}
              />
            </div>

            <div className="col w-[50%]">
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full"
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Button
              type="submit"
              className="w-full btn-org btn-lg flex items-center gap-2"
            >
              Save
            </Button>
            <Button
              className="w-full btn-org btn-border btn-lg flex items-center gap-2"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
