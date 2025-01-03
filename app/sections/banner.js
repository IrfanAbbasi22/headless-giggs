"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import { SwiperNavButtons } from "../components/ui/swipperNavButton";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
const Banner = () => {
  const [loading, setLoading] = useState(true);
  const bannerRef = useRef(null);
  const images = [
    { img: `/assets/images/banner-1.webp`, slug: "/product-category/chicken" },
    { img: `/assets/images/banner-2.webp`, slug: "/product-category/mutton" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <section className="  pt-[14px]  pb-4 lg:py-10">
      <div className="relative container mx-auto px-4  ">
        <>
          <div className=" sm:hidden">
            <SwiperNavButtons
              swiperRef={bannerRef}
              styleLeft="absolute top-1/2 -translate-y-1/2 z-10 left-6"
              styleRight="absolute top-1/2 -translate-y-1/2 z-10 right-6"
            />
          </div>
          <Swiper
            onSwiper={(swiper) => (bannerRef.current = swiper)}
            modules={[Navigation]}
            className="mySwiper"
            navigation={false}
            loop={true}
            spaceBetween={20} // Adjust spacing between slides
            slidesPerView={1}
            breakpoints={{
              // Responsive breakpoints for different screen sizes
              640: {
                slidesPerView: 2, // Show 2 slides on medium devices
              },
              768: {
                slidesPerView: 2, // Show 3 slides on larger devices
              },
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                {loading ? (
                  <Skeleton
                    height={209}
                    width="100%"
                    borderRadius="2rem"
                    key={img.img}
                    className="rounded-2xl  lg:!h-[384px]"
                  />
                ) : (
                  <Link href={img.slug}>
                    <Image
                      width={346}
                      height={210}
                      src={img.img}
                      alt={`banner-${index + 1}`}
                      className="w-full rounded-[2rem] cursor-pointer"
                    />
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </section>
  );
};

export default Banner;
