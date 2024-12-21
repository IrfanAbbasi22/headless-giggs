'use client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { userDetails, userDataToken } from '@/app/cart/store/slices/userSlice';

import { RazorPay } from '../../../cart/components/payment/razorPay';

import Link from 'next/link';
import { formatCurrency } from '@/app/components/lib/user/formatCurrency';
import Skeleton from 'react-loading-skeleton';

function Page() {
  const userData = useSelector(userDetails);
  const userToken = useSelector(userDataToken);
  // const router = useRouter(); // Access the router
  // const { order_id, key } = router.query;
  const [orderId, setOrderId] = useState(null);
  const [orderKey, setOrderKey] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [pageLoader, setPageLoader] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [orderDataPreloader, setOrderDataPreloader] = useState(false);

  const fetchOrderDetails = async (id, userToken) => {
    setOrderDataPreloader(true);
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/v1/order/${id}`;
    
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
      setOrderDataPreloader(false);
      return data;
    } catch (error) {
      console.error("Error fetching order details:", error);
      return null;
    }
  }

  const { createRazorPayOrder, openRazorpayModal, verifyRazorPayment } = RazorPay(setPageLoader);

  useEffect(() => {
    // Extract order_id from the URL path
    const pathSegments = window.location.pathname.split('/');
    const extractedOrderId = pathSegments[pathSegments.length - 1];

    // Extract key from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const extractedKey = urlParams.get("key");
    const extractedEmail = urlParams.get("email");

    // Set the extracted values to state
    setOrderId(extractedOrderId);
    setOrderKey(extractedKey);
    setUserMail(extractedEmail);

    console.log('Extracted Order ID:', extractedOrderId);
    console.log('Extracted Key:', extractedKey);

  }, []);

  useEffect(() => {
    if (orderId !== null) {
      fetchOrderDetails(orderId, userToken)
        .then((data) => {
          if (data) {
            setOrderData(data);
            initPayment();
            console.log('Order Details orderData:', data);
          } else {
            console.log("Failed to fetch order details.");
          }
        })
        .catch((error) => {
          console.log("Error fetching order details:", error);
        })
        .finally(() => {
          // setLoading(false);
        });

    }
  }, [orderId]);

  const initPayment = async () => {
    setPageLoader(true);
    const razorpayResponse = await createRazorPayOrder(orderId, {
      userToken,
      userId: userData?.id,
    });

    // return

    const orderData = {
      email: userMail,
      order_id: orderId,
      order_key: orderKey,
    }
    openRazorpayModal(orderData, razorpayResponse);
    setPageLoader(false);
  }

  useEffect(()=>{
    if(orderId !== null){
      // initPayment();
    }

  }, [orderId])

  
  return (
    <>
      {
        pageLoader &&
        <div className="fixed z-50 left-0 right-0 top-0 bottom-0 w-full bg-opacity-30 bg-black flex items-end lg:items-center">
            <div
            className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center"
            role="status"
            >
            <svg
                aria-hidden="true"
                className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-primary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
                />
                <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
            </div>
        </div>
      }
      <div className="text-center py-10">

        <div className="container mb-10">
          <div className="grid grid-cols-4 text-center">
            <div className="w-full font-bold flex flex-col items-center border-r border-black">
              <span className="text-xs uppercase font-normal">Order Number</span>
                {
                  orderDataPreloader ? (
                    <div className='w-full'>
                      <Skeleton width={`80%`} height={24}/>
                    </div>
                  ) : (
                    `#${orderData?.id}`
                  )
                }
            </div>
            <div className="w-full font-bold flex flex-col items-center border-r border-black">
              <span className="text-xs uppercase font-normal">Date</span>
                {
                  orderDataPreloader ? (
                    <div className='w-full'>
                      <Skeleton width={`80%`} height={24}/>
                    </div>
                  ) : (
                    orderData?.id
                  )
                }
            </div>
            <div className="w-full font-bold flex flex-col items-center border-r border-black">
              <span className="text-xs uppercase font-normal">Total</span>
                {
                  orderDataPreloader ? (
                    <div className='w-full'>
                      <Skeleton width={`80%`} height={24}/>
                    </div>
                  ) : (
                    orderData?.totals?.total_price && 
                    formatCurrency(orderData?.totals?.total_price, orderData?.totals)
                    
                  )
                }
            </div>
            <div className="w-full font-bold flex flex-col items-center">
              <span className="text-xs uppercase font-normal">Payment Method</span>
                {
                  orderDataPreloader ? (
                    <div className='w-full'>
                      <Skeleton width={`80%`} height={24}/>
                    </div>
                  ) : (
                    orderData?.payment_method_title
                  )
                }
                50512
            </div>
          </div>

        </div>
        
        <p>
          Thank you for your order, please click the button below to pay with Razorpay.
        </p>

        <div className="btn-wrapper mt-10 flex justify-center flex-wrap gap-6 items-center">
          <button onClick={initPayment}
             className="relative w-full max-w-max transition-all bg-primary hover:bg-primary-hover text-white text-base py-3 px-5 rounded-md">
                Pay Now
          </button>

          <Link href={`/cart`} className={`relative w-full max-w-max transition-all bg-black hover:bg-primary-hover text-white text-base py-3 px-5 rounded-md`} >
            Cancel
          </Link>
        </div>
      </div>
    </>
  )
}

export default Page