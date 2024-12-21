"use client";
import React, { useEffect, useRef, useState } from "react";

import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "react-loading-skeleton/dist/skeleton.css";

import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
// import Heading from "../ui/Heading";
import { SwiperNavButtons } from "./swipperNavButton";
import Heading from "./heading";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { fetchCatProducts } from "../lib/fetchCatProducts";
import { fetchCats } from "../lib/fetchCats";
// import { Navigation } from "swiper/modules";

const Card = ({ cat_id, headings }) => {
  console.log("cat_id", cat_id);
  // const { cat_id } = props;
  const [loading, setLoading] = useState(false);
  const [catData, setCatData] = useState([]);
  const [error, setError] = useState(null);

  const swiperRef = useRef(null);
  const [quantities, setQuantities] = useState(fooditems.map(() => 0));
  const increaseItem = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };
  const decreaseItem = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 0) {
      updatedQuantities[index] -= 1;
    }
    setQuantities(updatedQuantities);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCatProducts(cat_id);
        // const resultCat = await fetchCats();
        // const resultCatData = await resultCat.json();
        setCatData(result);
        // console.log("resultCat", resultCatData);
        // console.log(`Result here ${cat_id}`, result);
        // console.log("category", catData);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cat_id]);

  // useEffect(() => {
  //   getData();
  // }, []);
  // if (error) return <div>{error}</div>;
  // if (!catData || catData.length === 0)
  //   return <div>No products available for this category</div>;

  // const headings = [
  //   {
  //     title: "Deals of the day",
  //     textOne: "Lorem ipsum dolor sit amet consectetur",
  //     textTwo:
  //       "  Lorem ipsum, dolor sit amet consectetur adipisicing eli Doloribus reiciendis nisi dolores, optio",
  //   },
  // ];

  return (
    <>
      <section className="   py-4   md:py-[60px]">
        <main className="container mx-auto  px-5  relative  ">
          {/* <div className=" grid grid-cols-2 gap-2  ">
            <div className=" flex gap-1 md:gap-2 flex-col">
              <h2 className="text-lg font-semibold md:text-2xl">
                Deals of the day
              </h2>
              <p className="text-xs md:text-base md:hidden font-normal  text-grayCustom">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <p className="text-xs md:text-base hidden md:grid   font-normal  text-grayCustom">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloribus reiciendis nisi dolores, optio
              </p>
            </div>

            <div className=" place-items-end ">
              <SwiperNavButtons swiperRef={swiperRef} />
            </div>
          </div> */}
          <Heading
            headings={headings}
            // actionComponent={<SwiperNavButtons swiperRef={swiperRef} />}
            actionComponent={<SwiperNavButtons swiperRef={swiperRef} />}
          />

          <div className="mt-4">
            <Swiper
              // modules={[Navigation, Pagination, A11y]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="mySwiper"
              modules={[Navigation]}
              spaceBetween={6}
              slidesPerView={2}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1140: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
            >
              {catData &&
                catData.map((item, i) => (
                  <SwiperSlide key={i}>
                    {/* {loading ? (
                      <Skeleton
                        height={300}
                        key={item}
                        width="100%"
                        borderRadius="16px"
                      />
                    ) : ( */}
                    {loading ? (
                      <Skeleton
                        height={500}
                        key={item}
                        width="100%"
                        borderRadius="16px"
                      />
                    ) : (
                      <div className=" flex flex-col gap-2   p-2  ">
                        <>
                          <div className="  relative  ">
                            <Image
                              width={246}
                              height={174}
                              src={item.images[0]?.src}
                              alt={
                                item?.name
                                  ? `Image of ${item?.name}`
                                  : "Default product image"
                              }
                              className="w-full h-full object-cover rounded-md cursor-pointer"
                            />
                            {/* <div className=" absolute top-2 md:top-3 left-3 rounded   md:rounded-lg bg-[#24C300]">
                              <p className=" py-1 px-2  md:py-2 md:px-3 font-normal text-[7px] md:text-xs text-white">
                                50% off

                              </p>
                            </div> */}
                            .
                            {item?.regular_price &&
                            item?.sale_price &&
                            item?.sale_price < item?.regular_price ? (
                              <div className="absolute top-2 md:top-3 left-3 rounded md:rounded-lg bg-[#24C300]">
                                <p className="py-1 px-2 md:py-2 md:px-3 font-normal text-[7px] md:text-xs text-white">
                                  {Math.round(
                                    ((item?.regular_price - item?.sale_price) /
                                      item?.regular_price) *
                                      100
                                  )}
                                  % off
                                </p>
                              </div>
                            ) : null}
                          </div>

                          <div className=" flex flex-col gap-1 md:gap-2  ">
                            <p className=" text-[8px] md:text-xs text-[#2C2929] font-normal cursor-pointer">
                              {item.name}
                            </p>
                            <p className=" font-semibold text-sm  md:text-xl cursor-pointer  ">
                              {item.name}
                            </p>
                            {/* <p className="text-[8px] md:text-xs text-[#2C2929] font-normal ">
                              {item.description}
                            </p> */}
                            <p
                              className="text-[8px] md:text-xs text-[#2C2929] font-normal cursor-pointer"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                            {/* {item.description?.includes("<") ? (
                              <p
                                className="text-[8px] md:text-xs text-[#2C2929] font-normal cursor-pointer"
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              />
                            ) : (
                              <p className="text-[8px] md:text-xs text-[#2C2929] font-normal">
                                {item.description}
                              </p>
                            )} */}

                            <p className=" font-medium text-xs md:text-lg">
                              {" "}
                              <span>₹{item.price}</span> |{" "}
                              <span>{item.quantity || "20"}</span>
                            </p>
                            <div className=" flex justify-between items-center   ">
                              <p className=" font-medium text-[8px] sm:text-[8px]  md:text-xs gap-1 flex items-center text-[#FF5D58]">
                                <span>
                                  <Image
                                    src={item?.icon || `/assets/icons/delivery.svg`}
                                    alt={
                                      item?.icon
                                        ? `Icon for ${item?.name}`
                                        : "Default product icon"
                                    }

                                    width={16}
                                    height={16}
                                  />
                                </span>{" "}
                                <span>
                                  {item.text || "Delivery in 90 mins"}
                                </span>
                              </p>
                              {quantities[i] === 0 ? (
                                <button
                                  onClick={() => increaseItem(i)}
                                  className="  rounded-[3px]  md:rounded-md  px-[7px] py-[0.2px] md:px-[11px] md:py-1  bg-[#2C2929] text-white"
                                >
                                  +
                                </button>
                              ) : (
                                <div className=" flex  rounded-md   p-1    md:py-4  h-5  md:text-sm  text-xs  items-center  justify-around    w-10 md:w-12    bg-[#2C2929] text-white">
                                  <span className="   ">{quantities[i]}</span>

                                  <div className="    ">
                                    <span onClick={() => increaseItem(i)}>
                                      <MdKeyboardArrowUp className="text-[9px] md:text-sm" />
                                    </span>
                                    <span onClick={() => decreaseItem(i)}>
                                      <MdKeyboardArrowDown className="text-[9px] md:text-sm" />
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </main>
      </section>
    </>
  );
};

export default Card;
