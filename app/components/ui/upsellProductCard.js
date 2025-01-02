"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

// Functionalities
import { useSelector, useDispatch } from "react-redux";
import {
  cartDetails,
  addToCart,
  updateQty,
  loadCartFromWoo,
} from "../../cart/store/slices/cartSlice";
import { openModal } from "../../cart/store/slices/productDetailModalSlice";
// import { fetchProductDetails } from "../lib/cart/fetchProductDetails";
import { fetchWooCommerceCart } from "../lib/cart/fetchAndSyncCart";
import { addToCartAPI } from "../lib/cart/addToCart";
import { removeItemFromCart } from "../lib/cart/removeItemFromCart";
import { formatCurrency } from "../lib/user/formatCurrency";

export default function UpsellProductCard({ product, gridClass }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const cartDetailsData = useSelector(cartDetails);

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

    try {
      const res = await addToCartAPI(product.id, quantity);
      dispatch(addToCart(product));
      dispatch(loadCartFromWoo(res));
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    // if (product.type === "variable") {
    //   const productDetails = await fetchProductDetails(product.id);
    //   if (productDetails) {
    //     dispatch(openModal(productDetails));
    //   }
    // }

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
            className="w-full rounded-md aspect-[246/174] object-cover object-center hover:scale-125 transition-all"
          />
        </Link>

        {product.on_sale && product.prices.regular_price && (
          <div className="absolute top-2 md:top-3 left-3 rounded md:rounded-lg bg-[#24C300]">
            <p className="py-1 px-2 md:py-2 md:px-3 font-normal text-[7px] md:text-xs text-white">
              {(
                ((product.prices.regular_price - product.prices.price) /
                  product.prices.regular_price) *
                100
              ).toFixed()}
              % OFF
            </p>
          </div>
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
          <div className="pr-1">
            {product.prices.price && (
              <span className="discountedPrice font-semibold pr-1">
                {formatCurrency(product.prices.price, cartDetailsData?.totals)}
              </span>
            )}

            {product.prices.regular_price && product.prices.price !== product.prices.regular_price && (
              <del className="originalPrice text-sm text-black opacity-50">
                {formatCurrency(product.prices.regular_price, cartDetailsData?.totals)}
              </del>
            )}
          </div>

          <span className="border-s border-[#2C2929]">
            {/* <select>
              {product.attributes.length &&
                product.attributes[0].options.map((item, i) => {
                  return <option key={i}>{item}</option>;
                })}
            </select> */}
            {/* <select>
              {product?.attributes?.length > 0 &&
                product.attributes[0].options.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
            </select> */}
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
                        !product.is_in_stock || loading || 
                        (product.stock_quantity != null
                          ? cartItem?.quantity >= product.stock_quantity
                          : cartItem?.quantity >= 20)
                    }>
                    <svg className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 10C12 10 9.05403 6.00001 7.99997 6C6.9459 5.99999 4 10 4 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <button className="w-full h-full max-w-6 min-w-6 md:max-w-8 md:min-w-8 px-[6px] md:px-2 disabled:opacity-50"
                    onClick={() => handleQtyChange(-1)} 
                    disabled={cartItem?.quantity <= 0 || loading}>
                    <svg className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 6.00003C12 6.00003 9.05407 10 8 10C6.94587 10 4 6 4 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                  loading || isAdded || !product.is_in_stock
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
