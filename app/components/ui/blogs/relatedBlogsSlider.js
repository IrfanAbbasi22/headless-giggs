"use client";
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';
import Skeleton from "react-loading-skeleton";

// import required modules
import { Pagination } from 'swiper/modules';
import { fetchBlogs } from '../../lib/fetchPostDetails';
import BlogCard from './blogCard';


export default function RelatedBlogsSlider({excludeID, categories }) {
    const [blogs, setBlogs] = useState([]);
    const [preloader, setPreloader] = useState(true);

    const getRelatedPosts = async () => {
        const res = await fetchBlogs({
            exclude: [excludeID],
            perPage: 24,
            curPage: 1,
            categories: categories,
        });

        const resultData = await res.json();
        setBlogs(resultData);
        setPreloader(false);
    }

    const isFetched = useRef(false);
    useEffect(() => {
        if (!isFetched.current) {
            isFetched.current = true;
            getRelatedPosts();
        }
    }, [])
  return (
    <>
        <Swiper
            slidesPerView={3}
            spaceBetween={24}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
            }}
            // pagination={{
            // clickable: true,
            // }}
            // modules={[Pagination]}
            breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
            }}
            className="mySwiper"
        >
            {
                (blogs?.length > 0 && !preloader) &&
                blogs.map((blog, index) =>(
                    <SwiperSlide key={`relatedProduct-${blog?.id}${index}`}>
                        <BlogCard blog={blog} />
                    </SwiperSlide>
                ))
            }

            {preloader &&
            Array.from({ length: 3 }, (_, index) => index + 1).map(
                (number) => (
                    <div
                        key={`blogCardPreloaderKey-${number}`}
                        className="bg-white border border-gray-200 rounded-lg shadow flex flex-col"
                    >
                        <Skeleton className="rounded-t-lg aspect-[300/200] w-full !inline-block" />
                        <div className="p-5 py-4">
                        <Skeleton height={18} className="mb-2" />
                        <p className="mb-3">
                            <Skeleton height={12} className="" />
                            <Skeleton height={12} className="" />
                        </p>
                        <Skeleton height={12} width={`50%`} className="" />
                        </div>
                    </div>
                )
            )}
        </Swiper>
    </>
  )
}

