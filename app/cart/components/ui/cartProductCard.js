"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
// import Cookies from 'js-cookie';
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  cartDetails,
  updateQty,
  removeFromCart,
  toggleChangesPreloader,
  loadCartFromWoo,
} from "../../store/slices/cartSlice";
// import { openModal } from "../store/slices/productDetailModalSlice";
// import { fetchProductDetails } from "../api/fetchProductDetails";
import { fetchWooCommerceCart } from "../../../components/lib/cart/fetchAndSyncCart";
import { addToCartAPI } from "../../../components/lib/cart/addToCart";
import { removeItemFromCart } from "../../../components/lib/cart/removeItemFromCart";
import { formatCurrency } from "@/app/components/lib/user/formatCurrency";
import { toast, Bounce } from "react-toastify";

export default function CartProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const cartData = useSelector(cartDetails);

  const dispatch = useDispatch();

  // Remove Item From Cart
  const removeThisItem = async (key) => {
    dispatch(toggleChangesPreloader(true));
    dispatch(removeFromCart(product.id));

    try {
      await removeItemFromCart(key);

      await fetchWooCommerceCart().then((data) => {
        if (data) {
          dispatch(loadCartFromWoo(data));
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success(`${product.name} removed from cart.`, {
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
      setError("Failed to remove item.");
    } finally {
      dispatch(toggleChangesPreloader(false));
    }
  };

  // Qty Change
  const handleQtyChange = async (e, key) => {
    const newQty = parseInt(e.target.value, 10);

    // Instantly show
    dispatch(toggleChangesPreloader(true));
    dispatch(updateQty({ id: product.id, qty: newQty }));

    // Update in Background
    try {
      const res = await addToCartAPI(product.id, newQty, true, key);
      setLoading(true);
      dispatch(loadCartFromWoo(res));
    } catch (err) {
      setError("Failed to update product's qty.");
    } finally {
      setLoading(false);
      dispatch(toggleChangesPreloader(false));
    }
  };

  const productImage =
    product.images.length > 0 ? product.images[0].src : "/product.webp";

  return (
    <div className="@container">
      <div className="cart-item p-3 pb-0 @[30rem]:pb-3 w-full border border-[rgba(0,0,0, .9)] relative rounded-lg overflow-hidden">
        <div className="flex items-start">
          {product.images.length > 0 ? (
            <Link href={product.permalink} className="mr-2">
              <Image
                className="aspect-square max-w-[100px] min-w-[100px] @[30rem]:max-w-[150px] @[30rem]:min-w-[150px] w-full"
                width={150}
                height={150}
                src={product.images[0].src}
                alt={product.name}
              />
            </Link>
          ) : (
            <Link href={product.permalink} className="mr-2">
              <Image
                className="aspect-square max-w-[150px] min-w-[150px] w-full"
                width={150}
                height={150}
                src="/woocommerce-placeholder.webp"
                alt={product.name}
              />
            </Link>
          )}

          <div className="p-2 pt-0 @[30rem]:pt-2 flex flex-col gap-2 w-full">
            <Link
              href={product.permalink}
              className="text-base font-medium @[30rem]:pr-10"
            >
              {product.name}
              {product?.type === "variation" &&
                product?.variation.length > 0 &&
                ` - ${product?.variation[0]?.value}`}
            </Link>

            <div className="productCardPricing flex justify-start items-center gap-2">
              {product.prices.price && (
                <p className="discountedPrice text-sm @[30rem]:text-base font-semibold">
                  {formatCurrency(
                    product.prices.price * product.quantity,
                    cartData?.totals
                  )}
                </p>
              )}
              {product.prices.regular_price !== product.prices.price && (
                <del className="originalPrice text-xs @[30rem]:text-sm text-black opacity-50">
                  {formatCurrency(
                    product.prices.regular_price * product.quantity,
                    cartData?.totals
                  )}
                </del>
              )}
              {product.prices.regular_price !== product.prices.price && (
                <p className="discount text-primary text-xs @[30rem]:text-sm font-medium">
                  (
                  {(
                    ((product.prices.regular_price - product.prices.price) /
                      product.prices.regular_price) *
                    100
                  ).toFixed(0)}
                  % OFF)
                </p>
              )}
            </div>

            {product.prices.regular_price !== product.prices.price && (
              <p className="text-green-500 text-sm font-medium">
                You saved{" "}
                {formatCurrency(
                  product.prices.regular_price * product.quantity -
                    product.prices.price * product.quantity,
                  cartData?.totals
                )}
              </p>
            )}

            <div className="qty">
              <label htmlFor={"qty" + product["key"]} className="text-sm">
                Qty:
                {product?.quantity_limits?.maximum <= 20 ? (
                  <select
                    name="quantity"
                    id={"qty" + product["key"]}
                    className="outline-none border-none font-medium text-sm @[30rem]:text-base"
                    value={product.quantity}
                    onChange={(e) => handleQtyChange(e, product.key)}
                  >
                    {Array.from(
                      { length: product?.quantity_limits?.maximum },
                      (_, index) => index + 1
                    ).map((number) => (
                      <option key={product.key + number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    name="quantity"
                    id={"qty" + product["key"]}
                    className="outline-none border-none font-medium text-sm @[30rem]:text-base"
                    value={product.quantity}
                    onChange={(e) => handleQtyChange(e, product.key)}
                  >
                    {Array.from({ length: 20 }, (_, index) => index + 1).map(
                      (number) => (
                        <option key={product.key + number} value={number}>
                          {number}
                        </option>
                      )
                    )}
                  </select>
                )}
              </label>
            </div>
          </div>
        </div>
        <button
          className={`@[30rem]:absolute @[30rem]:right-5 @[30rem]:top-2 w-full @[30rem]:w-max py-3 @[30rem]:py-0 border-t @[30rem]:border-none mt-4 @[30rem]:mt-0 uppercase font-semibold text-sm text-black text-opacity-40 hover:text-opacity-100 active:text-opacity-100 transition-all`}
          onClick={() => removeThisItem(product.key)}
        >
          Remove
        </button>

        {/* Item Preloader */}
        {loading && (
          <div
            className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#ffffffb3] bg-opacity-60"
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
        )}
      </div>
    </div>
  );
}
