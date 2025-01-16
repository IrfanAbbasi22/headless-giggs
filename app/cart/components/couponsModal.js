"use client";
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Cookies from 'js-cookie';


// Redux
import { useSelector, useDispatch } from 'react-redux';
import { cartDetails, toggleChangesPreloader, loadCartFromWoo, couponApplied } from '../store/slices/cartSlice';
import { formatCurrency } from "@/app/components/lib/user/formatCurrency";
import { fetchedCoupons, isCouponModalVisibleOnScreen, setFetchedCoupons, toggleIsCouponModalVisible } from "../store/slices/nonPersistSlice";

const CouponsModal = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const cartData = useSelector(cartDetails);
    const cookieCartToken = Cookies.get('cart-token');
    // const hasFetched = useRef(false);
    // const [couponsData, setCouponsData] = useState([]);
    const couponsData = useSelector(fetchedCoupons);

    const [couponCode, setCouponCode] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState('');
    const [couponApplyPreloader, setCouponApplyPreloader] = useState(false);
    const [couponErrors, setCouponErrors] = useState({});
    const [applyPreloader, setApplyPreloader] = useState(false);
    const [removePreloader, setRemovePreloader] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const isModalOpen = useSelector(isCouponModalVisibleOnScreen);

    // Toggle function to show or hide the collapsable content
    const toggleCollapse = () => {
        setIsDetailsOpen((prevState) => !prevState); // Toggle the state
    };


    const closeModal = () => {
        dispatch(toggleIsCouponModalVisible(false));
        document.body.classList.remove('overflow-hidden');
    };

    // Apply Coupon
    const applyCoupon = async (code) => {    
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/v1/cart/apply-coupon`;
        const credentials = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cart-Token": cookieCartToken,
            },
            body: JSON.stringify({
                "code": code,
            }),
        };

        setCouponApplyPreloader((prev) => ({ ...prev, [code]: true }));
        dispatch(toggleChangesPreloader(true));
        try {   
            const response = await fetch(url ,credentials);

            if (!response.ok) {
                const errorData = await response.json();

                setCouponErrors((prevErrors) => ({
                    ...prevErrors,
                    [code]: errorData.message,
                }));

                return errorData;
                throw new Error("Failed to apply the coupon!");
            }
            
            const data = await response.json();
            
            dispatch(loadCartFromWoo(data));
            dispatch(couponApplied(true));
            closeModal();

            setCouponErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[code];
                return updatedErrors;
            });
  
        } catch (error) {
          console.error("Error while applying the coupon:", error);
        } finally{
            dispatch(toggleChangesPreloader(false));
            setApplyPreloader(false);
            setCouponApplyPreloader((prev) => {
                const updatedPreloader = { ...prev };
                delete updatedPreloader[code];
                return updatedPreloader;
            });
        }
    };

    const handleSubmitCoupon = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        setApplyPreloader(true);
        setInputErrorMessage('');

        const result = await applyCoupon(couponCode);

        if (result !== undefined && result !== null) {
            if (result?.data?.status !== 200) {
                setInputErrorMessage(result?.message);
            }
        } else {
            setCouponCode('');
        }
    }

    const removeCoupon = async (code) => {    
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/v1/cart/remove-coupon`;
        const credentials = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cart-Token": cookieCartToken,
            },
            body: JSON.stringify({
                "code": code,
            }),
        };

        setCouponApplyPreloader((prev) => ({ ...prev, [code]: true }));
        setRemovePreloader(true);
        dispatch(toggleChangesPreloader(true));
  
        try {   
            const response = await fetch(url ,credentials);

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error("Failed to remove the coupon!");
            }
            
            const data = await response.json();
            
            // console.log('remove Coupon', data)
            
            dispatch(loadCartFromWoo(data));
            closeModal();
  
        } catch (error) {
          console.error("Error while applying the coupon:", error);
        } finally{
            dispatch(toggleChangesPreloader(false));
            setRemovePreloader(false);

            setCouponApplyPreloader((prev) => {
                const updatedPreloader = { ...prev };
                delete updatedPreloader[code];
                return updatedPreloader;
            });
        }
    };

    return (
        <>
            {isModalOpen && (
                <div
                    id="default-modal"
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-[#00000080]"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow max-w-[450px] mx-auto">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Coupons and offers
                                </h3>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-4 md:p-5 space-y-4">
                                <form className="mb-8" onSubmit={(e) => (handleSubmitCoupon(e))}>
                                    <div className="form-group relative">
                                        <input
                                            className={`uppercase w-full py-[10px] pl-4 pr-[70px] border border-[#d9d9d9] rounded-md outline-none transition-all focus:border-primary`}
                                            type="text"
                                            name="applyCoupon"
                                            id="applyCoupon"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Enter coupon code"
                                        />

                                        {!applyPreloader ? (
                                            <button type="submit" className="absolute top-2/4 right-4 middle -translate-y-1/2 text-primary disabled:opacity-50 font-medium" 
                                                disabled={!couponCode}>Apply</button>
                                        ) : (
                                            <div
                                                className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-end pr-4"
                                                role="status"
                                                >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
                                        )}
                                    </div>

                                    {inputErrorMessage && (
                                        <p className="mt-1 text-sm font-medium text-[#e50b20]"
                                            dangerouslySetInnerHTML={{ __html: inputErrorMessage }}
                                        />
                                    )}
                                    
                                </form>

                                <div className="flex flex-col">
                                    {
                                        couponsData && 

                                        <>
                                            <h4 className="text-base text-black font-semibold">
                                                Available coupons
                                            </h4>
        
                                            <div className="w-16 h-1 bg-primary mt-2 mb-5"></div>
                                            
                                            {
                                                couponsData.map((coupon, index) => (
                                                    <div key={`couponKey-${coupon.code}`} className="couponCard flex flex-col gap-3 pb-4 border-b border-[#e6e6e6] mb-4">
                                                        <div className="flex justify-between items-center">
                                                            <div className="overflow-hidden">
                                                                <div className="couponCodeWrap uppercase text-black font-medium py-0.5 px-3 border border-primary bg-[#EE741F1A] leading-5 relative rounded-sm">
                                                                    {coupon.code}
            
                                                                    <div className="circle absolute top-2/4 -left-[6px] -translate-y-1/2 bg-white rounded-full aspect-square w-3 h-3 border border-primary"></div>
                                                                    <div className="circle absolute top-2/4 -right-[6px] -translate-y-1/2 bg-white rounded-full aspect-square w-3 h-3 border border-primary"></div>
                                                                </div>
                                                            </div>
            
            
                                                            <div className="relative min-w-12">
                                                                {
                                                                    // cartData.coupons.length > 0 && (
                                                                        coupon.code !== cartData?.coupons[0]?.code ? (
                                                                            couponApplyPreloader[coupon.code] ? (
                                                                                <div className="text-center flex items-center justify-center">
                                                                                    <span className="loader inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                                                                                </div>
                                                                            ) : (
                                                                                <button
                                                                                    className="text-primary uppercase text-sm font-medium disabled:opacity-50"
                                                                                    onClick={() => applyCoupon(coupon.code)}
                                                                                    disabled={
                                                                                        parseFloat(cartData.totals.total_price) < parseFloat(coupon.minimum_amount)
                                                                                    }
                                                                                >
                                                                                    Apply
                                                                                </button>
                                                                            )
                                                                        ) : (
                                                                            couponApplyPreloader[coupon.code] ? (
                                                                                <div className="text-center flex items-center justify-center">
                                                                                    <span className="loader inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                                                                                </div>
                                                                            ) : (
                                                                                <button
                                                                                    className="text-primary uppercase text-sm font-medium disabled:opacity-50"
                                                                                    onClick={() => removeCoupon(coupon.code)}
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            )
                                                                        )
                                                                    // )
                                                                }
            
                                                            </div>
                                                        </div>
                                                        
                                                        {
                                                            parseFloat(coupon.minimum_amount) && 
                                                            parseFloat(cartData.totals.total_price) < parseFloat(coupon.minimum_amount) ? (
                                                                <p className="text-sm font-medium text-[#e50b20]">
                                                                    Add items worth {formatCurrency(coupon.minimum_amount - cartData.totals.total_price, cartData.totals)} more to get this offer
                                                                </p>
                                                            ) : null
                                                        }
            
                                                        {/* Show error message if there's an error for this coupon */}
                                                        {couponErrors[coupon.code] && (
                                                            <p className="text-sm font-medium text-[#e50b20]">
                                                                {couponErrors[coupon.code]}
                                                            </p>
                                                        )}
            
            
                                                        {coupon.description && 
                                                            <p className="text-sm font-medium text-black">
                                                                {coupon.description}
                                                            </p>
                                                        }
            
                                                        {/* <div className="collapsable">
                                                            <p  onClick={toggleCollapse}
                                                                className="text-sm font-medium text-black inline-flex items-end leading-none cursor-pointer">
                                                                Details
            
                                                                <svg width="18" height="18" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><g fill="currentColor" fillRule="nonzero"><g><g><g><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" transform="translate(-1248 -147) translate(1191 142) translate(16 3) translate(41 2)"></path></g></g></g></g></g></svg>
                                                            </p>
            
                                                            {
                                                                isDetailsOpen &&
                                                                
                                                                <div className="collapsable-content text-xs text-[#808080]">
                                                                    <ul className="list-disc pl-5 flex flex-col gap-1 mt-2">
                                                                        <li>
                                                                            Applicable on both online payment and COD
                                                                        </li>
                    
                                                                        <li>
                                                                            Applicable only once per user
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </div> */}
                                                    </div>
                                                ))
                                            }
                                        </>
                                    }

                                    {
                                        !couponsData &&
                                        <h4 className="text-base text-center text-primary font-semibold">
                                            No coupons available!
                                        </h4>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

CouponsModal.displayName = 'Coupons Modal';
export default CouponsModal;