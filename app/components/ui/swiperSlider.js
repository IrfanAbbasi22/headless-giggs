"use client"; // This ensures the component is client-side only

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { SwiperNavButtons } from "./swipperNavButton";
import React, { useRef, useState } from "react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs"; // Import Swiper thumbs CSS

export default function SwiperSlider({ images, variationImage=null }) {
  const bannerRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const modifiedImages = variationImage
    ? [ { src: variationImage }, ...images.filter((_, index) => index !== 0) ]
    : images; 

  return (
    <div className="relative">
      <div className="relative">
        {
          images?.length > 1 && (
            <div className="hidden md:block">
              {/* Navigation buttons */}
              <SwiperNavButtons
                swiperRef={bannerRef}
                styleLeft="absolute top-1/2 -translate-y-1/2 z-10 left-6"
                styleRight="absolute top-1/2 -translate-y-1/2 z-10 right-6"
              />
            </div>
          )
        }

        {/* Main Swiper (for the larger images) */}
        <Swiper
          onSwiper={(swiper) => (bannerRef.current = swiper)}
          modules={[Navigation, Thumbs, Pagination]}
          pagination={window.innerWidth <= 766 ? { clickable: true } : false}
          style={{
            "--swiper-pagination-color": "#fff",
            "--swiper-pagination-bullet-inactive-color": "#fff",
            "--swiper-pagination-bullet-inactive-opacity": 0.5,
          }}
          className="mySwiper"
          navigation={false}
          loop={true}
          spaceBetween={20} // Adjust spacing between slides
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }} // Link to the thumbnail Swiper
        >
          {modifiedImages?.map((item, index) => (
            <SwiperSlide key={`${item.src}-${index}`}>
              <Image
                src={item.src}
                width={608}
                height={480}
                alt={`Product image ${index + 1}`}
                className="aspect-[608/480] object-cover object-center rounded-2xl w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:block">
        {/* Thumbnail Swiper (below the main Swiper) */}
        <Swiper
          onSwiper={setThumbsSwiper} // Set the Swiper reference for thumbnails
          loop={false}
          spaceBetween={16}
          slidesPerView={4} // Show 4 thumbnails at a time
          watchSlidesVisibility={true} // Hide thumbnails when not visible
          watchSlidesProgress={true} // Ensure active thumbnail is always visible
          modules={[Thumbs]}
          className="thumbsSwiper mt-4" // Style the thumbnails swiper
        >
          {images?.map((item, index) => (
            <SwiperSlide key={`${item.src}-${index}`}>
              <Image
                src={item.src}
                width={140}
                height={130}
                alt={`Thumbnail ${index + 1}`}
                className="aspect-[140/130] rounded-2xl w-full object-cover cursor-pointer "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
