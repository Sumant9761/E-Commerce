import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";

import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import { createContext, useEffect, useState } from "react";


import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";

import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";
import { fetchDataFromApi, postData } from "./utils/api";
import Address from "./Pages/MyAccount/address";

const MyContext = createContext();

function App() {
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState({
    open: false,
    item: {},
  });
 
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [address, setAddress] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);

  const [openCartPanel, setOpenCartPanel] = useState(false);

  const handleOpenProductDetailsModel = (status, item) => {
    setOpenProductDetailsModel({
      open: status,
      item: item,
    });
  };

  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel({
      open: false,
      item: {},
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi("/api/user/user-details").then((res) => {
        setUserData(res.data);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have not login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            openAlertBox("error", "Your session is closed please login again");
            window.location.href = "/login";
            setIsLogin(false);
          }
        }
      });
      getCartItems();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });
  }, []);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      openAlertBox("error", "You are not login so please login first");
      return false;
    }

    const data = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      brand: product?.brand,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
    };

    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        openAlertBox("success", res?.message);
        getCartItems();
      } else {
        openAlertBox("error", res?.message);
      }
    });
  };

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  };

  const values = {
    setOpenProductDetailsModel,
    openProductDetailsModel,
    handleOpenProductDetailsModel,
    handleCloseProductDetailsModel,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    setAddress,
    address,
    setCatData,
    catData,
    addToCart,
    cartData,
    getCartItems,
    setCartData
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productListing" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
        </Routes>
        <Footer />
      </MyContext.Provider>

      <Toaster />

      
    </>
  );
}

export default App;

export { MyContext };
