"use client";
import React from "react";
import MyAccount from "../page";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const slug = params?.slug;
  return (
    <div>
      <MyAccount slug={slug} />
    </div>
  );
};

export default Page;
