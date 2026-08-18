import React, { useState, useEffect, useRef } from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenResult, setIsOpenResult] = useState(false);
  const navigate = useNavigate();
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setIsOpenResult(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setIsLoading(true);
      setIsOpenResult(true);
      postData("/api/product/search", { query: query }).then((res) => {
        if (res?.error === false && res?.products) {
          setSearchResults(res.products);
        } else {
          setSearchResults([]);
        }
        setIsLoading(false);
      });
    } else {
      setSearchResults([]);
      setIsOpenResult(false);
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim() !== "") {
      setIsOpenResult(false);
      navigate(`/productListing?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <div ref={searchBoxRef} className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearchInput}
        onKeyDown={handleKeyDown}
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px] pr-[45px]"
      />
      <Button
        onClick={handleSearchSubmit}
        className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[35px] h-[37px] !rounded-full !text-black"
      >
        <IoMdSearch className="text-[#4e4e4e] text-[22px]" />
      </Button>

      {isOpenResult && (
        <div className="absolute top-[55px] left-0 w-full bg-white shadow-xl rounded-md z-[999] max-h-[350px] overflow-y-auto border border-gray-200 p-2">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <CircularProgress size={24} />
            </div>
          ) : searchResults?.length > 0 ? (
            searchResults.map((product) => (
              <div
                key={product._id}
                onClick={() => {
                  setIsOpenResult(false);
                  setSearchQuery("");
                  navigate(`/product/${product._id}`);
                }}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md border-b border-gray-100 last:border-b-0 transition-all"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-[45px] h-[45px] object-cover rounded-md"
                />
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-[14px] font-[500] text-gray-800 truncate">
                    {product.name}
                  </h4>
                  <span className="text-[12px] font-[600] text-primary">
                    &#x20b9;{product.price}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-[13px] text-gray-500">
              No products found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
