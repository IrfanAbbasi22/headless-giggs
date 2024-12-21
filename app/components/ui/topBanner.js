import React from "react";
import Image from "next/image";
const topBanner = () => {
  return (
    <section className=" hidden md:block py-3 bg-[#2C2929]">
      <div className="container mx-auto px-4  ">
        <div className=" flex items-center justify-center gap-[6px] text-white text-xs font-normal">
          <span>
            <Image width={16} height={16} src={`/assets/icons/heart-icon.svg`} alt="heart-icon" />
          </span>
          <span>Free shipping on all orders over $85 </span>
        </div>
      </div>
    </section>
  );
};

export default topBanner;
