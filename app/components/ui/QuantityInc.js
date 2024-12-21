"use client";
import React, { useState } from "react";

const QuantityInc = () => {
  const [quantity, setQuantity] = useState(1);

  let isDisable = quantity == 1 ? true : false;

  return (
    <div className="flex border border-[#DADADA66] rounded-lg overflow-hidden">
      <button className="bg-[#F8F8F7] h-full size-12 text-lg text-center hover:bg-[#e1e1e1] disabled:cursor-not-allowed" disabled={isDisable}  onClick={()=>setQuantity(quantity - 1)}>
        &#8722;
      </button>
      <input
        type="number"
        readOnly
        value={quantity}
        className="bg-[#F8F8F7]  h-full size-12 text-lg text-center border-[#DADADA66] border-l lg:pl-4 pointer-events-none"
      />
      <button className="bg-[#F8F8F7] h-full size-12 text-lg text-center border-[#DADADA66] border-l hover:bg-[#e1e1e1]" onClick={()=>setQuantity(quantity + 1)}>
        +
      </button>
    </div>
  );
};

export default QuantityInc;
