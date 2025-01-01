"use client";
import React from "react";
import MyAccount from "../page";
import { useParams } from "next/navigation";
// import MyAccount from "../page";
// import Orders from "../orders/page";
// import Addresses from "../addresses/addresses";

const Page = () => {
  const params = useParams(); // Get route parameters
  const slug = params?.slug;
  console.log(slug);
  return (
    <div>
      <MyAccount slug={slug} />
      {/* <MyAccount>
        <Orders />
        <Addresses />
      </MyAccount> */}
    </div>
  );
};

export default Page;
