import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import ProductZoom from "../../components/ProductZoom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import ProductSlider from "../../components/ProductSlider";
import ProductDetailsComponent from '../../components/ProductDetails'


const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/"
              className="link transition !text-[14px]   "
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              to="/"
              className="link transition !text-[14px]"
            >
              Fashion
            </Link>

            <Link
              underline="hover"
              color="inherit"
              className="link transition !text-[14px]"
            >
              Cropped Bamber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5">
        <div className="container flex gap-8 items-center">
          <div className="productZoomContainer w-[40%]">
            <ProductZoom />
          </div>

          <div className="productContent w-[60%] pr-10 pl-10">
            <ProductDetailsComponent />
          </div>
        </div>

        <div className="container pt-10">
          <div className="flex items-center gap-8 mb-5">
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 0 && "text-primary"}`}
              onClick={() => setActiveTab(0)}
            >
              Description
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 1 && "text-primary"}`}
              onClick={() => setActiveTab(1)}
            >
              Product Details
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 2 && "text-primary"}`}
              onClick={() => setActiveTab(2)}
            >
              Reviews (5)
            </span>
          </div>

          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since 1966, when designers at Letraset and James
                Mosley, the librarian at St Bride Printing Library in London,
                took a 1914 Cicero translation and scrambled it to make dummy
                text for Letraset's Body Type sheets.
              </p>

              <h4>Lightweight Design</h4>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since 1966, when designers at Letraset and James
                Mosley, the librarian at St Bride Printing Library in London,
                took a 1914 Cicero translation and scrambled it to make dummy
                text for Letraset's Body Type sheets.
              </p>

              <h4>Free Shipping & Return</h4>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>

              <h4>Money back gurantee</h4>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>

              <h4>Online Support</h4>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table class="w-full text-sm text-left rtl:text-right text-body">
                  <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                    <tr>
                      <th scope="col" class="px-6 py-3 font-medium">
                        Stand Up
                      </th>
                      <th scope="col" class="px-6 py-3 font-medium">
                        Folded (w/o wheels)
                      </th>
                      <th scope="col" class="px-6 py-3 font-medium">
                        Folded (w/o wheels)
                      </th>
                      <th scope="col" class="px-6 py-3 font-medium">
                        Door Pass Through
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-neutral-primary border-b border-default">
                      <td class="px-6 py-4">
                        35"L x 24"W x 37-45"H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4">35"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-neutral-primary border-b border-default">
                      <td class="px-6 py-4">
                        35"L x 24"W x 37-45"H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4">35"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-neutral-primary border-b border-default">
                      <td class="px-6 py-4">
                        35"L x 24"W x 37-45"H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4">35"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-neutral-primary border-b border-default">
                      <td class="px-6 py-4">
                        35"L x 24"W x 37-45"H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4">35"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-neutral-primary border-b border-default">
                      <td class="px-6 py-4">
                        35"L x 24"W x 37-45"H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4">35"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
              <div className="w-full productReviewContainer">
                <h2 className="text-[18px]">Customer questions & answers</h2>

                <div className="reviewScroll croll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5">
                  <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://lirp.cdn-website.com/6f140169/dms3rep/multi/opt/Parikshit+Gokhale-640w.jpg"
                          className="w-full "
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[15px]">Yash Kumar</h4>
                        <h5 className="text-[13px] mb-0">2026-23-07</h5>
                        <p className="mb-0 mt-0">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eligendi cupiditate sit deleniti. Aliquam,
                          mollitia consectetur!
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://lirp.cdn-website.com/6f140169/dms3rep/multi/opt/Parikshit+Gokhale-640w.jpg"
                          className="w-full "
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[15px]">Yash Kumar</h4>
                        <h5 className="text-[13px] mb-0">2026-23-07</h5>
                        <p className="mb-0 mt-0">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eligendi cupiditate sit deleniti. Aliquam,
                          mollitia consectetur!
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://lirp.cdn-website.com/6f140169/dms3rep/multi/opt/Parikshit+Gokhale-640w.jpg"
                          className="w-full "
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[15px]">Yash Kumar</h4>
                        <h5 className="text-[13px] mb-0">2026-23-07</h5>
                        <p className="mb-0 mt-0">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eligendi cupiditate sit deleniti. Aliquam,
                          mollitia consectetur!
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                </div>

                <br />

                <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
                  <h2 className="text-[18px]">Add a review </h2>

                  <form className="w-full mt-5">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Write a review..."
                      className="w-full !mb-5"
                      multiline
                      rows={5}
                    />

                    <Rating name="size-small" defaultValue={4} readOnly />

                    <div className="flex items-center mt-5">
                      <Button className="btn-org">Submit Review</Button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container pt-8">
          <h2 className="text-[20px] font-[600] pb-0">Related Products</h2>
          <ProductSlider items={5} />
        </div>


      </section>
    </>
  );
};

export default ProductDetails;
