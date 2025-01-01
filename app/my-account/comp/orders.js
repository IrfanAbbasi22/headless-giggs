"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import { userDetails, userDataToken } from "@/app/cart/store/slices/userSlice";

import { getOrders } from "@/app/components/lib/user/order/getOrders";
import Skeleton from "react-loading-skeleton";
import DotPulsePreloader from "@/app/cart/components/ui/dotPulsePreloader";
import { FiFilter } from "react-icons/fi";
import { formatCurrency } from "@/app/components/lib/user/formatCurrency";
import { cartDetails } from "@/app/cart/store/slices/cartSlice";
import OrderDetails from "./orderDetails";
import { useRouter } from "next/navigation";
import { MdDeliveryDining } from "react-icons/md";

const Orders = ({ slug }) => {
  const router = useRouter();
  const cartData = useSelector(cartDetails);
  const userData = useSelector(userDetails);
  const userToken = useSelector(userDataToken);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMorePreloader, setLoadMorePreloader] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const hasInitiated = useRef(false);

  const fetchUserOrders = async (perPage, curPage, status) => {
    setLoading(curPage === 1);
    setLoadMorePreloader(curPage > 1);

    try {
      const data = await getOrders(
        userToken,
        userData?.id,
        perPage,
        curPage,
        status
      );
      // console.log(`Data for page ${curPage}:`, data);

      if (data?.length) {
        setOrders((prevOrders) => [...prevOrders, ...data]);

        if (data.length < perPage) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
      setLoadMorePreloader(false);
    }
  };

  useEffect(() => {
    if (!hasInitiated.current) {
      hasInitiated.current = true;

      if (userToken && userData?.id) {
        fetchUserOrders(9, 1);
      }
    }
  }, [userData?.id]);

  const handleLoadMore = () => {
    setLoadMorePreloader(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const statusToSend = filterStatus === "all" ? "" : filterStatus;

    fetchUserOrders(9, nextPage, statusToSend);
  };

  const openFilter = () => {
    setShowFilter(true);
  };
  const handleOrderClick = (orderId) => {
    console.log(orderId, "ssssssssss");
    setSelectedOrder(orderId); // Set the selected order
  };

  const handleFilterChange = (status) => {
    setOrders([]);
    setCurrentPage(1);
    setFilterStatus(status);
    setShowFilter(false);
    const statusToSend = status === "all" ? "" : status;
    fetchUserOrders(9, 1, statusToSend);
  };

  return (
    <div className="">
      {!selectedOrder && (
        <div className="flex flex-col gap-3 lg:px-5 lg:pr-0 pb-4  ">
          <div className="  flex justify-between  items-center pt-2 lg:pt-0 ">
            <div className="flex gap-3 items-center lg:hidden">
              <Image
                src={"/assets/icons/back-arrow.svg"}
                width={24}
                height={25}
                alt="BackArrow"
                onClick={() => router.push("/my-account")}
                className=" cursor-pointer"
              />

              <h3 className="text-xl font-medium">My Orders</h3>
            </div>

            <h3 className="font-medium text-xl hidden lg:block">
              {filterStatus === "all"
                ? "My orders"
                : `Showing ${
                    filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)
                  } Orders`}
            </h3>
            {!loading && (
              <button
                onClick={openFilter}
                className=" flex items-center gap-1 bg-primary  hover:bg-primary-hover border text-white cursor-pointer py-1 px-4 rounded-lg"
              >
                <FiFilter className=" text-sm lg:text-base " />
                <span className="  text-sm lg:text-base">Filter</span>
              </button>
            )}
          </div>
          {showFilter && (
            <div className="fixed    font-maven inset-0 bg-black bg-opacity-60 overflow-x-hidden overflow-y-auto flex flex-col items-center  z-[300]">
              <div className=" flex flex-col w-[90%]  lg:max-w-[500px]   p-5     my-2  md:my-6 rounded-md gap-5 md:gap-10   lg:top-44  absolute  bg-white  overflow-y-auto  max-h-screen">
                <div className="text-xl flex   justify-between items-center  font-medium  ">
                  <div> Filter by</div>
                  <button
                    className="close "
                    onClick={() => {
                      setShowFilter(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M15.5 1L1.5 15M1.5 1L15.5 15"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <ul className="flex flex-col gap-2 lg:gap-3  pl-2">
                    {[
                      "all",
                      "processing",
                      "completed",
                      "failed",
                      "refunded",
                    ].map((status) => (
                      <li
                        key={status}
                        className="flex items-center gap-2 lg:gap-3"
                      >
                        <input
                          type="radio"
                          id={status}
                          name="filter"
                          value={status}
                          checked={filterStatus === status}
                          onChange={() => handleFilterChange(status)}
                          style={{ accentColor: "#ff5d58" }}
                        />
                        <label htmlFor={status} className="cursor-pointer ">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                          <span> Orders</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {orders.length === 0 && !loading && (
            <div className="flex items-center justify-center mt-20 mb-10">
              <Image
                src={`/assets/icons/no-item.svg`}
                width={193}
                height={193}
                alt="NoItem"
              />
            </div>
          )}

          {/* Loading Skeleton Section */}
          {loading && (
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="w-full lg:w-[calc(33%-5px)]">
                  <Skeleton height={225} width="100%" />
                </div>
              ))}
            </div>
          )}

          {/* Orders List */}
          {!loading && orders.length > 0 && (
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
              {/* {orders.map((order) => ( */}
              {orders.map((order, index) => (
                <div
                  key={`orderID${order?.id}${index}`}
                  // href={`/my-account/orders/${order?.id}`}
                  onClick={() => handleOrderClick(order.id)}
                  // passHref
                  className="w-full lg:w-[calc(33%-5px)]"
                >
                  <div
                    key={order.line_items[0]?.id}
                    className="flex flex-col border h-full w-full bg-lightGray rounded-[10px] p-3"
                  >
                    {/* Delivery Details */}
                    <div className="flex flex-col gap-3 h-full">
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex justify-between">
                          <h6 className="font-medium text-base cursor-pointer">
                            Order #{order.id}
                          </h6>
                          <span
                            className={`rounded-[30px] capitalize
                          ${
                            order.status === "completed" ||
                            order.status === "delivered" ||
                            order.status === "processing"
                              ? "bg-[#E0FFD9] text-[#1EA400]"
                              : ""
                          }
                          ${
                            order.status === "pending" ||
                            order.status === "cancelled" ||
                            order.status === "failed"
                              ? "bg-[#FFBEBE] text-[#C30000]"
                              : ""
                          }
                          ${
                            order.status === "checkout-draft" ||
                            order.status === "on-hold" ||
                            order.status === "refunded"
                              ? "bg-[#fff4b9] text-[#ff9811]"
                              : ""
                          }
                        px-3 text-center text-[10px] py-1`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                          {/* <p className="text-sm">Order #{order.id}</p> */}
                          <p className="text-xs text-[#2C292980]">
                            {new Date(order.date_created).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="flex flex-col gap-2">
                        {order.line_items.map((lineItem, index) => (
                          <div key={index} className="flex justify-between">
                            <p className="text-sm">{lineItem.name}</p>
                            <p className="text-xs text-[#2C292980]">
                              Qty: {lineItem.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                      <hr className="mt-auto" />
                      <div className="flex justify-between items-center">
                        <p className="text-base">
                          {formatCurrency(order.total, cartData?.totals)}
                        </p>
                        <div className="flex gap-1">
                          {order.status === "completed" ||
                          order.status === "delivered" ? (
                            <button className="py-[9px] px-3 rounded-[10px] text-white bg-primary-hover hover:bg-primary-hover cursor-pointer">
                              <div className="flex gap-[6px]">
                                <span className="text-xs font-medium">
                                  Reorder
                                </span>
                                <span>
                                  <Image
                                    src={`/assets/icons/reorder-icon.svg`}
                                    height={16}
                                    width={16}
                                    alt="ReOrder"
                                  />
                                </span>
                              </div>
                            </button>
                          ) : (
                            <button className="py-[9px] px-3 rounded-[10px] text-white bg-primary hover:bg-primary-hover cursor-pointer">
                              <div className="flex gap-[6px] items-center">
                                <span className="text-xs font-medium">
                                  Track
                                </span>
                                <span>
                                  <MdDeliveryDining className=" " />
                                </span>
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More CTA */}
          {orders.length > 0 && hasMore && (
            <div className="place-items-center grid my-5">
              <button
                onClick={handleLoadMore}
                className="w-max py-3 px-8 bg-primary hover:bg-primary-hover rounded-[100px] text-white font-medium disabled:text-primary transition-all relative"
                disabled={loadMorePreloader}
              >
                Load more
                {loadMorePreloader ? (
                  <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <DotPulsePreloader color={"#fff"} />
                  </div>
                ) : (
                  ""
                )}
              </button>
            </div>
          )}
        </div>
      )}
      {selectedOrder && (
        <OrderDetails
          setSelectedOrder={setSelectedOrder}
          orderId={selectedOrder}
          slug={slug}
        />
      )}
    </div>
  );
};

export default Orders;
