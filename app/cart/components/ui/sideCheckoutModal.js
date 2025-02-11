import React from "react";
import { RxCross2 } from "react-icons/rx";
import { selectedTotalItems } from "../../store/slices/cartSlice";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  cartDetails,
  selectedCartItems,
  cartChangesPreloader,
  recomendedProducts,
} from "../../store/slices/cartSlice";
import {
  currentSelectedStep,
  setCurrentStep,
} from "../../store/slices/cartStepsSlice";
import { showUserModal, isUserLoggedIn } from "../../store/slices/userSlice";

// UI Components
import DotPulsePreloader from "../../../components/ui/preloader/dotPulsePreloader";
import CartProductCard from "../../components/ui/cartProductCard";
import ShippingAddress from "../../components/shippingAddress";
import PaymentComponent from "../../components/paymentComponent";
import CouponsModule from "../../components/couponsModule";
import AppliedDiscountModal from "../../components/ui/appliedDiscountModal";
import GetAddress from "../ui/address/getAddress";
import SwiperProducts from "../../../components/ui/swiperProducts";
import SecurePayment from "../../components/ui/securePayment";
import { useShippingPrice } from "../../components/shippingPrice";
import { formatCurrency } from "../../../components/lib/user/formatCurrency";
import { useRouter } from "next/navigation";
import { showSideCart } from "../../store/slices/sideCartSlice";
import CouponsModal from "../couponsModal";
import SaveNewAddressForm from "./address/saveNewAddressForm";
// import SaveNewAddress from "./address/saveNewAddress";
const SideCheckoutModal = () => {
  const router = useRouter();
  const cartRecomendedProducts = useSelector(recomendedProducts);
  const cartItems = useSelector(selectedCartItems);
  const cartData = useSelector(cartDetails);
  const currentStep = useSelector(currentSelectedStep);
  const userLoggedInStatus = useSelector(isUserLoggedIn);
  const totalItems = useSelector(selectedTotalItems);
  const { updateShippingRates } = useShippingPrice();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const modalRef = useRef(null);

  // UI Related
  const [loading, setLoading] = useState(false);
  const [continuePreloader, setContinuePreloader] = useState(false);
  const changesPreloader = useSelector(cartChangesPreloader);

  // console.log('cartdata', cartData);

  // Managing Prices Discounts
  const cartItemsTotalPrice =
    Array.isArray(cartItems) && cartItems.length > 0
      ? cartItems.reduce(
          (total, item) => total + item.prices.regular_price * item.quantity,
          0
        )
      : 0;
  const cartItemsPrice = parseInt(cartData?.totals?.total_items ?? 0, 10);

  const getPercentageOff = (regularPrice, salePrice) => {
    const discountPrice = regularPrice - salePrice;
    return ((discountPrice / regularPrice) * 100).toFixed();
  };

  // Address Form Handling
  const shippingFormRef = useRef();
  const handleFormSubmit = () => {
    setContinuePreloader(true);
    shippingFormRef.current.submitForm();
  };

  const handleSuccess = (data) => {
    // console.log("Success function called in parent!", data);
    dispatch(setCurrentStep("payment"));
    setContinuePreloader(false);
  };

  const handleAddressFail = (data) => {
    // console.log("Failed function called in parent!", data);
    setContinuePreloader(false);
  };
  // Address Form Handling

  const handleShippingRate = async (e) => {
    const id = e.target.value;
    await updateShippingRates(id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setIsVisible(true); // Show modal when component mounts
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(showSideCart(false));
    }, 300); // Match this duration with the transition duration
  };

  // Disable background scroll
  useEffect(() => {
    // Disable scrolling when modal opens
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = "auto";
    };
  }, []);
  if (loading) {
    return (
      <div className="container mx-auto text-center">Loading Cart Data...</div>
    );
  }
  
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
        <div className={`relative w-full max-w-[450px] h-full bg-white ml-auto transition-transform duration-300 transform ${isVisible ? "translate-x-0" : "translate-x-full"}`}>
          <div
            ref={modalRef}
            id="sideCartElem"
            className={`ml-auto overflow-y-auto shadow-xl transition-transform duration-300 transform ${
              isVisible ? "translate-x-0" : "translate-x-full"
            } w-full max-w-[450px] h-full bg-white`}
          >
            <div className="flex flex-col">
              <div className=" sticky top-0 w-full z-40 lg:max-w-[450px]">
                <div className="flex items-center justify-between  bg-white py-2  px-3">
                  <div className="font-semibold">
                    {totalItems > 0 && (
                      <>
                        Your items ({totalItems} { totalItems > 1 ? "items" : "item"})
                      </>
                    )}
                  </div>

                  <div onClick={closeModal}>
                    <RxCross2 className=" text-2xl lg:text-3xl text-[#767676] cursor-pointer" />
                  </div>
                </div>

                {cartItemsTotalPrice !== cartItemsPrice && (
                    <div className={`bg-primary  text-center py-3 text-sm ${changesPreloader ? "text-primary" : "text-white"}`}>
                      You save <span className={`leading-none text-base font-medium `}>
                        {`${getPercentageOff(cartItemsTotalPrice, cartItemsPrice)}% `}
                      </span> on this order
                    </div>
                  )}
              </div>

              <div className=" mb-20 lg:mb-0">
                <div className="flex flex-col pt-2 lg:pt-4 ">
                  {cartItems?.length > 0 ? (
                    <div className="flex flex-col items-center w-full gap-4">
                      {/* Cart Data */}
                      {currentStep === "cart" && (
                        <div className="container">
                          {/* Cart Data */}
                          <div className="flex justify-between items-center w-full text-sm mb-4">
                            <span className="text-sm">
                              {cartData.items_count && (
                                <>
                                  {cartData.items_count} { cartData.items_count > 1 ? "items" : "item"}
                                </>
                              )}
                            </span>

                            {cartData.totals.total_price && (
                              <span className="font-medium">
                                Total{" "}
                                {formatCurrency(
                                  cartData.totals.total_price,
                                  cartData.totals
                                )}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 w-full ">
                            <div className="flex flex-col gap-4">
                              {cartItems && cartItems && cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                  <CartProductCard
                                    product={item}
                                    key={`cartItem${item.key}`}
                                  />
                                ))
                              ) : (
                                <div>Your cart is empty.</div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Shipping Form */}
                      {currentStep === "shipping" && (
                        <div className="container">
                          <div className="flex-1 w-full">
                            {/* Address Heading */}
                            <div className="flex justify-between items-center mb-5">
                              <span className="text-xl font-medium">
                                {!userLoggedInStatus
                                  ? "Shipping address"
                                  : "Select a delivery address"}
                              </span>

                              {!userLoggedInStatus && (
                                <>
                                  <button
                                    onClick={() => {
                                      dispatch(showUserModal(true));
                                    }}
                                    className="border border-primary text-primary transition-all px-3 py-1 text-sm font-medium hover:bg-opacity-10 rounded-md hover:bg-primary"
                                  >
                                    Already a user? Sign in
                                  </button>
                                </>
                              )}
                            </div>

                            {!userLoggedInStatus ? (
                              <>
                                {/* Form */}
                                <ShippingAddress
                                  ref={shippingFormRef}
                                  onSuccess={handleSuccess}
                                  onFailure={handleAddressFail}
                                />
                              </>
                            ) : (
                              <>
                                <GetAddress />
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Recomended Products */}
                      {cartRecomendedProducts.length > 0 && currentStep === "cart" && (
                        <div className="w-full">
                          {/* Recomended Products */}
                          <SwiperProducts
                            compClasses={`SwiperProductsFromSideCart mt-2`}
                            heading={`Recomended Products`}
                            products={cartRecomendedProducts}
                            sliderPerRow={2}
                            hideArrows={true}
                          />
                        </div>
                      )}

                      <div className="container">
                        <div className="cartSidebar border border-[#e6e6e6] rounded-lg mb-3">
                          <CouponsModule />
                        </div>

                        <div id="priceCol" className="cartSidebar border border-[#e6e6e6] rounded-lg">
                          <div className="flex flex-col gap-2 p-5">
                            <p className="text-sm flex gap-4 justify-between items-center">
                              Item total
                              <span>
                                {cartItemsTotalPrice !== cartItemsPrice && (
                                  <del className="text-[grey] mr-1">
                                    {formatCurrency(
                                      cartItemsTotalPrice,
                                      cartData.totals
                                    )}
                                  </del>
                                )}

                                {formatCurrency(cartItemsPrice, cartData.totals)}
                              </span>
                            </p>

                            {cartData.totals.total_discount > 0 && (
                              <div className="cartSidebar-delivery flex flex-col">
                                <p className="text-sm flex gap-4 justify-between items-center mb-1">
                                  Discount (
                                  {cartData?.coupons[0].code.toUpperCase()})
                                  <span className="text-[#17b31b] font-medium text-sm">
                                    -
                                    {formatCurrency(
                                      cartData.totals.total_discount,
                                      cartData.totals
                                    )}
                                  </span>
                                </p>
                              </div>
                            )}

                            {cartData?.billing_address?.postcode?.length > 0 && (
                              <div className="cartSidebar-delivery flex flex-col">
                                <p className="text-sm flex gap-4 justify-between items-center ">
                                  Delivery fee
                                  <span>
                                    {/* TODO: Need Discussion - how to show discount on delivery if it has */}
                                    {/* <del className="text-[grey] mr-1">{formatCurrency(99, cartData.totals)}</del> */}
                                    {cartData.totals.total_shipping === "0" ? (
                                      <span className="text-[#17b31b] font-medium text-sm">
                                        FREE
                                      </span>
                                    ) : (
                                      `${formatCurrency(
                                        cartData.totals.total_shipping,
                                        cartData.totals
                                      )}`
                                    )}
                                  </span>
                                </p>
                                {/* TODO: Need Discussion - how to show free delivery note */}
                                <small className="text-xs text-[grey]">
                                  Free delivery on item total above{" "}
                                  <span className="text-black font-medium">
                                    {formatCurrency(1000, cartData.totals)}
                                  </span>
                                </small>
                              </div>
                            )}

                            {/* shipping rates */}
                            {cartData?.billing_address?.postcode?.length > 0 && (
                              <div className="cartSidebar-delivery flex flex-col">
                                <p className="text-sm flex flex-col gap-2 ">
                                  <label htmlFor="shippingRate">
                                    Select shipping
                                  </label>
                                  {cartData.shipping_rates[0].shipping_rates
                                    ?.length > 0 && (
                                    <span className="flex gap-3 flex-wrap">
                                      {cartData.shipping_rates[0].shipping_rates.map(
                                        (item, index) => (
                                          <span
                                            className="flex items-center gap-1"
                                            key={`shippingOpt${item.rate_id}${index}`}
                                          >
                                            <input
                                              type="radio"
                                              id={`shippingRate${item.rate_id}`}
                                              name="shipping_rate"
                                              value={item.rate_id}
                                              className="accent-primary"
                                              disabled={changesPreloader}
                                              checked={item.selected}
                                              onChange={(e) =>
                                                handleShippingRate(e)
                                              }
                                            />
                                            <label
                                              htmlFor={`shippingRate${item.rate_id}`}
                                              className="text-xs"
                                            >
                                              {item.name} -{" "}
                                              {formatCurrency(
                                                item.price,
                                                cartData.totals
                                              )}
                                            </label>
                                          </span>
                                        )
                                      )}
                                    </span>
                                  )}
                                </p>
                              </div>
                            )}

                            {/* Total */}
                            <div className="grand-total flex flex-col border-dashed border-t border-b border-[#e5e7eb] py-4 ">
                              {cartData.totals.total_price && (
                                <h4 className="text-base font-medium flex gap-4 justify-between items-center">
                                  Grand total
                                  <span>
                                    {formatCurrency(
                                      cartData.totals.total_price,
                                      cartData.totals
                                    )}
                                  </span>
                                </h4>
                              )}

                              <small className="inline-block text-sm text-[grey]">
                                Inclusive of all taxes
                              </small>
                            </div>

                            {/* Delivery Time */}
                            <div className="grand-total flex flex-col gap-4">
                              <small className="inline-block text-sm text-[grey]">
                                Average delivery time:
                                <span className="text-black font-medium">
                                  {" "}
                                  2-5 days
                                </span>
                              </small>

                              {
                                // Discount
                                cartItemsTotalPrice !== cartItemsPrice && (
                                  <div className="relative sideCartSavings flex flex-col text-[#17b31b] text-center py-2 px-6 rounded bg-[#17B31B1A]">
                                    <span
                                      className={`text-sm ${
                                        changesPreloader ? "opacity-0" : ""
                                      }`}
                                    >
                                      {`${getPercentageOff(
                                        cartItemsTotalPrice,
                                        cartItemsPrice
                                      )}% `}
                                      (
                                      {formatCurrency(
                                        cartItemsTotalPrice - cartItemsPrice,
                                        cartData.totals
                                      )}
                                      ) saved so far on this order
                                    </span>
                                    {/* Need Discussion - how to show discount on delivery if it has */}
                                    <span
                                      className={`text-xs ${
                                        changesPreloader ? "opacity-0" : ""
                                      }`}
                                    >
                                      Save {formatCurrency(49, cartData.totals)} on
                                      delivery fee by adding{" "}
                                      {formatCurrency(701, cartData.totals)} more to
                                      cart
                                    </span>

                                    {changesPreloader && (
                                      // Preloader
                                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <DotPulsePreloader color={"#17b31b"} />
                                      </div>
                                    )}
                                  </div>
                                )
                              }
                            </div>
                          </div>

                          {/* <div className="cartSidebar-action p-2 border-t border-[#e5e7eb]">
                            <button
                              onClick={() => {
                                dispatch(setCurrentStep("shipping"));
                                router.push("/cart");
                              }}
                              className="w-full transition-all bg-primary hover:bg-primary-hover text-white text-base py-3 px-5 rounded-md"
                            >
                              Continue
                            </button>
                          </div> */}
                        </div>
                      </div>

                      {/* Applied Coupon Modal */}
                      <AppliedDiscountModal />

                      {/* Payment Module */}
                      {currentStep === "payment" && (
                        <div className="container">
                          <div className="flex-1 w-full">
                            {/* Payment Heading */}
                            <div className="flex justify-between items-center mb-5">
                              <span className="text-xl font-medium">
                                Choose payment mode
                              </span>
                            </div>

                            <PaymentComponent />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center w-full text-center py-24">
                      <Image
                        src={"/empty-cart.svg"}
                        width={230}
                        height={130}
                        alt="Empty Cart"
                      />

                      <h3 className="text-xl font-medium mt-7 mb-2">
                        Your cart is empty
                      </h3>

                      <p className="text-[#808080]">
                        Looks like you haven&apos;t made your choice yet..
                      </p>
                      <Link
                        href={`/shop`}
                        onClick={() => dispatch(showSideCart(false))}
                        className="bg-primary text-white px-8 py-3 rounded hover:bg-primary-hover transition-all mt-10"
                      >
                        Keep shopping
                      </Link>
                    </div>
                  )}
                </div>

                {/* Secure Payment Stripe */}
                {cartItems?.length > 0 && 
                  <div className="mb-2">
                    <SecurePayment />
                  </div>
                }
              </div>
            </div>

            {
              cartItems?.length > 0 &&
              <>
                {/* Continue Sticky CTA */}
                <div className="p-4 flex justify-between gap-6 bg-white z-10 shadow-[0_0_.5rem_0_rgba(0,0,0,0.2)] sticky bottom-0">
                      <div className="flex flex-col">
                        <div className="text-xl font-medium">
                          {formatCurrency(
                            cartData.totals.total_price,
                            cartData.totals
                          )}
                        </div>

                        <Link 
                          href="#priceCol" 
                          className="whitespace-nowrap text-sm text-primary-hover font-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            const container = document.querySelector('#sideCartElem'); // Replace with your container selector
                            const target = document.getElementById("priceCol");
                            if (container && target) {
                              const containerTop = container.getBoundingClientRect().top;
                              const targetTop = target.getBoundingClientRect().top;
                              const offset = 100; // Adjust this value for spacing
                        
                              // Calculate scroll position relative to the container
                              const scrollPosition = targetTop - containerTop + container.scrollTop - offset;
                        
                              // Scroll the container
                              container.scrollTo({
                                top: scrollPosition,
                                behavior: "smooth",
                              });
                            }
                          }}

                          >View price details</Link>
                      </div>
                      {/* <button
                        onClick={() => {
                          dispatch(setCurrentStep("shipping"));
                          router.push("/cart");
                        }}
                        className="w-full transition-all bg-primary hover:bg-primary-hover text-white text-base py-3 px-5 rounded-md"
                      >
                        Continue
                      </button> */}

                      {currentStep !== "payment" && (
                        <>
                          {changesPreloader || continuePreloader ? (
                            <button
                              disabled
                              className="relative w-full transition-all bg-primary text-white text-base py-3 px-5 rounded-md
                                disabled:opacity-50"
                            >
                              &nbsp;
                              <div
                                className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center"
                                role="status"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
                            </button>
                          ) : (
                            <button
                              className="w-full transition-all bg-primary hover:bg-primary-hover text-white text-base py-3 px-5 rounded-md"
                              onClick={() => {
                                if (currentStep === "cart") {
                                  dispatch(setCurrentStep("shipping"));
                                } else if (currentStep === "shipping") {
                                  if (!userLoggedInStatus) {
                                    handleFormSubmit();
                                  } else {
                                    dispatch(setCurrentStep("payment"));
                                  }
                                }

                                const scrollableElement = document.querySelector('#sideCartElem'); 
                                scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                            >
                              Continue
                            </button>
                          )}
                        </>
                      )}
                </div>
              </>
            }
          </div>

          {/* <SaveNewAddress /> */}
          <SaveNewAddressForm childElemClass={`!max-h-[100%]`} elemClass={`!items-end !max-w-[450px] ml-auto`}/>
          <div className="max-w-[450px]">

          </div>
        </div>
      </div>

      {/* Coupon */}
      <CouponsModal/>

    </>
  );
};

export default SideCheckoutModal;
