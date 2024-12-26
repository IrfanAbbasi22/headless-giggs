import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { isCouponAppliedData, couponApplied, cartDetails } from '../../store/slices/cartSlice';
import Confetti from "../confetti";
import { formatCurrency } from "@/app/components/lib/user/formatCurrency";

export default function AppliedDiscountModal() {
    const dispatch = useDispatch();
    const cartData = useSelector(cartDetails);
    const appliedCouponData = useSelector(isCouponAppliedData);

    const confettiRef = useRef();
    // console.log('cartData.coupons', cartData?.coupons[0]);
    
    useEffect(()=>{
        if(appliedCouponData === true){
            confettiRef.current.triggerConfettiFromParent();
        }
    }, [appliedCouponData]);
    
    return (
        <>
            {
                appliedCouponData && (
                    <div id="default-modal"
                        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-[#00000080]"
                    >
                    <div className="relative p-6 rounded-lg w-full max-w-md max-h-full bg-white text-center flex flex-col gap-4">
                        <h5 className="text-xl flex items-center gap-2 justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[1rem] w-full h-auto">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.0167 2.74015L14.8893 2.79164L13.1203 3.59164C12.4748 3.88255 11.7384 3.909 11.0765 3.67098L10.8803 3.59164L9.11027 2.79164C8.81027 2.65164 8.48027 2.65164 8.18027 2.77164C7.91455 2.88307 7.70688 3.07531 7.58432 3.31689L7.53027 3.44164L6.84927 5.26164C6.59352 5.93081 6.08484 6.47393 5.43955 6.76778L5.26027 6.84164L3.45027 7.52164C3.13927 7.64164 2.90027 7.87164 2.77027 8.18164C2.66741 8.43878 2.65271 8.71797 2.73878 8.98141L2.79027 9.11164L3.59027 10.8816C3.89277 11.5325 3.91797 12.2757 3.66589 12.942L3.59027 13.1216L2.79027 14.8816C2.65027 15.1816 2.65027 15.5116 2.77027 15.8216C2.88169 16.0788 3.0732 16.2845 3.3215 16.4136L3.45027 16.4716L5.26027 17.1516C5.9386 17.4083 6.47409 17.9087 6.77352 18.5603L6.84927 18.7416L7.53027 20.5516C7.63927 20.8616 7.88027 21.1016 8.18027 21.2216C8.32027 21.2816 8.48027 21.3116 8.63027 21.3116C8.75027 21.3116 8.87589 21.2948 8.9987 21.2568L9.12027 21.2116L10.8803 20.4116C11.5311 20.1091 12.2744 20.0839 12.9406 20.336L13.1203 20.4116L14.8893 21.2116C15.1903 21.3416 15.5203 21.3516 15.8203 21.2216C16.086 21.1188 16.2929 20.9278 16.4159 20.6801L16.4703 20.5516L17.1503 18.7416C17.4069 18.0633 17.9157 17.5194 18.561 17.2255L18.7403 17.1516L20.5503 16.4716C20.8603 16.3516 21.0993 16.1216 21.2303 15.8216C21.3323 15.5559 21.3468 15.2755 21.2614 15.0119L21.2103 14.8816L20.4103 13.1216C20.1194 12.4762 20.0929 11.7398 20.3309 11.0778L20.4103 10.8816L21.2103 9.11164C21.3493 8.81164 21.3493 8.48164 21.2303 8.18164C21.118 7.91593 20.9263 7.70899 20.6787 7.57972L20.5503 7.52164L18.7403 6.84164C18.0711 6.59414 17.528 6.08615 17.2264 5.44092L17.1503 5.26164L16.4703 3.44164C16.3603 3.14164 16.1303 2.90164 15.8203 2.77164C15.5631 2.66878 15.2766 2.65409 15.0167 2.74015ZM16.4299 14.7516C16.4299 13.8216 15.6799 13.0616 14.7499 13.0616C13.8199 13.0616 13.0699 13.8216 13.0699 14.7516C13.0699 15.6816 13.8199 16.4316 14.7499 16.4316C15.6799 16.4316 16.4299 15.6816 16.4299 14.7516ZM15.2101 7.72159C15.0701 7.61159 14.9101 7.56159 14.7501 7.56159C14.5201 7.56159 14.2901 7.67159 14.1401 7.87159L8.6401 15.2016C8.5101 15.3716 8.4601 15.5716 8.4901 15.7716C8.5201 15.9816 8.6301 16.1516 8.7901 16.2816C9.1201 16.5216 9.6201 16.4516 9.8601 16.1216L15.3601 8.79159C15.6201 8.45159 15.5501 7.97159 15.2101 7.72159ZM10.9299 9.25159C10.9299 8.32159 10.1799 7.56159 9.2499 7.56159C8.3199 7.56159 7.5699 8.32159 7.5699 9.25159C7.5699 10.1816 8.3199 10.9316 9.2499 10.9316C10.1799 10.9316 10.9299 10.1816 10.9299 9.25159Z" fill="#17B31B"></path><path fillRule="evenodd" clipRule="evenodd" d="M17.8393 2.73944C17.5575 2.11859 17.0418 1.61747 16.4103 1.35164C15.7203 1.07164 14.9303 1.08164 14.2503 1.39164L12.4503 2.21164L12.3195 2.25566C12.0539 2.32878 11.7674 2.31164 11.5103 2.19164L9.75027 1.39164L9.53164 1.30524C9.23763 1.20284 8.93427 1.15164 8.63027 1.15164C8.28027 1.15164 7.92027 1.22164 7.59027 1.35164C6.90027 1.64164 6.34927 2.21164 6.09027 2.91164L5.41027 4.72164L5.35929 4.83824C5.22667 5.10211 5.00027 5.30664 4.72027 5.41164L2.91027 6.09164L2.73805 6.1626C2.11713 6.44428 1.61602 6.95914 1.36027 7.59164C1.07027 8.28164 1.08027 9.07164 1.38927 9.75164L2.20027 11.5116L2.25169 11.6472C2.33741 11.9233 2.32027 12.2245 2.20027 12.4816L1.38927 14.2516L1.31241 14.4397C1.08093 15.0745 1.09663 15.7844 1.36027 16.4116C1.63927 17.1016 2.21027 17.6416 2.91027 17.9116L4.72027 18.5916L4.83687 18.6426C5.10073 18.7751 5.30527 19.0004 5.41027 19.2716L6.09027 21.0916L6.16101 21.2636C6.44206 21.8831 6.95777 22.3758 7.59027 22.6416C8.28027 22.9316 9.07027 22.9116 9.75027 22.6016L11.5103 21.8016L11.6459 21.7502C11.9221 21.6645 12.2246 21.6816 12.4903 21.8016L14.2503 22.6016L14.4383 22.679C15.0731 22.9127 15.783 22.9053 16.4103 22.6416C17.0993 22.3516 17.6503 21.7916 17.9103 21.0916L18.5903 19.2716L18.6412 19.1583C18.7739 18.9012 19.0003 18.6966 19.2803 18.5916L21.0903 17.9016L21.2625 17.8309C21.8832 17.5506 22.3835 17.0441 22.6393 16.4116C22.9303 15.7216 22.9103 14.9316 22.6103 14.2516L21.8003 12.4816L21.7488 12.3466C21.6631 12.0725 21.6803 11.7774 21.8003 11.5116L22.6103 9.75164L22.6874 9.56136C22.9196 8.92057 22.9038 8.21891 22.6393 7.59164C22.3603 6.90164 21.7903 6.35164 21.0903 6.09164L19.2803 5.41164L19.1637 5.36066C18.8998 5.22805 18.6953 5.00164 18.5903 4.72164L17.9103 2.91164L17.8393 2.73944ZM14.8893 2.79164L15.0167 2.74015C15.2766 2.65409 15.5631 2.66878 15.8203 2.77164C16.1303 2.90164 16.3603 3.14164 16.4703 3.44164L17.1503 5.26164L17.2264 5.44092C17.528 6.08615 18.0711 6.59414 18.7403 6.84164L20.5503 7.52164L20.6787 7.57972C20.9263 7.70899 21.118 7.91593 21.2303 8.18164C21.3493 8.48164 21.3493 8.81164 21.2103 9.11164L20.4103 10.8816L20.3309 11.0778C20.0929 11.7398 20.1194 12.4762 20.4103 13.1216L21.2103 14.8816L21.2614 15.0119C21.3468 15.2755 21.3323 15.5559 21.2303 15.8216C21.0993 16.1216 20.8603 16.3516 20.5503 16.4716L18.7403 17.1516L18.561 17.2255C17.9157 17.5194 17.4069 18.0633 17.1503 18.7416L16.4703 20.5516L16.4159 20.6801C16.2929 20.9278 16.086 21.1188 15.8203 21.2216C15.5203 21.3516 15.1903 21.3416 14.8893 21.2116L13.1203 20.4116L12.9406 20.336C12.2744 20.0839 11.5311 20.1091 10.8803 20.4116L9.12027 21.2116L8.9987 21.2568C8.87589 21.2948 8.75027 21.3116 8.63027 21.3116C8.48027 21.3116 8.32027 21.2816 8.18027 21.2216C7.88027 21.1016 7.63927 20.8616 7.53027 20.5516L6.84927 18.7416L6.77352 18.5603C6.47409 17.9087 5.9386 17.4083 5.26027 17.1516L3.45027 16.4716L3.3215 16.4136C3.0732 16.2845 2.88169 16.0788 2.77027 15.8216C2.65027 15.5116 2.65027 15.1816 2.79027 14.8816L3.59027 13.1216L3.66589 12.942C3.91797 12.2757 3.89277 11.5325 3.59027 10.8816L2.79027 9.11164L2.73878 8.98141C2.65271 8.71797 2.66741 8.43878 2.77027 8.18164C2.90027 7.87164 3.13927 7.64164 3.45027 7.52164L5.26027 6.84164L5.43955 6.76778C6.08484 6.47393 6.59352 5.93081 6.84927 5.26164L7.53027 3.44164L7.58432 3.31689C7.70688 3.07531 7.91455 2.88307 8.18027 2.77164C8.48027 2.65164 8.81027 2.65164 9.11027 2.79164L10.8803 3.59164L11.0765 3.67098C11.7384 3.909 12.4748 3.88255 13.1203 3.59164L14.8893 2.79164Z" fill="#17B31B">
                                </path>
                            </svg>
                            You saved
                        </h5>
            
                        <h1 className="text-[56px] font-semibold leading-tight">
                            {formatCurrency(cartData?.coupons[0].totals.total_discount, cartData?.totals)}
                        </h1>
            
                        <p className="text-sm">
                            With the coupon <strong className="uppercase">{ cartData?.coupons[0].code }</strong>
                        </p>

                        <div className="h-[2px] w-12 bg-[#1a181e] mx-auto"></div>
            
                        <button className="bg-primary font-medium text-base py-3 px-5 text-white max-h-max mx-auto rounded-md hover:bg-primary-hover transition-all" 
                            onClick={() => {dispatch(couponApplied(false))}}>
                            Awesome!
                        </button>

                        <Confetti ref={confettiRef}/>
                    </div>
                    </div>
                )
            }
        </>
    );
};