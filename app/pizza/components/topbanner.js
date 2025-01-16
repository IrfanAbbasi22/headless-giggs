import Image from "next/image";
import Link from "next/link";
import React from "react";

const imgData = [
  {
    img: "/assets/images/pizza-banner-1.webp",
    slug: "/product-category/chicken",
  },
  {
    img: "/assets/images/pizza-banner-2.webp",
    slug: "/product-category/mutton",
  },
  {
    img: "/assets/images/pizza-banner-3.webp",
    slug: "/product-category/fish",
  },
];
const topbanner = () => {
  return (
    <div className=" flex flex-col py-2  lg:py-4">
      <div className=" flex gap-1 lg:gap-4 overflow-x-auto scrollbar-hide items-center ">
        {imgData.map((data, i) => (
          <div key={i} className=" shrink-0  lg:shrink w-full">
            <Link href={data.slug}>
              <Image
                src={data.img}
                width={369}
                height={158}
                alt="banner"
                className=" w-full rounded-md cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default topbanner;
