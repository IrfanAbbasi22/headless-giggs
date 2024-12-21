"use client";
import React, { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import Image from "next/image";

const foodCard = ({ item, quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex flex-col gap-2   w-full   ">
      <div className="relative">
        <Image
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute top-2 md:top-3 left-3 rounded md:rounded-lg bg-[#24C300]">
          <p className="py-1 px-2 md:py-2 md:px-3 font-normal text-[7px] md:text-xs text-white">
            50% off
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 md:gap-2">
        <p className="text-[8px] md:text-xs text-[#2C2929] font-normal">
          {item.text1}
        </p>
        <p className="font-semibold text-sm md:text-xl">{item.title}</p>
        <p className="text-[8px] md:text-xs text-[#2C2929] font-normal">
          {item.text2}
        </p>
        <p className="font-medium text-xs md:text-lg">
          <span>{item.Price}</span> | <span>{item.quantity}</span>
        </p>
        <div className="flex justify-between items-center">
          <p className="font-medium text-[8px] md:text-xs gap-1 flex items-center text-[#FF5D58]">
            <Image src={item.icon} alt="delivery icon" width={16} height={16} />
            <span>{item.text3}</span>
          </p>
          {quantity === 0 ? (
            <button
              onClick={onIncrease}
              className="  rounded-[3px]  md:rounded-md  px-[7px] py-[0.2px] md:px-[11px] md:py-1  bg-[#2C2929] text-white"
            >
              +
            </button>
          ) : (
            <div className=" flex  rounded-md   p-1    md:py-4  h-5  md:text-sm  text-xs  items-center  justify-around    w-10 md:w-12    bg-[#2C2929] text-white">
              <span>{quantity}</span>
              <div>
                <span onClick={onIncrease}>
                  <MdKeyboardArrowUp className="text-[9px] md:text-sm" />
                </span>
                <span onClick={onDecrease}>
                  <MdKeyboardArrowDown className="text-[9px] md:text-sm" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default foodCard;
