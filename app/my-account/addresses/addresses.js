import Image from "next/image";
import Link from "next/link";
import React from "react";

import GetAddress from "@/app/cart/components/ui/address/getAddress";

const Addresses = () => {
  return (
    <div className=" flex flex-col  py-4 px-5 lg:pr-0 lg:pt-0 lg:pb-10 ">
      <div className=" flex gap-7 items-center lg:hidden ">
        <Link href={"/my-account"}>
          <Image src={`/assets/icons/back-arrow.svg`} width={24} height={25} alt="BackArrow" />
        </Link>
        <h3 className=" text-2xl font-medium">My addresses</h3>
      </div>
      
      <>
        <GetAddress/>
      </>
    </div>
  );
};

export default Addresses;
