import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FiMinusSquare } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";

const CategoryCollapse = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  return (
    <>
      <div className="scroll">
        <ul className="w-full">
          {props?.data?.length !== 0 &&
            props?.data?.map((cat, index) => {
              return (
                <li
                  className="list-none flex items-center realtive flex-col"
                  key={index}
                >
                  <Link to={`/productListing?catId=${cat?._id}`} className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      {cat?.name}
                      {submenuIndex === index ? (
                        <FiMinusSquare
                          className="absolute top-[10px] right-[15px] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openSubmenu(index);
                          }}
                        />
                      ) : (
                        <FaRegPlusSquare
                          className="absolute top-[10px] right-[15px] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openSubmenu(index);
                          }}
                        />
                      )}
                    </Button>
                  </Link>

                  {submenuIndex === index && (
                    <ul className="submenu w-full pl-3">
                      {cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index_) => {
                          return (
                            <li className="list-none relative" key={index_}>
                              <Link to={`/productListing?subCatId=${subCat?._id}`} className="w-full">
                                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                  {subCat?.name}
                                  {innerSubmenuIndex === index_ ? (
                                    <FiMinusSquare
                                      className="absolute top-[10px] right-[15px] cursor-pointer"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openInnerSubmenu(index_);
                                      }}
                                    />
                                  ) : (
                                    <FaRegPlusSquare
                                      className="absolute top-[10px] right-[15px] cursor-pointer"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openInnerSubmenu(index_);
                                      }}
                                    />
                                  )}
                                </Button>
                              </Link>

                              {innerSubmenuIndex === index_ && (
                                <ul className="inner_submenu w-full pl-3">
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map(
                                      (thirdLevelCat, index__) => {
                                        return (
                                          <li
                                            className="list-none relative mb-1"
                                            key={index__}
                                          >
                                            <Link
                                              to={`/productListing?thirdsubCatId=${thirdLevelCat?._id}`}
                                              className="link w-full !text-left !justify-start !px-6 transition text-[14px]"
                                            >
                                              {thirdLevelCat?.name}
                                            </Link>
                                          </li>
                                        );
                                      },
                                    )}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
