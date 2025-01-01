"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

// Functionalities
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  loadCartFromWoo,
  cartDetails,
} from "../../cart/store/slices/cartSlice";
import { openModal } from "../../cart/store/slices/productDetailModalSlice";
import { fetchProductDetails } from "../lib/cart/fetchProductDetails";
import { fetchWooCommerceCart } from "../lib/cart/fetchAndSyncCart";
import { addToCartAPI } from "../lib/cart/addToCart";
import { removeItemFromCart } from "../lib/cart/removeItemFromCart";
import { formatCurrency } from "../lib/user/formatCurrency";
import { toast, Bounce } from 'react-toastify';

export default function ProductCard({ product, gridClass }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Variation Management
  const [selectedVariation, setSelectedVariation] = useState(null);
  const handleVariationChange = (variationId) => {
    const variation = product.nwe_available_variations.find(
      (v) => v.variation_id === parseInt(variationId)
    );
    setSelectedVariation(variation);
  };

  useEffect(() => {
    if (
      product?.nwe_available_variations &&
      product.nwe_available_variations.length > 0
    ) {
      setSelectedVariation(product.nwe_available_variations[0]);
    }
  }, [product.nwe_available_variations]);
  // Variation Management

  const dispatch = useDispatch();
  const cartDetailsData = useSelector(cartDetails);
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) =>
      product.type === "variable"
        ? item.id === selectedVariation?.variation_id
        : item.id === product.id
    )
  );

  const isAdded = Boolean(cartItem);

  // Add to Cart
  const handleAddToCart = async (quantity = 1) => {
    setLoading(true);

    // If Variable Product
    // if (product.type === "variable") {
    //   const productDetails = await fetchProductDetails(product.id);
    //   console.log("productDetails", productDetails);
    //   if (productDetails) {
    //     dispatch(openModal(productDetails));
    //   }

    //   return;
    // }

    let productID;

    if (product.type === "variable" && selectedVariation?.variation_id) {
      productID = selectedVariation?.variation_id;
    } else {
      productID = product.id;
    }

    try {
      const res = await addToCartAPI(productID, quantity);
      dispatch(addToCart(product));
      dispatch(loadCartFromWoo(res));
      toast.success(`${product.name} added to cart.`, {
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
    } catch (err) {
      setError("Failed to add product to cart.");
    } finally {
      setLoading(false);
    }
  };

  // Qty Change
  const handleQtyChange = async (change) => {
    const newQty = parseInt(cartItem.quantity + change, 10);
    const itemKey = cartItem.key;

    setLoading(true);

    // return;

    // If Variable Product
    if (product.type === "variable") {
      const productDetails = await fetchProductDetails(product.id);
      if (productDetails) {
        dispatch(openModal(productDetails));
      }
    }

    // If Qty is 0
    if (newQty === 0) {
      try {
        await removeItemFromCart(itemKey);

        await fetchWooCommerceCart().then((data) => {
          if (data) {
            dispatch(loadCartFromWoo(data));
          }
        });
      } catch (err) {
        setError("Failed to remove item.");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await addToCartAPI(product.id, newQty, true, itemKey);
        dispatch(loadCartFromWoo(res));
      } catch (err) {
        setError("Failed to update product's qty.");
      } finally {
        setLoading(false);
      }
    }

    // dispatch(updateQty({ id: product.id, qty: newQty }));
  };

  const productImage =
    (product?.images ?? []).length > 0
      ? product.images[0].src
      : "/woocommerce-placeholder.webp";

  return (
    <div
      className={`overflow-hidden flex flex-col gap-2 w-full ${
        gridClass ?? ""
      }`}
    >
      <div className="relative leading-none">
        <Link
          href={`product/${product.slug}`}
          className="w-full overflow-hidden aspect-[246/174] inline-block  rounded-md"
        >
          <Image
            src={productImage}
            alt={product.name}
            width={246}
            height={174}
            className="w-full h-full rounded-md object-cover object-center hover:scale-125 transition-all"
          />
        </Link>

        {product.type === "variable" ? (
          <>
            {product.on_sale &&
              selectedVariation?.display_price !==
                selectedVariation?.display_regular_price && (
                <div className="absolute top-2 md:top-3 left-3 rounded md:rounded-lg bg-[#157101]">
                  <p className="py-1 px-2 md:py-2 md:px-3 font-normal text-[7px] md:text-xs text-white">
                    {(
                      ((selectedVariation?.display_regular_price -
                        selectedVariation?.display_price) /
                        selectedVariation?.display_regular_price) *
                      100
                    ).toFixed()}
                    % OFF
                  </p>
                </div>
              )}
          </>
        ) : (
          product.on_sale &&
          product.regular_price && (
            <div className="absolute top-2 md:top-3 left-3 rounded md:rounded-lg bg-[#157101]">
              <p className="py-1 px-2 md:py-2 md:px-3 font-normal text-[7px] md:text-xs text-white">
                {(
                  ((product.regular_price - product.price) /
                    product.regular_price) *
                  100
                ).toFixed()}
                % OFF
              </p>
            </div>
          )
        )}
      </div>

      <div className=" flex flex-col">
        {product.categories && (
          <p className=" text-[8px] md:text-xs font-normal">
            {product.categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/product-category/${cat.slug}`}
                className="text-black text-opacity-50 hover:text-opacity-100 transition-all"
              >
                {cat.name}
                {i < product.categories.length - 1 ? ", " : ""}
              </Link>
            ))}
          </p>
        )}

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-[6px] mb-1 font-semibold text-base leading-tight truncate hover:text-[#ff5d58] transition-all"
        >
          {product.name}
        </Link>

        {/* Descriptioon */}
        {product.short_description && (
          <p
            className="text-sm text-black text-opacity-50 mb-0 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: product.short_description.replace(/<\/?(p|br)\/?>/g, ""),
            }}
          ></p>
        )}

        <div className="text-sm font-medium flex items-center mt-2 mb-1">
          {product.type === "variable" ? (
            <div className="pr-1">
              {selectedVariation?.display_price && (
                <span className="discountedPrice font-semibold pr-1">
                  {formatCurrency(
                    selectedVariation.display_price,
                    cartDetailsData?.totals
                  )}
                </span>
              )}

              {selectedVariation?.display_regular_price &&
                selectedVariation?.display_price !==
                  selectedVariation?.display_regular_price && (
                  <del className="originalPrice text-sm text-black opacity-50">
                    {formatCurrency(
                      selectedVariation?.display_regular_price,
                      cartDetailsData?.totals
                    )}
                  </del>
                )}
            </div>
          ) : (
            <div className="pr-1">
              {product.price && (
                <span className="discountedPrice font-semibold pr-1">
                  {formatCurrency(product.price, cartDetailsData?.totals)}
                </span>
              )}
              {product.regular_price && (
                <del className="originalPrice text-sm text-black opacity-50">
                  {formatCurrency(
                    product.regular_price,
                    cartDetailsData?.totals
                  )}
                </del>
              )}
            </div>
          )}

          <span className="border-s border-[#2C2929] pl-1">
            {/* Variations Dropdown */}
            {product?.nwe_available_variations &&
              product?.nwe_available_variations?.length > 0 && (
                <select
                  onChange={(e) => handleVariationChange(e.target.value)}
                  className="border rounded px-2 py-1 text-sm w-full"
                >
                  {product.nwe_available_variations.map((variation) => (
                    <option
                      key={`varItemID${variation.variation_id}`}
                      value={variation.variation_id}
                    >
                      {Object.entries(variation.attributes)
                        .map(([key, value]) => `${value}`)
                        .join(", ")}
                    </option>
                  ))}
                </select>
              )}
          </span>
        </div>

        <div className=" flex justify-between items-center   ">
          <p className=" font-medium text-[8px] sm:text-[8px]  md:text-xs gap-1 flex items-center text-[#FF5D58]">
            <span>
              <Image
                width={12}
                height={13}
                src={`/assets/icons/delivery.svg`}
                alt="Delivery icon"
              />
            </span>
            <span>Delivery in 90 mins</span>
          </p>

          {isAdded ? (
            <>
              <div className="relative flex rounded-md bg-black text-white">
                <div
                  className={`flex-1 p-1 min-w-6 md:max-w-8 md:min-w-8 w-full flex items-center justify-center 
                  aspect-square border-r-[.5px] border-r-white border-opacity-50
                  text-[10px] md:text-sm leading-none ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  } `}
                >
                  {cartItem.quantity}
                </div>

                <div
                  className={`flex-1 flex flex-col relative disabled:pointer-events-none disabled:opacity-50 ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  disabled={loading}
                >
                  <button
                    className="w-full h-full max-w-6 min-w-6 md:max-w-8 md:min-w-8 px-[6px] md:px-2 disabled:opacity-50"
                    onClick={() => handleQtyChange(1)}
                    disabled={
                      product.stock_status != "instock" ||
                      loading ||
                      (product.stock_quantity != null
                        ? cartItem?.quantity >= product.stock_quantity
                        : cartItem?.quantity >= 20)
                    }
                  >
                    <svg
                      className="w-full h-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12 10C12 10 9.05403 6.00001 7.99997 6C6.9459 5.99999 4 10 4 10"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    className="w-full h-full max-w-6 min-w-6 md:max-w-8 md:min-w-8 px-[6px] md:px-2 disabled:opacity-50"
                    onClick={() => handleQtyChange(-1)}
                    disabled={cartItem?.quantity <= 0 || loading}
                  >
                    <svg
                      className="w-full h-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12 6.00003C12 6.00003 9.05407 10 8 10C6.94587 10 4 6 4 6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {loading ? (
                  <div className="max-w-3 md:max-w-5 aspect-square absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2">
                    <svg
                      className="w-full h-full animate-spin text-white"
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
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleAddToCart(quantity)}
                disabled={
                  loading || isAdded || product.stock_status != "instock"
                }
                className="  rounded-[3px]  md:rounded-md aspect-square max-w-8 w-full flex items-center justify-center  bg-[#2C2929] text-white"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white absolute"
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
                  "+"
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
