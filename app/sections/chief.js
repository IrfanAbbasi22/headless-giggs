"use client";
import React from "react";
import Heading from "../components/ui/heading";
import VideoCard from "../components/ui/videoCard";
import Image from "next/image";
// import Heading from "../ui/Heading";
// import VideoCard from "../ui/VideoCard";
const chief = () => {
  const dishData = [
    {
      img: `/assets/images/dish-1.png`,
      title: "Shaichicker",
      text: "chicken, paneer, cashews, golden raisins creamy spicy sauce",
    },
    {
      img: `/assets/images/dish-2.png`,
      title: "Shaichicker",
      text: "chicken, paneer, cashews, golden raisins creamy spicy sauce",
    },
    {
      img: `/assets/images/dish-3.png`,
      title: "Shaichicker",
      text: "chicken, paneer, cashews, golden raisins creamy spicy sauce",
    },
  ];
  const headings = [
    {
      title: "Be the Chef",
      textOne: "Lorem ipsum dolor sit amet consectetur",
      textTwo:
        "  Lorem ipsum, dolor sit amet consectetur adipisicing eli Doloribus reiciendis nisi dolores, optio",
    },
  ];
  return (
    <section className="bg-[#FFE7E6] py-4 md:py-[60px]    ">
      <div className="container mx-auto   px-5    ">
        <Heading headings={headings} />
        <VideoCard dishData={dishData} />
      </div>
    </section>
  );
};

export default chief;
