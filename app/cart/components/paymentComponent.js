'use client'
import { useRouter } from 'next/navigation'

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Cookies from 'js-cookie';
import Confetti from "./confetti";

import { useSelector, useDispatch } from "react-redux";

import { cartDetails, resetCart, cartChangesPreloader } from '../store/slices/cartSlice';
import { userDataToken, userDetails } from '../store/slices/userSlice';
import Skeleton from 'react-loading-skeleton';


const PaymentComponent = () => {
    const router = useRouter();
    // console.log('router', router)
    const dispatch = useDispatch();
    const cartData = useSelector(cartDetails);
    const userData = useSelector(userDetails);
    const cartPreloader = useSelector(cartChangesPreloader);
    const userToken = useSelector(userDataToken);

    const cookieWCHash = Cookies.get('woocommerce_cart_hash');
    const cookieCartToken = Cookies.get('cart-token');

    const hasFetched = useRef(false);
    const [paymentMethodData, setPaymentMethodData] = useState([]);
    const [activePaymentMethod, setActivePaymentMethod] = useState('');
    const [placeORderError, setPlaceORderError] = useState('');
    const [ctaPreloader, setCtaPreloader] = useState(false);
    
    // Call Confetti
    const confettiRef = useRef();

    const fetchPaymentMode = async () => {
  
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/payment_gateways`;
        const credentials = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`),
          }
        };
  
        try {
          const response = await fetch(url ,credentials);
          const data = await response.json();
          
          setPaymentMethodData(data);
          
          if (data.length > 0) {
            setActivePaymentMethod(data[0].id);
          }
        
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
    };
  
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchPaymentMode();
        }
    }, []);

    const updatePaymentMethod = (methodId) => {
        setActivePaymentMethod(methodId);
    };

    // Place Order
    const placeOrder = async (paymentMethod) => {

        setPlaceORderError('');

        if(!paymentMethod.length){
            setError("Payment method required.");
            return 
        }

        setCtaPreloader(true);

        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/v1/checkout`;
        const credentials = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cart-Token': cookieWCHash ?? cookieCartToken ?? '',
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
            body: JSON.stringify({
                "billing_address": cartData.billing_address,
                "payment_method": paymentMethod,
                // "customer": userData.id ?? '',
            })
        };

        try {
            const response = await fetch(url ,credentials);
            const data = await response.json();
            
            // setLoading(false);
            if(!response.ok){
                setPlaceORderError(data.message);
                
                throw new Error("Failed to place an order!");
            }
            
            // Validate `data` before pushing to router
            if (!data.order_id || !data.order_key || !data.billing_address.email) {
                throw new Error('Missing order details in data object.');
            }

            //navigate to thanks page after delay
            // window.setTimeout(() => {
            //     // console.log('Navigating with data:', data);
            //     router.push(`/thanks?id=${data.order_id}&orderKey=${data.order_key}&email=${data.billing_address.email}`);
            // }, 1500);
            
            // confettiRef.current.triggerConfettiFromParent();

            if(data?.payment_method === 'razorpay'){
                router.push(`/checkout/razorpay/${data.order_id}/?key=${data.order_key}&email=${data.billing_address.email}`);
            }

            // Payment COD
            if(data?.payment_method === 'cod'){
                router.push(`/thanks?id=${data.order_id}&orderKey=${data.order_key}&email=${data.billing_address.email}`);
            }

            // Reset Cart Token & Redux States
            // dispatch(resetCart());
            // Cookies.remove('woocommerce_cart_hash');
            // Cookies.remove('cart-token');

        } catch (error) {
            console.error("Error placing order:", error);
            setLoading(false);
        } finally{
            setCtaPreloader(false);
        }
    }

    const confettiSuccess = () => {
        // console.log("Confetti animation complete!");

        // window.setTimeout(() => {
        //     router.push(/thanks');
        // }, 1500);
    };

    if(paymentMethodData.length <= 0){
        return (
            <div className="flex gap-6">
                <div className="flex flex-col max-w-[290px] w-full border-r border-[#e6e6e6]">
                    <Skeleton width={`80%`} height={24}/>
                    <Skeleton width={`80%`} height={24}/>
                    <Skeleton width={`80%`} height={24}/>
                    <Skeleton width={`80%`} height={24}/>
                    <Skeleton width={`80%`} height={24}/>
                </div>

                {/* Payment Description */}
                <div className="flex flex-col max-w-[470px] w-full">
                    <Skeleton width={`100%`} height={200}/>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex gap-6">
                <div className="flex flex-col max-w-[290px] w-full border-r border-[#e6e6e6]">
                    {paymentMethodData &&
                        paymentMethodData
                            .filter((method) => method.enabled)
                            .map((method) => (
                                <button key={`paymentKey-${method.id}`} className={`text-left w-full py-3 pr-3 font-medium border-r-4 
                                    ${method.id === activePaymentMethod ? 'border-primary text-primary bg-primary-gradient' : 'border-transparent'}`}
                                    onClick={() => updatePaymentMethod(method.id)} >
                                    {method.method_title}
                                </button>
                            ))
                    }
                </div>

                {/* Payment Description */}
                <div className="flex flex-col max-w-[470px] w-full">
                    {paymentMethodData &&
                        paymentMethodData
                            .filter((method) => method.enabled)
                            .map((method) => (
                                method.id === activePaymentMethod && (
                                    <div key={`selectedPaymentKey-${method.id}`} className="paymentMethodDetails p-5 border border-[#e6e6e6] rounded-lg">
                                        <div className="paymentMethodDetailsContent flex flex-col pb-10">
                                            <h4 className="text-lg text-black font-medium mb-1">{method.method_title}</h4>
                                            {
                                                method.method_description && 
                                                <p className="text-sm text-[grey]">
                                                    {method.method_description}
                                                </p>
                                            }
                                        </div>

                                        <button className="relative w-full transition-all bg-primary hover:bg-primary-hover text-white text-base py-3 px-5 rounded-md disabled:opacity-50"
                                            disabled={ctaPreloader || cartPreloader}
                                            onClick={() => { placeOrder(method.id)
                                                }}>

                                                {
                                                    !ctaPreloader && !cartPreloader ? (
                                                        'Place order'
                                                    ) : (
                                                        <div className="text-center flex items-center justify-center">
                                                            <span className="loader inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                        </div>
                                                    )
                                                }
                                        </button>

                                        <Confetti ref={confettiRef} onSuccess={confettiSuccess}/>

                                        {
                                            placeORderError &&
                                            <span className="text-sm text-red-600 inline-block mt-2">
                                                { placeORderError }
                                            </span> 
                                        }
                                    </div>
                                )
                            ))
                    }
                </div>
            </div>
        </>
    );
}

PaymentComponent.displayName = 'Payment Component';
export default PaymentComponent;