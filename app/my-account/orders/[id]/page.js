"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useParams } from "next/navigation";
import { getOrderDetails } from "@/app/components/lib/user/order/getOrderDetails";
import { useSelector } from "react-redux";
import { userDataToken } from "@/app/cart/store/slices/userSlice";
import Skeleton from "react-loading-skeleton";
import { formatCurrency } from "@/app/components/lib/user/formatCurrency";

const OrderDetails = () => {
  const userToken = useSelector(userDataToken);
  const { id } = useParams();

  // console.log("id", id);
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrderDetails(id, userToken);
      // console.log(data);
      setOrderDetail(data);

    } catch (error) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const itemId = parseInt(id, 10);

  if (loading) {
    return (
      <>
        <div className="py-4 lg:py-10">
          <div className="container mx-auto px-5">
            <div className="flex flex-col gap-3 lg:gap-6">
              <div className="flex justify-between">
                <div className="flex gap-7 items-center">
                  <Link href="/my-account">
                    <Image
                      src={"/assets/icons/back-arrow.svg"}
                      width={24}
                      height={25}
                      alt="Back Arrow"
                    />
                  </Link>
                  <h3 className="text-2xl font-medium">Order Details</h3>
                </div>

                <div className="flex">
                  <Link
                    href="/myorder"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span className="text-sm text-[#2C292980]">Help</span>
                    <Image
                      src={"/assets/icons/question-mark.svg"}
                      width={16}
                      height={16}
                      alt="Question Mark"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col lg:justify-center lg:items-center">
                <div className="flex flex-col gap-[22px] mt-3 lg:w-[60%]">
                  <div className=" w-1/2 h-auto">
                    <Skeleton />
                  </div>
                  <hr />
                  <Skeleton width={`33%`} />
                  <h4 className="text-xl font-medium">Delivery</h4>

                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-[6px]">
                      <p className="text-sm text-[#2C292980]">Address</p>
                      <div className=" w-4/12 h-auto">
                        <Skeleton />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[6px] place-items-end">
                      <p className="text-sm text-[#2C292980]">
                        Delivery Method
                      </p>
                      <Skeleton width={100} />
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="flex flex-col gap-3 lg:gap-6 lg:w-[60%] mt-6 lg:mt-8">
                  <div className="flex flex-col border gap-[10px] w-full bg-lightGray   rounded-[10px] p-3">
                    <div className="flex justify-between">
                      <p className="text-base text-[#2C292980]">
                        Qty & Item Name
                      </p>
                      <strong className="text-sm">Total</strong>
                    </div>

                    <div className=" w-full h-auto  ">
                      <Skeleton />
                      <Skeleton />
                    </div>
                  </div>
                  <div className="flex flex-col border gap-[10px] w-full bg-lightGray rounded-[10px] p-3">
                    <div className=" w-full h-auto  ">
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </div>
                  </div>

                  <div className="flex flex-col border gap-[10px] w-full bg-lightGray rounded-[10px] p-3">
                    <div className="flex justify-between">
                      <Skeleton width={150} height={20} />
                      <Skeleton width={150} height={20} />
                    </div>
                  </div>

                  <div className="flex lg:justify-center">
                    <div className="w-full text-center">
                      <Skeleton
                        width={`100%`}
                        className="!w-full !max-w-[60%] !mx-auto"
                        height={32}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="py-4 lg:py-10">
        <div className="container mx-auto px-5">
          <div className="flex flex-col gap-3 lg:gap-6">
            <div className="flex justify-between">
              <div className="flex gap-7 items-center">
                <Link href="/my-account">
                  <Image
                    src={"/assets/icons/back-arrow.svg"}
                    width={24}
                    height={25}
                    alt="Back Arrow"
                  />
                </Link>
                <h3 className="text-2xl font-medium">Order Details</h3>
              </div>

              <div className="flex">
                <Link
                  href="/myorder"
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span className="text-sm text-[#2C292980]">Help</span>
                  <Image
                    src={"/assets/icons/question-mark.svg"}
                    width={16}
                    height={16}
                    alt="Question Mark"
                  />
                </Link>
              </div>
            </div>

            <div className="flex flex-col lg:justify-center lg:items-center">
              <div className="flex flex-col gap-[22px] mt-3 lg:w-[60%]">
                <div className="flex gap-2 items-center">
                  <h3 className="text-lg font-medium">
                    Order ID: {orderDetail.id || "N/A"}
                  </h3>

                  <span
                    className={`py-1 px-3 rounded-[30px] text-[10px]
                      ${
                        orderDetail?.status === "completed" ||
                        orderDetail?.status === "delivered" ||
                        orderDetail?.status === "processing"
                          ? "bg-[#E0FFD9] text-[#1EA400]"
                          : ""
                      }
                      ${
                        !orderDetail?.status ||
                        orderDetail?.status === "pending" ||
                        orderDetail?.status === "cancelled" ||
                        orderDetail?.status === "failed"
                          ? "bg-[#FFBEBE] text-[#C30000]"
                          : ""
                      }
                      ${
                        orderDetail?.status === "checkout-draft" ||
                        orderDetail?.status === "on-hold" ||
                        orderDetail?.status === "refunded"
                          ? "bg-[#fff4b9] text-[#ff9811]"
                          : ""
                      }
                    `}
                  >
                    {orderDetail?.status || "Status not available"}
                  </span>
                </div>
                <hr />
                <h4 className="text-xl font-medium">Delivery</h4>

                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-[6px]">
                    <h6 className="text-sm text-[#2C292980]">Address</h6>
                    <div className=" flex flex-col">
                      <p className="text-xs text-[#2C2929]">
                        {orderDetail?.shipping_address?.address_1 &&
                        orderDetail?.shipping_address?.address_2 &&
                        orderDetail?.shipping_address?.city &&
                        orderDetail?.shipping_address?.postcode
                          ? `${orderDetail.shipping_address.address_1} ${orderDetail.shipping_address.address_2},${orderDetail.shipping_address.city},${orderDetail.shipping_address.postcode}`
                          : "address"}
                      </p>
                      <p className="text-xs text-[#2C2929]">
                         
                        {`Mobile - ${orderDetail?.shipping_address?.phone
                          ? `${orderDetail.shipping_address.phone}`
                          : "Mobile"}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[6px] place-items-end">
                    <h6 className="text-sm text-[#2C292980]">
                      Delivery Method
                    </h6>
                    <p className="font-medium text-xs gap-1 flex items-center text-[#FF5D58]">
                      <Image
                        width={12}
                        height={13}
                        src={"/assets/icons/delivery.svg"}
                        alt="Delivery icon"
                      />

                      <span>Delivery in 90 mins</span>
                    </p>
                  </div>
                </div>
                <hr />
              </div>

              <div className="flex flex-col gap-3 lg:gap-6 lg:w-[60%] mt-6 lg:mt-8">
                <div className="flex flex-col border gap-[10px] w-full bg-lightGray   rounded-[10px] p-3">
                  <div className="flex justify-between">
                    <h6 className="text-base text-[#2C292980]">
                      Qty & Item Name
                    </h6>
                    <strong className="text-sm">Total</strong>
                  </div>

                  {orderDetail?.items?.length > 0 ? (
                    orderDetail.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <p className="text-base">
                          {item.quantity} x {item.name}
                        </p>
                        <p className="text-sm">
                          {formatCurrency(item?.quantity * item.prices?.price, orderDetail?.totals)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No items found</p>
                  )}
                </div>
                <div className="flex flex-col border gap-[10px] w-full bg-lightGray rounded-[10px] p-3">
                  <div className={`flex justify-between `}>
                    <p className="text-base">Subtotal</p>

                    <p className="text-sm">
                      {formatCurrency(orderDetail?.totals?.subtotal || 0, orderDetail?.totals)}
                    </p>
                  </div>
                  {orderDetail?.totals?.total_discount > 0 && (
                    <div className={`flex justify-between `}>
                      <p className="text-base text-[#24C300]">Discount</p>
                      <p className="text-sm text-[#008000]">
                        - {formatCurrency(orderDetail?.totals?.total_discount, orderDetail?.totals)}
                      </p>
                    </div>
                  )}
                  <div className={`flex justify-between `}>
                    <p className="text-base">Shipping charges</p>
                    <p className="text-sm">
                      {formatCurrency(orderDetail?.totals?.total_shipping || 0, orderDetail?.totals)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-lg">Total</strong>
                    <p className="text-sm font-medium">
                      {formatCurrency(orderDetail?.totals?.total_price || 0, orderDetail?.totals)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col border gap-[10px] w-full bg-lightGray rounded-[10px] p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                      <Image
                        src={"/assets/icons/invoice.svg"}
                        width={24}
                        height={24}
                        alt="Invoice"
                      />
                      <span className="text-sm">Invoice</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-sm">Download</span>
                      <Image
                        src={"/assets/icons/download.svg"}
                        width={24}
                        height={24}
                        alt="Download"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex lg:justify-center">
                  <button className="bg-primary w-full lg:max-w-[60%] hover:bg-primary-hover text-white py-3 px-32 rounded-[10px]">
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
