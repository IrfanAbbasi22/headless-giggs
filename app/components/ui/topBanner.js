import React from "react";
import Image from "next/image";
const topBanner = () => {
  return (
    <section className=" w-full  py-2  bg-[#ca1f1f]">
      <div className="container mx-auto px-4  ">
        <div className=" flex items-center justify-center gap-[6px] text-white text-xs font-normal">
          {/* <span>
            <Image
              width={16}
              height={16}
              src={`/assets/icons/heart-icon.svg`}
              alt="heart-icon"
            />
          </span> */}
          <span className=" lg:text-sm">
            This is Demo Store, Don&apos;t place Order
          </span>
        </div>
      </div>
    </section>
  );
};

export default topBanner;
