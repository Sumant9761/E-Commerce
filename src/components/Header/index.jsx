import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { IoCart } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  const context = useContext(MyContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-white">
      <div className="top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px]">
        <div className="container">
          <div className="flex item-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[14px] font-[500]">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="text-[13px] link font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="text-[13px] link font-[500] transition"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-4 border-b-[1px] border-gray-300">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[20%]">
            <Link to={"/"}>
              <img src="/logo.jpg" />
            </Link>
          </div>

          <div className="col2 w-[45%]">
            <Search />
          </div>

          <div className="col3 w-[30%] flex items-center pl-7">
            <ul className="flex items-center justify-end gap-3 w-full">
              {context.isLogin === false ? (
                <li className="list-one">
                  <Link
                    to="/login"
                    className="link transition text-[15px] font-[500]"
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    className="link transition text-[15px] font-[500]"
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  <Button
                    className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]">
                      <FaRegUser className="text-[16px] text-[#000]" />
                    </Button>

                    <div className="info flex flex-col">
                      <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.7)] font-[500] mb-0 capitalize text-left justify-start">
                        Sumant Kumar
                      </h4>
                      <span className="text-[13px] text-[rgba(0,0,0,0.7)] font-[400] capitalize">
                        sumant@gmail.com
                      </span>
                    </div>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to="/my-account" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <FaRegUser className="text-[18px]" />{" "}
                        <span className="text-[14px]">My Account</span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-orders" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <IoBagCheckOutline className="text-[18px]" />{" "}
                        <span className="text-[14px]">Orders</span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-list" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <FaRegHeart className="text-[18px]" />{" "}
                        <span className="text-[14px]">My List</span>
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={handleClose}
                      className="flex gap-2 !py-2"
                    >
                      <IoIosLogOut className="text-[18px]" />{" "}
                      <span className="text-[14px]">Logout</span>
                    </MenuItem>
                  </Menu>
                </>
              )}

              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={8} color="primary">
                      <IoIosGitCompare />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={8} color="primary">
                      <FaRegHeart />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <Badge badgeContent={8} color="primary">
                      <IoCart />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
