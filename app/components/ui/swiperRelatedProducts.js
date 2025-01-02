"use client";
import React, { useEffect, useRef, useState } from "react";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { SwiperNavButtons } from "./swipperNavButton";
import SectionHeading from "./sectionHeading";
import ProductCardPreloader from "./productCardPreloader";
import ProductCard from "./productCard";
import { fetchProducts } from "../lib/fetchProducts";

const SwiperRelatedProducts = ({heading, productID = [], }) => {
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState([]);

    const getRelatedProucts = async () => {
        const res = await fetchProducts({
            perPage: 24,
            curPage: 1,
            include: productID,
        }) 

        const resultData = await res.json();
        setProductData(resultData);
    }

    const isFetched = useRef(false);
    useEffect(() => {
        if (!isFetched.current) {
            isFetched.current = true;
            if(productID?.length > 0){
                getRelatedProucts();
            }
        }

    }, [productID])

    const swiperRef = useRef(null);
    const getInitialSlidesCount = () => {
        const width = typeof window !== "undefined" ? window.innerWidth : 1024;
    
        if (width < 768) return 2; // Mobile breakpoint
        if (width < 992) return 3; // Tablet breakpoint
        return 4; // Desktop breakpoint
    };
    const [preloaderCount, setPreloaderCount] = useState(getInitialSlidesCount);

  return (
    <>
        <div className="py-4 md:py-[60px]">
            <main className="container mx-auto  px-5  relative  ">
                <SectionHeading heading={heading} actionComponent={<SwiperNavButtons swiperRef={swiperRef} />}/>

                <div className="mt-4">
                    {loading && !productData.length ? (
                        <>
                            {/* Swiper */}
                            <div className="flex gap-3 sm:gap-4 lg:gap-6">
                                {Array.from(
                                    { length: preloaderCount },
                                    (_, index) => index + 1
                                ).map((number) => (
                                    <ProductCardPreloader key={`Preloader-${number}`} />
                                ))}
                            </div>
                        </>
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
                        {productData.map((item, i) => (
                        <SwiperSlide key={i}>
                            <ProductCard product={item} />
                        </SwiperSlide>
                        ))}
                    </Swiper>
                    )}
                </div>
            </main>
        </div>
    </>
  )
}

export default SwiperRelatedProducts