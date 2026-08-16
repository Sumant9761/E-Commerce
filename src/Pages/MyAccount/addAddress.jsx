import React, { useContext, useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MyContext } from "../../App";
import TextField from "@mui/material/TextField";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Button } from "@mui/material";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const AddAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addressType, setAddressType] = useState(false);
  const [phone, setPhone] = useState("");

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    addressType: "",
    landmark: "",
  });

  const context = useContext(MyContext);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormFields((prev) => ({
      ...prev,
      addressType: event.target.value,
    }));
  };

  useEffect(() => {
    if (context?.userData?._id !== undefined) {
      setFormFields((prevState) => ({
        ...prevState,
        userId: context?.userData?._id,
      }));
    }
  }, [context?.userData]);

  useEffect(() => {
    if (context?.addressMode === "edit") {
      fetchAddress(context?.addressId);
    }
  }, [context?.addressMode]);

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
    if (formFields.phone === "") {
      context.openAlertBox("error", "Please enter your Phone Number");
      setIsLoading(false);
      return false;
    }
    if (formFields.landmark === "") {
      context.openAlertBox("error", "Please enter your landmark");
      setIsLoading(false);
      return false;
    }
    if (formFields.addressType === "") {
      context.openAlertBox("error", "Please select address type");
      setIsLoading(false);
      return false;
    }

    if (context?.addressMode === "add") {
      setIsLoading(true);
      postData(`/api/address/addAddress`, formFields, {
        withCredentials: true,
      }).then((res) => {
        if (res?.error !== true) {
          context.openAlertBox("success", res?.message);
          setTimeout(() => {
            context?.setOpenAddressPanel(false);
            setIsLoading(false);
          }, 300);

          context?.getUserDetails();

          setFormFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            userId: "",
            addressType: "",
            landmark: "",
          });
          setAddressType("");
          setPhone("");
        } else {
          context.openAlertBox("error", res?.message);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(true);
      editData(`/api/address/${context?.addressId}`, formFields, {
        withCredentials: true,
      }).then((res) => {
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`,
        ).then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            context?.setOpenAddressPanel(false);
          }, 300);
          context?.getUserDetails(res?.data);

          setFormFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            userId: "",
            addressType: "",
            landmark: "",
          });
          setAddressType("");
          setPhone("");
        });
      });
    }
  };

  const fetchAddress = (id) => {
    fetchDataFromApi(`/api/address/${id}`).then((res) => {
      setFormFields({
        address_line1: res?.address?.address_line1,
        city: res?.address?.city,
        state: res?.address?.state,
        pincode: res?.address?.pincode,
        country: res?.address?.country,
        mobile: res?.address?.mobile,
        userId: res?.address?.userId,
        addressType: res?.address?.addressType,
        landmark: res?.address?.landmark,
      });

      const ph = `"${res?.address?.mobile}"`;
      setPhone(ph);
      setAddressType(res?.address?.addressType);
    });
  };

  return (
    <form className="p-8 py-3 pb-8 px-4" onSubmit={handleSubmit}>
      <div className="col w-[100%] mb-4">
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

      <div className="col w-[100%] mb-4">
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

      <div className="col w-[100%] mb-4">
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

      <div className="col w-[100%] mb-4">
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

      <div className="col w-[100%] mb-4">
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

      <div className="col w-[100%] mb-4">
        <PhoneInput
          defaultCountry="in"
          value={phone}
          onChange={(phone) => {
            setPhone(phone);
            setFormFields((prev) => ({ ...prev, mobile: phone }));
          }}
        />
      </div>

      <div className="col w-[100%] mb-4">
        <TextField
          className="w-full"
          label="Landmark"
          variant="outlined"
          size="small"
          name="landmark"
          value={formFields.landmark}
          onChange={onChangeInput}
        />
      </div>

      <div className="flex flex-col gap-5 pb-5">
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Address Type
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={addressType}
            onChange={handleChangeAddressType}
          >
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel
              value="Office"
              control={<Radio />}
              label="Office"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="flex items-center gap-5">
        <Button
          type="submit"
          className="w-full btn-org btn-lg flex items-center gap-2"
        >
          {isLoading === true ? <CircularProgress /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddAddress;
