"use client";
import React, { useState } from "react";

const QuantityInc = () => {
  const [quantity, setQuantity] = useState(1);

  let isDisable = quantity == 1 ? true : false;

  const classOpt = "flex items-center justify-center size-10 lg:size-12 text-xs lg:text-base text-center";
  const svgClasses = "max-w-3 h-auto";

  return (
    <div className="h-max flex border border-[#DADADA66] bg-[#F8F8F7] rounded-lg overflow-hidden">
      <button className={`${classOpt} hover:bg-[#e1e1e1] disabled:cursor-not-allowed`} disabled={isDisable}  onClick={()=>setQuantity(quantity - 1)}>
        <svg className={`${svgClasses}`} xmlns="http://www.w3.org/2000/svg" width="18" height="3" viewBox="0 0 18 3" fill="none">
          <path d="M17 1.5H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <input
        type="number"
        readOnly
        value={quantity}
        className={`${classOpt} [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none outline-none`}
      />
      <button className={`${classOpt} hover:bg-[#e1e1e1]`} onClick={()=>setQuantity(quantity + 1)}>
        <svg className={`${svgClasses}`} xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
          <path d="M9 1.5V17.5M17 9.5H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default QuantityInc;
