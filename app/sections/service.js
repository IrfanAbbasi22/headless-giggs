"use client";

import React from "react";
// import Heading from "../ui/Heading";
// import ServiceCard from "../ui/ServiceCard";
import Heading from "../components/ui/heading";
import ServiceCard from "../components/ui/serviceCard";
const service = ({ bgColor, alignCenterHeading }) => {
  const serviceData = [
    {
      icon: `/assets/icons/service-1.svg`,
      title: "100% Natural",
      text: "The livestock are sourced directly from local farms where the animals are reared in hygienic and free-range environment.",
    },
    {
      icon: `/assets/icons/service-2.svg`,
      title: "Premium Quality Meat",
      text: "Every step of the cutting process issupervised by our team of experiencedmeat professionals to able to offer premiumquality cuts and meat.",
    },
    {
      icon: `/assets/icons/service-3.svg`,
      title: "Packed with Care",
      text: "Each order is packed in a hygienic andtemperature controlled environment in the morning for delivery.",
    },
    {
      icon: `/assets/icons/service-4.svg`,
      title: "Delivered Fresh",
      text: "The meats are cut, packed anddelivered in less than 16 hours to thecustomers to retain their freshness fora longer time.",
    },
  ];
  const headings = [
    {
      title: "Why giggs?",
      textOne: "Lorem ipsum dolor sit amet consectetur",
      textTwo:
        "  Lorem ipsum, dolor sit amet consectetur adipisicing eli Doloribus reiciendis nisi dolores, optio",
    },
  ];
  return (
    <section
      className={`${bgColor ? `bg-[${bgColor}]` : ""} py-4 md:py-[60px]`}
    >
      <div className="container mx-auto px-5   ">
        <Heading headings={headings} alignCenterHeading={alignCenterHeading} />
        <ServiceCard serviceData={serviceData} />
      </div>
    </section>
  );
};

export default service;
