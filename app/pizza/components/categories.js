"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Categories = ({ categoryData }) => {
  const [selectedSlug, setSelectedSlug] = useState(
    categoryData.length > 0 ? categoryData[0].id : ""
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const categoryData2 = [
    {
      img: "/assets/images/pizza-category.webp",
      name: "pizza",
    },
    {
      img: "/assets/images/pizza-category.webp",
      name: "pizza",
    },
    {
      img: "/assets/images/pizza-category.webp",
      name: "pizza",
    },
    {
      img: "/assets/images/pizza-category.webp",
      name: "pizza",
    },
    {
      img: "/assets/images/pizza-category.webp",
      name: "pizza",
    },
    {
      img: "/assets/images/pizza-category.webp",
      name: "pizza",
    },
  ];

  const handleScroll = (id) => {
    const targetSection = document.getElementById(id);
    setSelectedSlug(id);

    if (targetSection) {
      const marginTop = 100;

      const scrollToY =
        targetSection.getBoundingClientRect().top + window.scrollY - marginTop;
      window.scrollTo({ top: scrollToY, behavior: "smooth" });
    }
  };

  const determineActiveList = () => {
    categoryData.some((category) => {
      const id = category.id;
      const list = document.getElementById(id);

      if (list) {
        const rect = list.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setSelectedSlug(id); // Update the active slug
          return true;
        }
      }
      return false;
    });
  };

  useEffect(() => {
    let timeoutId = null;

    const checkScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setIsScrolled(window.scrollY > 300);
          determineActiveList();
          timeoutId = null;
        }, 100); // Throttle timing
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [categoryData]);

  return (
    <div className=" flex flex-col py-2 lg:pt-6  sticky  top-[110px]">
      {/* sm  */}
      <div className="  lg:hidden">
        <h4 className=" text-lg font-medium "> Bestsellers</h4>
        <div className="flex overflow-x-auto  scrollbar-hide space-x-4 mt-2">
          {categoryData2.map((category, i) => (
            <div
              key={i}
              className="relative max-w-[124px] h-[120px] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-black opacity-40 z-10"></div>
              <Image
                width={124}
                height={124}
                src={category.img}
                alt={category.name}
                className="   object-cover "
              />
              <p className="absolute bottom-2 left-2 right-2 text-white text-sm  font-medium p-1 rounded-md z-20">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* lg  */}
      <div className=" lg:flex flex-col gap-2   hidden">
        {categoryData.map((item, i) => (
          <div
            key={i}
            onClick={() => handleScroll(item.id)}
            className="cursor-pointer"
          >
            <div
              className={`flex gap-1 text-base font-medium  leading-9 capitalize ${
                selectedSlug == item.id
                  ? " text-primary border-r-4 border-r-primary bg-gradient-to-r from-[#ffffff] to-[#fbe0df]"
                  : "text-[#4d4d4d]"
              }`}
            >
              <p>{item.name}</p> (<>{item.count}</>)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
