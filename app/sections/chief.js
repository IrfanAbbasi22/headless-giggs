"use client";
import React from "react";
import Heading from "../components/ui/heading";
import VideoCard from "../components/ui/videoCard";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";

const chief = () => {
  const dishData = [
    {
      img: `/assets/images/dish-1.png`,
      title: "Kadai Chicken",
      text: "Spicy chicken cooked in rich, flavorful kadai masala gravy.",
      redirect: "https://www.youtube.com/watch?v=uL4wbK1tW1I",
    },
    {
      img: `/assets/images/dish-2.png`,
      title: "Chicken Masala",
      text: "Chicken simmered in thick, aromatic, and spicy masala gravy.",
      redirect: "https://www.youtube.com/watch?v=qRwYo5dlgwo",
    },
    {
      img: `/assets/images/dish-3.png`,
      title: "Chicken Biryani",
      text: "Fragrant rice layered with chicken and aromatic spices, perfectly cooked.",
      redirect: "https://www.youtube.com/watch?v=csmTSGZBmhA",
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
