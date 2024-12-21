import React from "react";
import { useSwiper } from "swiper/react";
import Image from "next/image";
export const SwiperNavButtons = ({
  swiperRef,
  styleLeft = "",
  styleRight = "",
}) => {
  return (
    <div className="flex gap-[6px] md:gap-[14px]">
      {/* Previous Button */}
      <button
        className={` border p-1 md:p-[10px] bg-[#F8F8F7] rounded-md ${styleLeft}`}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <span>
          <Image src={`/assets/icons/left-arrow-icon.svg`} width={16} height={16} alt="arrow" className=" max-w-5 max-h-5  md:w-5 md:h-5" />
        </span>
      </button>

      {/* Next Button */}
      <button
        className={`  border p-1 md:p-[10px]  bg-[#F8F8F7] rounded-md ${styleRight}`}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <span>
          <Image src={`/assets/icons/right-arrow-icon.svg`} width={16} height={16} alt="arrow"  className="max-w-5 max-h-5  md:w-5 md:h-5"/>
        </span>
      </button>
    </div>
  );
};
