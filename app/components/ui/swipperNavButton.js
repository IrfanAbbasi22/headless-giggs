import React, {useState, useEffect} from "react";
import { useSwiper } from "swiper/react";
import Image from "next/image";
export const SwiperNavButtons = ({
  swiperRef,
  styleLeft = "",
  styleRight = "",
  // isDisabled = false,
  loop = false,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // console.log('swiperRef', swiperRef);
  useEffect(() => {
    const swiper = swiperRef.current;

    if (swiper) {
      // Update states for non-loop scenarios
      if (!loop) {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);

        const updateState = () => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        };

        swiper.on("slideChange", updateState);

        return () => {
          swiper.off("slideChange", updateState);
        };
      }
    }
  }, [swiperRef, loop]);

  return (
    <div className="flex gap-[6px] md:gap-[14px]">
      {/* Previous Button */}
      <button
        className={` border p-1 md:p-[10px] bg-[#F8F8F7] rounded-md ${styleLeft} disabled:opacity-50`}
        onClick={() => swiperRef.current?.slidePrev()}
        // disabled={ !loop && isBeginning }
      >
        <span>
          <Image src={`/assets/icons/left-arrow-icon.svg`} width={16} height={16} alt="arrow" className=" max-w-5 max-h-5  md:w-5 md:h-5" />
        </span>
      </button>

      {/* Next Button */}
      <button
        className={`  border p-1 md:p-[10px]  bg-[#F8F8F7] rounded-md ${styleRight} disabled:opacity-50`}
        onClick={() => swiperRef.current?.slideNext()}
        // disabled={ !loop && isEnd }
      >
        <span>
          <Image src={`/assets/icons/right-arrow-icon.svg`} width={16} height={16} alt="arrow"  className="max-w-5 max-h-5  md:w-5 md:h-5"/>
        </span>
      </button>
    </div>
  );
};
