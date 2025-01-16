import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
// import SideCheckoutModalCopy from "@/app/cart/components/ui/sideCheckoutModalCopy";
import { selectedTotalItems } from "@/app/cart/store/slices/cartSlice";
import SideCheckoutModal from "@/app/cart/components/ui/sideCheckoutModal";

const Cart = () => {
  const totalItems = useSelector(selectedTotalItems);

  return (
    <div className=" flex   py-2   flex-col sticky top-[110px]">
      {totalItems === 0 && <h3 className="font-medium text-xl  pl-8 ">Cart</h3>}
      <div className="flex flex-col    ">
        {totalItems === 0 ? (
          <>
            <div className="flex flex-col max-w-[267px]  items-center text-center gap-3 pl-8  mt-8">
              <Image
                width={223}
                height={132}
                src="/assets/icons/emptycart.svg"
                alt="Empty Cart"
              />
              <div className="flex flex-col  ">
                <p className="text-base font-medium">Your cart is empty</p>
                <p className="text-sm text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur
                </p>
              </div>
            </div>
          </>
        ) : (
          // Render the SideCheckoutModal if totalItems > 0
          <div className=" ">
            <SideCheckoutModal />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
