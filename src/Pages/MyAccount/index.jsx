import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountSideBar from "../../components/AccountSideBar";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(false);
  const [phone, setPhone] = useState("");

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setChangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);
  const valideValue2 = Object.values(formFields).every((el) => el);

  const context = useContext(MyContext);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter your full name");
      setIsLoading(false);
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter your email id");
      setIsLoading(false);
      return false;
    }
    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please enter your mobile number");
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.error !== true) {
          context.openAlertBox("success", res?.data?.message);
          setIsLoading(false);
        } else {
          context.openAlertBox("error", res?.data?.message);
          setIsLoading(false);
        }
      },
    );
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (changePassword.oldPassword === "") {
      context.openAlertBox("error", "Please enter old password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Please enter new password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confirm password");
      setIsLoading2(false);
      return false;
    }

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      context.openAlertBox(
        "error",
        "New Password and Confirm Password must be same",
      );
      setIsLoading2(false);
      return false;
    }

    setIsLoading2(true);
    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setTimeout(() => {
          setIsLoading2(false);
        }, 500);
        context.openAlertBox("success", res?.message);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading2(false);
      }
    });
  };

  //When user is not login then redirect to home page
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/");
    }
  }, [context?.isLogin]);

  //To set the old user data before updating in form when you open my account page
  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });
      setPhone(`${context?.userData?.mobile || ""}`);
      setChangePassword({ email: context?.userData?.email });
    }
  }, [context?.userData]);

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>

        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className="pb-3">My Profile</h2>
              <Button
                className="!ml-auto"
                onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
              >
                Change Password
              </Button>
            </div>
            <hr />

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    onChange={onChangeInput}
                    disabled={isLoading === true ? true : false}
                  />
                </div>

                <div className="w-[50%]">
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    onChange={onChangeInput}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="flex items-center mt-4 gap-5">
                <div className="w-[50%]">
                  <PhoneInput
                    defaultCountry="in"
                    value={phone}
                    onChange={(phone) => {
                      setPhone(phone);
                      setFormFields({ ...formFields, mobile: phone });
                    }}
                    disabled={isLoading === true ? true : false}
                  />
                </div>
              </div>

              <br />

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={!valideValue}
                  className="btn-org btn-sm w-[150px]"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>

          <Collapse isOpened={isOpenCategoryFilter}>
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-3">Change Password</h2>
              </div>
              <hr />

              <form className="mt-8" onSubmit={handleSubmitChangePassword}>
                <div className="flex items-center gap-5">
                  <div className="w-[50%]">
                    <TextField
                      type="text"
                      label="Old Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="oldPassword"
                      value={changePassword.oldPassword}
                      onChange={onChangePassword}
                      disabled={isLoading2 === true ? true : false}
                    />
                  </div>

                  <div className="w-[50%]">
                    <TextField
                      type="text"
                      label="New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="newPassword"
                      value={changePassword.newPassword}
                      onChange={onChangePassword}
                      disabled={isLoading2 === true ? true : false}
                    />
                  </div>
                </div>

                <div className="flex items-center mt-4 gap-5">
                  <div className="w-[50%]">
                    <TextField
                      label="Confirm Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="confirmPassword"
                      value={changePassword.confirmPassword}
                      onChange={onChangePassword}
                      disabled={isLoading2 === true ? true : false}
                    />
                  </div>
                </div>

                <br />

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={!valideValue2}
                    className="btn-org btn-sm w-[170px]"
                  >
                    {isLoading2 === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
