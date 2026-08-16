import React, { useContext } from "react";

import MyListItems from "./MyListItems";
import AccountSideBar from "../../components/AccountSideBar";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const MyList = () => {
  const context = useContext(MyContext);
  window.scrollTo(0, 0);

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>

        <div className="col2 w-[70%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My List</h2>
              <p className="mt-0">
                There are{" "}
                <span className="font-bold text-primary">
                  {context?.myListData?.length}
                </span>{" "}
                products in my list
              </p>
            </div>

            {context?.myListData?.length !== 0 ? (
              context?.myListData?.map((item, index) => {
                return <MyListItems item={item} />;
              })
            ) : (
              <div className="flex justify-center items-center flex-col py-10 gap-2">
                <img src="/checklist.png" alt="empty" className="w-[100px]" />
                <h3 className="font-[600] text-[18px] mb-3">
                  List is currently empty{" "}
                </h3>
                <Link to="/">
                  <Button className="btn-org btn-sm">Continue Shopping</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
