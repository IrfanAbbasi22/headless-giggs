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

export default function SwiperSlider({ images }) {
  const bannerRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="relative">
      <div className="relative">
        <div className="hidden md:block">
          {/* Navigation buttons */}
          <SwiperNavButtons
            swiperRef={bannerRef}
            styleLeft="absolute top-1/2 -translate-y-1/2 z-10 left-6"
            styleRight="absolute top-1/2 -translate-y-1/2 z-10 right-6"
          />
        </div>

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
          {images?.map((item, index) => (
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
          loop={true}
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
                width={140} // Thumbnail size
                height={130} // Thumbnail height
                alt={`Thumbnail ${index + 1}`}
                className="aspect-[140/130] rounded-2xl w-full object-cover cursor-pointer "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

    // <div className='relative'>
    //     <div className="">
    //     <SwiperNavButtons
    //         swiperRef={bannerRef}
    //         styleLeft="absolute top-1/2 -translate-y-1/2 z-10 left-6"
    //         styleRight="absolute top-1/2 -translate-y-1/2 z-10 right-6"
    //     />
    //     </div>
    //     <Swiper
    //     onSwiper={(swiper) => (bannerRef.current = swiper)}
    //     modules={[Navigation]}
    //     className="mySwiper"
    //     navigation={false}
    //     loop={true}
    //     spaceBetween={20} // Adjust spacing between slides
    //     slidesPerView={1}
    //     >
    //     {images?.map((item, index) => (
    //         <SwiperSlide key={`${item.src}-${index}`}>
    //         <Image
    //             src={item.src}
    //             width={608}
    //             height={480}
    //             alt={`Product image ${index + 1}`}
    //             className={`aspect-[608/480] object-cover object-center rounded-2xl w-full`}
    //         />
    //         </SwiperSlide>
    //     ))}
    //     </Swiper>
    // </div>
  );
}
