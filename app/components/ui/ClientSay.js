"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const ClientSay = () => {
  const [loading, setLoading] = useState(true);
  
  // let clientV1  = "https://youtu.be/Hhi8s3RCI04?si=nSkNdsmtON-FF0yk";
  let clientV1  = "/videos/client-video.mp4";

  const clientsV = [
    { thumb: `/assets/images/client-1.jpg`, video: clientV1 },
    { thumb: `/assets/images/client-2.jpg`, video: clientV1 },
    { thumb: `/assets/images/client-3.jpg`, video: clientV1 },
    { thumb: `/assets/images/client-4.jpg`, video: clientV1 },
    { thumb: `/assets/images/client-5.jpg`, video: clientV1 },
    { thumb: `/assets/images/client-1.jpg`, video: clientV1 },
    { thumb: `/assets/images/client-2.jpg`, video: clientV1 },
    { thumb: `/assets/images/client-3.jpg`, video: clientV1 },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const videoRefs = useRef([]);

  const handleVideoPlay = (index) => {
    setActiveIndex(index); 

    // Pause all videos and play only the clicked one
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === index) {
          video.classList.remove("hidden"); // Show the video
          video.play();
        } else {
          video.classList.add("hidden"); // Hide the video
          video.pause();
          video.currentTime = 0; // Reset video
        }
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="client-say py-4 lg:py-[60px]">
      <h2 className="text-lg font-semibold lg:text-[44px] text-center">
        What our Client say
      </h2>

      <div className="client-say__slider  pt-4 lg:pt-[60px]">
        <Swiper
          className="mySwiper"
          navigation={false}
          loop={true}
          spaceBetween={20} // Adjust spacing between slides
          slidesPerView={2}
          centeredSlides={true}
          breakpoints={{
            // Responsive breakpoints for different screen sizes
            640: {
              slidesPerView: 3, // Show 2 slides on medium devices
            },
            768: {
              slidesPerView: 4, // Show 3 slides on larger devices
            },
          }}
        >
          {clientsV.map((client, index) => (
            <SwiperSlide key={index}>
              {loading ? (
                <Skeleton
                  height={300}
                  width="100%"
                  borderRadius="16px"
                  key={client?.thumb}
                  className="rounded-2xl"
                />
              ) : (
                
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={client?.thumb}
                    width={345}
                    height={445}
                    alt={`Client video-${index + 1}`}
                    className="w-full aspect-[322/414] h-full object-cover rounded-2xl cursor-pointer"
                    onClick={() => handleVideoPlay(index)}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                    <Image width={40} height={40} src={`/assets/icons/client-play.svg`} alt="Play Icon" />
                  </div>
                  
                  {/* Video */}
                  <video
                    width={345}
                    height={445}
                    ref={(el) => (videoRefs.current[index] = el)} // Save reference for each video
                    className={`absolute inset-0 w-full h-full object-cover rounded-2xl ${
                      activeIndex === index ? "" : "hidden"
                    }`}
                    muted
                    loop
                  >
                    <source src={client?.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientSay;
