import Image from "next/image";
import Link from "next/link";
import React from "react";

import GetAddress from "@/app/cart/components/ui/address/getAddress";

const Addresses = () => {
  return (
    <div className=" flex flex-col   lg:px-5 lg:pr-0 lg:pt-0 lg:pb-10 ">
      <>
        <GetAddress />
      </>
    </div>
  );
};

export default Addresses;
