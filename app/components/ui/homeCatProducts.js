"use client";
import React, { useEffect, useRef, useState } from "react";

import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { SwiperNavButtons } from "./swipperNavButton";
import Heading from "./heading";

import { fetchCatProducts } from "../lib/fetchCatProducts";
import ProductCard from "./productCard";
import ProductCardPreloader from "./productCardPreloader";

export default function HomeCatProducts({ cat_id, headings }) {
  const [loading, setLoading] = useState(true);
  const [catData, setCatData] = useState([]);
  const [error, setError] = useState(null);

  const swiperRef = useRef(null);

  const getInitialSlidesCount = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1024;

    if (width < 768) return 2; // Mobile breakpoint
    if (width < 992) return 3; // Tablet breakpoint
    return 4; // Desktop breakpoint
  };
  const [preloaderCount, setPreloaderCount] = useState(getInitialSlidesCount);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCatProducts(cat_id);
        setCatData(result);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cat_id]);

  return (
    <>
      <section className="py-4 md:py-[60px]">
        <main className="container mx-auto  px-5  relative  ">
          <Heading
            headings={headings}
            actionComponent={<SwiperNavButtons swiperRef={swiperRef} />}
          />

          <div className="mt-4">
            {loading && !catData.length ? (
              <div className="flex gap-3 sm:gap-4 lg:gap-6">
                {Array.from(
                  { length: preloaderCount },
                  (_, index) => index + 1
                ).map((number) => (
                  <ProductCardPreloader key={`Preloader-${number}`} />
                ))}
              </div>
            ) : (
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="mySwiper"
                modules={[Navigation]}
                spaceBetween={12}
                slidesPerView={2}
                loop={true}
                breakpoints={{
                  577: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                  992: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
              >
                {catData.map((item, i) => (
                  <SwiperSlide key={i}>
                    <ProductCard product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </main>
      </section>
    </>
  );
}
