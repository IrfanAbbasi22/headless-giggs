"use client";
import Image from "next/image";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { userDataToken } from "../cart/store/slices/userSlice";
import { useSelector } from "react-redux";
import { formatCurrency } from "../components/lib/user/formatCurrency";
import Confetti from "../cart/components/confetti";

// import { useRouter } from "next/router";

// export const fetchOrderDetails = async (id, orderKey, email) => {
export const fetchOrderDetails = async (id, userToken) => {
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/v1/order/${id}`;
  // const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/v1/order/${id}?key=${orderKey}&billing_email=${email}`;

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (userToken?.length > 0) {
      headers.Authorization = `Bearer ${userToken}`;
    } else {
      headers.Authorization =
        "Basic " +
        btoa(
          `${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`
        );
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch order details");
    }

    // Parse and return the JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
};

export default function ThanksScreen({ data }) {
  // Call Confetti
  const confettiRef = useRef();

  const userToken = useSelector(userDataToken);

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const orderKey = searchParams.get("orderKey");
  const email = searchParams.get("email");

  const [orderData, setOrderData] = useState({});
  const [orderSubTotal, setOrderSubTotal] = useState();

  const hasInitiated = useRef(false);
  
  useEffect(() => {
    if (!hasInitiated.current) {
      hasInitiated.current = true;
      
      fetchOrderDetails(id, userToken)
        .then((data) => {
          if (data) {
            setOrderData(data);
            confettiRef.current.triggerConfettiFromParent();
            // console.log("Order Details orderData:", data);
          } else {
            console.log("Failed to fetch order details.");
          }
        })
        .catch((error) => {
          console.log("Error fetching order details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <>
        <div className="container py-6">
          <div className="grid md:grid-cols-12 gap-4 md:justify-between">
            <div className="md:col-span-7 ">
              <Skeleton width={`100%`} height={20} />
              <Skeleton width={`100%`} height={20} />

              <div className="py-4 space-y-2 lg:space-y-4">
                <Skeleton width={`100%`} height={16} />
                <Skeleton width={`100%`} height={16} />
                <Skeleton width={`100%`} height={16} />
              </div>

              <div className="py-4 text-sm">
                <Skeleton width={`100%`} height={16} />
                <Skeleton width={`100%`} height={16} />
                <Skeleton width={`100%`} height={16} />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-[#FAFAFA] p-4 border border-[#EBEBEB] rounded-md mt-6 lg:mt-0">
                <Skeleton width={`100%`} height={16} />

                <div className="pt-5 flex gap-3 text-sm">
                  <Skeleton width={60} height={80} />
                  <div className="flex-1">
                    <p className="font-medium mb-2 lg:w-9/12">
                      <Skeleton width={`50%`} height={10} />
                      <Skeleton width={`20%`} height={10} />
                    </p>
                  </div>
                  <Skeleton width={100} height={20} />
                </div>

                <div className="pt-5 flex gap-3 text-sm">
                  <Skeleton width={60} height={80} />
                  <div className="flex-1">
                    <p className="font-medium mb-2 lg:w-9/12">
                      <Skeleton width={`50%`} height={10} />
                      <Skeleton width={`20%`} height={10} />
                    </p>
                  </div>
                  <Skeleton width={100} height={20} />
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
      {orderData?.id ? (
        <>
          <div className="container py-6">
            <div className="grid md:grid-cols-12 gap-4 md:justify-between">
              <div className="md:col-span-7 ">
                <div className="flex items-start pb-4 border-b border-[#ADADAD]">
                  <span className="p-2 pl-0">
                    <Link href={`/`}>
                      <Image
                        src={`/assets/icons/left-arrow-icon.svg`}
                        width={16}
                        height={24}
                        alt="Back button"
                      />
                    </Link>
                  </span>
                  <Image
                    src={`/assets/icons/checked.svg`}
                    width={30}
                    height={30}
                    alt="Success Icon"
                    className="mr-2"
                  />
                  <div>
                    <p className="font-bold text-lg">
                      Hi{" "}
                      {`${orderData?.billing_address?.first_name} ${orderData?.billing_address?.last_name}`}
                    </p>
                    {orderData?.status && (
                      // <p className="text-sm">Your order has {orderData?.status}</p>
                      <p className="text-sm">
                        Your order is {orderData?.status} and payment is done
                        through {orderData?.payment_gateway_title}
                      </p>
                    )}
                  </div>
                </div>

                <div className="py-4 border-b border-[#ADADAD] text-sm space-y-2 lg:space-y-4">
                  <p className="">
                    Your order number is{" "}
                    {/* <strong className="text-base">#323243</strong>{" "} */}
                    {/* <strong className="text-base">#{orderData?.order_id}</strong>{" "} */}
                    <strong className="text-base">#{orderData?.id}</strong>{" "}
                  </p>
                  {/* <p className="">
                    Your Expected Date of Delivery is{" "}
                    <strong>5 Sep 2023</strong>{" "}
                  </p> */}
                  {orderData?.date_created && (
                    <p className="">
                      Order placed on{" "}
                      <strong>
                        {new Date(orderData.date_created).toLocaleString(
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
                      </strong>
                    </p>
                  )}
                  {/* {orderData?.payment_gateway_title && (
                    <p className="">
                      Your payment is done through{" "}
                      <strong className="uppercase">
                        {orderData?.payment_gateway_title}
                      </strong>
                      .
                    </p>
                  )} */}
                </div>

                <div className="py-4 text-sm">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="lg:w-8/12">
                    {orderData?.shipping_address?.address_1}, <br />
                    {orderData?.shipping_address?.address_2},{" "}
                    {orderData?.shipping_address?.city} -{" "}
                    {orderData?.shipping_address?.postcode}, <br />
                    {orderData?.shipping_address?.state.toUpperCase()},{" "}
                    {orderData?.shipping_address?.country.toUpperCase()}
                  </p>
                  <p>
                    Mobile/WhatsApp :-{" "}
                    {/* TODO: country ext missing in the API */}
                    <a href={`tel:${orderData?.shipping_address?.phone}`}>
                      {orderData?.billing?.country_ext}
                      {orderData?.shipping_address?.phone}
                    </a>
                  </p>

                  {/* TODO: Where to go */}
                  <h3 className="font-semibold mt-4">
                    Please, Write your Review{" "}
                  </h3>
                </div>
                <div className="mt-2 flex items-center">
                  <Link href={"https://g.co/kgs/uj1oNLU"} className="mr-4">
                    <Image
                      src={`/assets/icons/google-icon.svg`}
                      width={24}
                      height={24}
                      alt="google Icon"
                    />
                  </Link>
                  <Link
                    href={"https://g.co/kgs/uj1oNLU"}
                    className="border-l border-[#D6D6D6] pl-4"
                  >
                    <Image
                      src={`/assets/icons/tripadvisor-icon.svg`}
                      width={24}
                      height={24}
                      alt="tripad Icon"
                    />
                  </Link>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="bg-[#FAFAFA] p-4 border border-[#EBEBEB] rounded-md mt-6 lg:mt-0">
                  <h3 className="font-semibold text-lg border-b border-[#D6D6D6] pb-2">
                    Order Summary
                  </h3>

                  {orderData &&
                    orderData?.items?.map((item, i) => {
                      return (
                        <div className="pt-5 flex gap-3 text-sm" key={i}>
                          <Image
                            src={item?.images[0]?.src}
                            width={60}
                            height={80}
                            alt={item?.name}
                            className="object-cover rounded-md aspect-[60/80] max-w-[60px] h-fit"
                          />
                          <div className="flex-1">
                            <p className="font-medium mb-2 lg:w-9/12">
                              {item?.name}
                            </p>
                            <p>Qty: {item?.quantity}</p>
                          </div>
                          <strong className="text-base">
                            {formatCurrency(
                              item?.quantity * item?.prices.price,
                              orderData?.totals
                            )}
                          </strong>
                        </div>
                      );
                    })}

                  <div className="flex justify-between items-center text-sm my-3">
                    <span>Subtotal</span>
                    <span>
                      {formatCurrency(
                        parseFloat(orderData?.totals?.subtotal / 100),
                        orderData?.totals
                      )}
                    </span>
                  </div>

                  {orderData?.totals?.total_discount > 0 && (
                    <div className="flex justify-between items-center text-sm mb-3">
                      <span>Discount</span>
                      <span className="text-green-600">
                        -
                        {formatCurrency(
                          parseFloat(orderData?.totals?.total_discount / 100),
                          orderData?.totals
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm">
                    <span>Shipping</span>
                    <span>
                      {formatCurrency(
                        parseFloat(orderData?.totals?.total_shipping / 100),
                        orderData?.totals
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-3 text-primary">
                    <strong>Total</strong>
                    <strong>
                      {formatCurrency(
                        parseFloat(orderData?.totals?.total_price / 100),
                        orderData?.totals
                      )}
                    </strong>
                  </div>

                  {/* <div className="flex justify-between items-center text-sm font-medium text-primary mt-3">
                    <span>Total</span>
                    <span>
                      {formatCurrency(
                        parseFloat(orderData?.totals?.total_price / 100),
                        orderData?.totals
                      )}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* <div className="flex gap-6 items-center justify-center flex-wrap mt-6">
              <p>Secure Pay using</p>
              <Image
                width={174}
                height={26}
                src="/secure-payment.png"
                alt="Payment image"
              />
            </div> */}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-full text-center py-24">
          <Image
            src={"/empty-cart.svg"}
            width={230}
            height={130}
            alt="Empty Cart"
          />

          <h3 className="text-xl font-medium mt-7 mb-2">
            Please buy something
          </h3>

          <p className="text-[#808080]">
            Looks like you haven&apos;t made your choice yet..
          </p>

          <Link
            href={`/`}
            className="bg-primary text-white px-8 py-3 rounded hover:bg-primary-hover transition-all mt-10"
          >
            Back to homepage
          </Link>
        </div>
      )}

      <Confetti ref={confettiRef} />
    </>
  );
}
