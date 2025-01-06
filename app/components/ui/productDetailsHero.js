'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import PdpTimer from "@/app/components/ui/PdpTimer";
import SwiperSlider from "@/app/components/ui/swiperSlider";
import { formatCurrency } from '../lib/user/formatCurrency';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, loadCartFromWoo, cartDetails } from '@/app/cart/store/slices/cartSlice';
import { addToCartAPI } from '../lib/cart/addToCart';
import { toast, Bounce } from 'react-toastify';

export default function ProductDetailsHero({productDetailsdata}){
  const router = useRouter();
  const dispatch = useDispatch();
  const cartDetailsData = useSelector(cartDetails);

  // Variation Management
  const processedVariationData = productDetailsdata?.nwe_available_variations?.map((item) => {
    const attributes = Object.keys(item.attributes).reduce((acc, key) => {
      acc[key] = item.attributes[key];
      return acc;
    }, {});
  
    return {
      ...attributes,
      display_price: item.display_price,
      display_regular_price: item.display_regular_price,
      max_qty: item.max_qty || "",
      min_qty: item.min_qty || 1,
      variation_id: item.variation_id,
      is_in_stock: item.is_in_stock,
    };
  });
  
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [variationSelections, setVariationSelections] = useState({});
  const [variationExistError, setVariationExistError] = useState("");

  // Reset Variations
  const resetSelections = () => {
    setVariationSelections({});
    setSelectedVariation(null);
    setVariationExistError("");
  };

  // Change Variation on selected attributes
  const handleVariationChange = (variationId) => {
    const variation = productDetailsdata.nwe_available_variations.find(
      (v) => v.variation_id === parseInt(variationId)
    );
    setSelectedVariation(variation);

    // Ensure quantity sync if already in the cart
    const cartItem = cartDetailsData.items.find((item) => item.id === variationId);
    setQuantity(cartItem ? cartItem.quantity : 1);
  };
  
  // Check variation exist or not of the selected attributes
  const checkVariationExist = (variationSlug, selectedOption) => { 
    const curOption = selectedOption
      .toLowerCase()
      .replace(/\s+/g, '-');
  
    const attributeKey = `attribute_${variationSlug}`;
    const updatedSelections = { ...variationSelections, [attributeKey]: curOption };
    setVariationSelections(updatedSelections);
    
    // Check if all attributes have been selected
    const requiredAttributes = productDetailsdata?.attributes.map(attr => `attribute_${attr.slug.toLowerCase()}`);
    const allAttributesSelected = requiredAttributes.every(attr => updatedSelections[attr]);

    // console.log('requiredAttributes', requiredAttributes);
    // console.log('allAttributesSelected', allAttributesSelected);
    // console.log('updatedSelections', updatedSelections);
    if (!allAttributesSelected) {
      setVariationExistError("");
      return;
    }

    // Filter variations based on updatedSelections, checking each attribute
    const result = processedVariationData.filter((variation) => {
      return Object.keys(updatedSelections).every((key) => {
        // console.log('Checking', key, variation[key]?.toLowerCase(), updatedSelections[key]);
        return variation[key]?.toLowerCase() === updatedSelections[key];
      });
    });

    
    if(result.length === 1){
      handleVariationChange(result[0].variation_id);
      setVariationExistError("");
    }else{
      setVariationExistError("This variation doesn't exist!");
    }
  };
  // Variation Management

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) =>
      productDetailsdata.type === "variable"
        ? item.id === selectedVariation?.variation_id
        : item.id === productDetailsdata.id
    )
  );

  const isAdded = Boolean(cartItem);

  // QTY management
  const [quantity, setQuantity] = useState(isAdded ? cartItem.quantity : 1);
  const classOpt = "flex items-center justify-center size-10 lg:size-12 text-xs lg:text-base text-center";
  const svgClasses = "max-w-3 h-auto";
  // QTY management

  // console.log('cartItem', cartItem);

  const [loading, setLoading] = useState(false);
  const handleAddToCart = async (quantity = 1) => {
    // console.log("Current cart state:", isAdded);
    setLoading(true);
  
    try {
      let productID = productDetailsdata.id;
      let itemKey = isAdded ? cartItem?.key : null;
  
      // Check if quantity remains unchanged
      if (isAdded && cartItem?.quantity === quantity) {
        setLoading(false);
        toast.info(`Quantity is already set to ${quantity}.`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }

      
      // Handle variable product selection
      if (productDetailsdata.type === "variable" && selectedVariation?.variation_id) {
        productID = selectedVariation.variation_id;
      }

      // API call to add/update cart
      const res = await addToCartAPI(
        productID,
        quantity,
        Boolean(itemKey),
        itemKey
      );
  
      // Dispatch actions to update the state
      dispatch(addToCart(productDetailsdata));
      dispatch(loadCartFromWoo(res));
  
      // Show success toast
      const successMessage = itemKey
        ? `Quantity updated to ${quantity}.`
        : `${productDetailsdata.name} added to cart.`;
  
      toast.success(successMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      toast.error("Failed to update the cart. Please try again.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const [buyLoader, setBuyLoader] = useState(false);
  const handleBuyNow = async (quantity = 1) => {
    setBuyLoader(true);
  
    try {
      let productID = productDetailsdata.id;
  
      // Handle variable product selection
      if (productDetailsdata.type === "variable" && selectedVariation?.variation_id) {
        productID = selectedVariation.variation_id;
      }
  
      // API call to add/update cart
      const res = await addToCartAPI(
        productID,
        quantity
      );
  
      // Dispatch actions to update the state
      dispatch(addToCart(productDetailsdata));
      dispatch(loadCartFromWoo(res));
  
      router.push(`/cart`);
    } catch (error) {
      console.error("Failed to buy product:", error);
    } finally {
      setBuyLoader(false);
    }
  };
    

  const [showFixedElement, setShowFixedElement] = useState(false);
  const checkoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;

      if (isMobile) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setShowFixedElement(!entry.isIntersecting); // Show fixed element when not in view
          },
          {
            root: null, // Observe within the viewport
            threshold: 0, // Trigger when even a small part is visible
          }
        );

        if (checkoutRef.current) {
          observer.observe(checkoutRef.current);
        }

        return () => {
          if (checkoutRef.current) {
            observer.unobserve(checkoutRef.current);
          }
        };
      } else {
        setShowFixedElement(false); // Hide fixed element for larger screens
      }
    };

    // Initial check and listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <section className="py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-6 md:gap-12">
            <div className="col-span-12 md:col-span-6">
              {
                productDetailsdata?.images?.length > 0  ? (
                    <SwiperSlider images={productDetailsdata.images} variationImage={selectedVariation?.image?.full_src} />
                ) : (
                    <Image className={`aspect-[608/480] object-cover object-center rounded-2xl w-full`}
                        src={`/woocommerce-placeholder.webp`} 
                        width={608} 
                        height={480} 
                        alt={`Product image`}
                    />
                )
              }
              
            </div>

            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-col">
                <div className="grid grid-cols-4">
                  <div className="col-span-3 cats flex felx-wrap gap-2">
                    {productDetailsdata.categories &&
                      productDetailsdata.categories.map((item, index) => (
                        <Link
                          href={`/product-category/${item.slug}`}
                          key={`catKey-${item.slug}`}
                          className={`text-sm text-primary hover:text-primary-hover transition-colors`}
                        >
                          {item.name}
                          {index < productDetailsdata.categories.length - 1
                            ? ", "
                            : ""}
                        </Link>
                      ))}
                  </div>
                  <div className="star flex items-center gap-2 justify-end md:hidden">
                    <span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_234_570)">
                          <path
                            d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                            fill="#FF9D00"
                            stroke="#FF9D00"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_234_570">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span>4.9</span>
                  </div>
                </div>

                <h1
                  className={`text-lg md:text-3xl lg:text-[44px] lg:leading-[50px] font-semibold md:mt-3`}
                >
                  {productDetailsdata.name}
                </h1>

                {
                  productDetailsdata?.short_description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetailsdata?.short_description,
                      }}
                      className={`text-sm text-black text-opacity-50 mt-2 `}
                    />
                  )
                }

                <div className="hidden md:flex items-center gap-2 flex-row flex-wrap text-[14px] text-raisinBlack mt-5">
                  <span className="flex">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <span className="inline-block relative after:content-['•'] after:text-raisinBlack after:absolute after:right-[-1rem] mr-[1rem]">
                    (4.9 Stars)
                  </span>

                  <span className="">425 Reviews</span>
                </div>

                {/* variants price */}
                <div className="flex items-center gap-1 font-semibold mt-5">
                    {productDetailsdata.type === "variable" ? (
                        <div className="pr-1">
                            {
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: productDetailsdata?.price_html,
                                }}
                                className={`text-lg lg:text-2xl `}
                              />
                            }

                            {
                              Object.keys(variationSelections).length > 0 && (
                                <div className='mt-2'>
                                  {selectedVariation?.display_price && (
                                  <span className="lg:text-lg pr-2">
                                      {formatCurrency(
                                      selectedVariation.display_price,
                                      cartDetailsData?.totals
                                      )}
                                  </span>
                                  )}

                                  {selectedVariation?.display_regular_price &&
                                  selectedVariation?.display_price !==
                                      selectedVariation?.display_regular_price && (
                                      <del className="lg:text-lg text-black opacity-50">
                                      {formatCurrency(
                                          selectedVariation?.display_regular_price,
                                          cartDetailsData?.totals
                                      )}
                                      </del>
                                  )}
                                  
                                  {selectedVariation?.display_regular_price !== selectedVariation?.display_price && (
                                    <span className="pl-2 discount text-primary text-sm font-medium">
                                      (
                                        {(
                                          ((selectedVariation?.display_regular_price -
                                              selectedVariation?.display_price) /
                                              selectedVariation?.display_regular_price) *
                                          100
                                          ).toFixed()
                                        }
                                        % OFF
                                      )
                                    </span>
                                  )}
                                </div>
                              )
                            }
                        </div>
                        ) : (
                        <div className="text-lg lg:text-2xl">

                            {productDetailsdata.price && (
                            <span className="pr-2">
                                {formatCurrency(productDetailsdata.price, cartDetailsData?.totals)}
                            </span>
                            )}
                            {productDetailsdata.regular_price && productDetailsdata.regular_price !== productDetailsdata.price  && (
                            <del className="text-black opacity-50">
                                {formatCurrency(
                                productDetailsdata.regular_price,
                                cartDetailsData?.totals
                                )}
                            </del>
                            )}

                            {productDetailsdata.regular_price !== productDetailsdata.price && (
                              <span className="pl-2 discount text-primary text-base font-medium">
                                (
                                {(
                                  ((productDetailsdata.regular_price - productDetailsdata.price) /
                                  productDetailsdata.regular_price) *
                                  100
                                ).toFixed(0)}
                                % OFF)
                              </span>
                            )}
                        </div>
                    )}
                </div>

                {/* TODO: need to dynamic the delivery */}
                <p className="flex font-medium text-xs lg:text-[14px] gap-1 items-center text-primary mt-3">
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src={`/assets/icons/delivery.svg`}
                      alt="Delivery icon"
                    />
                  </span>
                  <span>Delivery in 90 mins</span>
                </p>

                {/* selecting attr like weight, size  */}
                {productDetailsdata?.attributes && productDetailsdata?.attributes.length > 0 && typeof processedVariationData === "object" && Object.keys(processedVariationData).length > 0 && (
                  <>
                    {productDetailsdata.attributes.map((variation) => (
                      <div key={`varKey-${variation.name}${variation.id}`} className="text-black mt-[18px]">
                        <p>{variation.name}</p>
                        <fieldset className="flex gap-3 text-sm mt-3">
                          {variation.options.map((variationOpt) => (
                            <label
                              key={variationOpt.toLowerCase().replace(/\s+/g, '-')}
                              className="cursor-pointer"
                              htmlFor={`variation-${variation.id}-${variationOpt.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <input
                                type="radio"
                                id={`variation-${variation.id}-${variationOpt.toLowerCase().replace(/\s+/g, '-')}`}
                                name={`variationName-${variation.name}${variation.id}`}
                                value={variationOpt}
                                onChange={() => {checkVariationExist(variation.slug?.toLowerCase(), variationOpt)}}
                                className="peer hidden"
                                checked={variationSelections[`attribute_${variation.slug?.toLowerCase()}`] === variationOpt.toLowerCase().replace(/\s+/g, '-')}
                              />

                              <span className="inline-block peer-checked:bg-primary peer-checked:text-white px-2 py-[6px] rounded-md border">
                                {variationOpt}
                              </span>
                            </label>
                          ))}
                        </fieldset>
                      </div>
                    ))}
                  </>
                )}

                {
                  variationExistError && (
                    <span className='text-red-600 mt-4 text-sm'>
                      {variationExistError}
                    </span>
                  )
                }

                {
                  Object.keys(variationSelections).length > 0  && (
                    
                    <button className={`bg-red-600 text-white max-w-max px-2 py-[6px] leading-none rounded-md mt-5`} onClick={resetSelections}>
                      Clear
                    </button>
                  )
                }

                {/* timer  */}
                <PdpTimer />

                {/* Checkout buttons */}
                <div ref={checkoutRef} className="mt-6 flex gap-[14px] flex-row flex-wrap">
                  <div className="h-max flex border border-[#DADADA66] bg-[#F8F8F7] rounded-lg overflow-hidden">
                    <button className={`${classOpt} hover:bg-[#e1e1e1] disabled:cursor-not-allowed`} 
                      disabled={quantity == 1 || 
                        loading || productDetailsdata.stock_status != "instock"
                      }
                      onClick={()=>setQuantity(quantity - 1)}>
                      <svg className={`${svgClasses}`} xmlns="http://www.w3.org/2000/svg" width="18" height="3" viewBox="0 0 18 3" fill="none">
                        <path d="M17 1.5H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <input
                      type="number"
                      readOnly
                      value={quantity}
                      className={`disabled:opacity-50 ${classOpt} [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none outline-none`}
                    />
                    <button className={`${classOpt} hover:bg-[#e1e1e1]`} onClick={()=>setQuantity(quantity + 1)}
                      disabled={
                        (productDetailsdata.type === "variable" ? selectedVariation == null : "") || variationExistError || 
                        loading || productDetailsdata.stock_status != "instock"
                      }>
                      <svg className={`${svgClasses}`} xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                        <path d="M9 1.5V17.5M17 9.5H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  <button className={`relative border text-xs lg:text-base  rounded-[10px] flex-1 px-3 py-2 lg:px-4 hover:bg-primary hover:text-white transition-all hover:border-primary
                      ${loading ? "bg-primary border-primary" : "border-raisinBlack"} disabled:opacity-50`}
                      onClick={() => handleAddToCart(quantity)}
                      disabled={
                        (productDetailsdata.type === "variable" ? selectedVariation == null : "") || variationExistError || 
                        loading || buyLoader || productDetailsdata.stock_status != "instock"
                      }
                    >

                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mx-auto text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      isAdded ? "Update Quantity" : "Add to Cart"
                    )}
                  </button>

                  {
                    isAdded ? (
                      <Link href={`/cart`} className="text-center rounded-[10px] text-xs lg:text-base w-full px-3 py-3 lg:px-4 bg-primary hover:bg-primary-hover text-white transition-all">
                        Go to cart
                      </Link>
                    ) : (


                      <button className={`text-center rounded-[10px] text-xs lg:text-base w-full px-3 py-3 lg:px-4 bg-primary hover:bg-primary-hover text-white transition-all
                        ${buyLoader ? "bg-primary border-primary" : "border-raisinBlack"} disabled:opacity-50`}
                        onClick={() => handleBuyNow(quantity)}
                        disabled={
                          (productDetailsdata.type === "variable" ? selectedVariation == null : "") || variationExistError || 
                          buyLoader || loading || productDetailsdata.stock_status != "instock"
                        }
                      >
                      {buyLoader ? (
                        <svg
                          className="animate-spin h-6 w-6 mx-auto text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Buy Now"
                      )}

                      </button>
                    )
                  }
                </div>
              </div>

              {/* position fixed part */}
              <div className={`fixed w-full bottom-0 left-0 bg-secondary p-5 z-50 
                grid grid-cols-2 gap-2 md:hidden transition-all ${showFixedElement ? "translate-y-0" : "translate-y-full"}`} >
                <div className="">
                  {/* <p className="text-xs">Total Price</p> */}

                  <div className="productCardPricing mt-2">
                    {productDetailsdata.type === "variable" ? (
                        <div className="flex flex-col">
                          <div className="flex items-center">
                              {selectedVariation?.display_price && (
                              <span className="text-base font-semibold pr-1 ">
                                  {formatCurrency(
                                  selectedVariation.display_price,
                                  cartDetailsData?.totals
                                  )}
                              </span>
                              )}
  
                              {productDetailsdata.regular_price !== productDetailsdata.price && (
                                <span className="text-primary text-xs font-medium">
                                  (
                                    {(
                                      ((selectedVariation?.display_regular_price -
                                          selectedVariation?.display_price) /
                                          selectedVariation?.display_regular_price) *
                                      100
                                      ).toFixed()
                                    }
                                    % OFF
                                  )
                                </span>
                              )}
                          </div>
  
                          {selectedVariation?.display_regular_price &&
                            selectedVariation?.display_price !==
                                selectedVariation?.display_regular_price && (
                                <del className="text-xs text-black opacity-50">
                                {formatCurrency(
                                    selectedVariation?.display_regular_price,
                                    cartDetailsData?.totals
                                )}
                                </del>
                          )}
                        </div>
                        ) : (
                          <>
                            <div className='flex flex-col'>
                              <div className="flex items-center">
                                  {productDetailsdata.price && (
                                    <span className="text-base font-semibold pr-1 ">
                                        {formatCurrency(productDetailsdata.price, cartDetailsData?.totals)}
                                    </span>
                                  )}
                                  {productDetailsdata.regular_price !== productDetailsdata.price && (
                                    <span className="text-primary text-xs font-medium">
                                      (
                                      {(
                                        ((productDetailsdata.regular_price - productDetailsdata.price) /
                                        productDetailsdata.regular_price) *
                                        100
                                      ).toFixed(0)}
                                      % OFF)
                                    </span>
                                  )}
                              </div>

                              {productDetailsdata.regular_price && (
                              <del className="text-xs text-black opacity-50">
                                  {formatCurrency(
                                  productDetailsdata.regular_price,
                                  cartDetailsData?.totals
                                  )}
                              </del>
                              )}
                            </div>

                          </>
                    )}
                  </div>

                  {/* <p className="text-xs mt-2">
                    MRP:{" "}
                    {productDetailsdata.on_sale &&
                      productDetailsdata.regular_price && (
                        <del className="originalPrice font-medium">
                          ₹{productDetailsdata.regular_price}
                        </del>
                      )}{" "}
                    (incl. of all taxes)
                  </p> */}
                </div>

                <div className="flex items-end flex-col">
                  {
                    isAdded ? (
                      <Link href={`/cart`} className="min-w-32 text-white text-sm rounded-[10px] py-[12px] px-4 flex items-center justify-center gap-2 h-fit w-fit bg-[#FF5D58] hover:bg-[#f13832] transition-all">
                        Go to cart
                      </Link>
                    ) : (
                      <>
                        <button
                          className={`min-w-32 text-white text-sm rounded-[10px] py-[12px] px-4 flex items-center gap-2 h-fit w-fit bg-[#FF5D58] hover:bg-[#f13832] ${
                            loading || buyLoader || productDetailsdata.stock_status !== "instock"
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          } disabled:opacity-50`}
                          onClick={() => handleAddToCart(quantity)}
                          disabled={
                            (productDetailsdata.type === "variable" ? selectedVariation == null : "") || variationExistError || 
                            loading || buyLoader || productDetailsdata.stock_status !== "instock"
                          }
                        >
                          {loading ? (
                            <svg
                              className="animate-spin h-5 w-5 mx-auto text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-auto"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                              </svg>
                              Add to Cart
                            </>
                          )}
                        </button>
                      </>

                    )
                  }

                  <p className=" font-medium text-xs gap-1 flex items-center text-primary mt-2">
                    <span>
                      <Image
                        width={16}
                        height={16}
                        src={`/assets/icons/delivery.svg`}
                        alt="Delivery icon"
                      />
                    </span>
                    <span>Delivery in 90 mins</span>
                  </p>
                </div>
              </div>
              {/* position fixed part end */}
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}