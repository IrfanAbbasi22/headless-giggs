"use client";
import React, { useEffect, useState } from "react";

import CatCard from "../components/ui/catCard";
import { fetchCats } from "../components/lib/fetchCats";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const HomeCats = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resultCat = await fetchCats();

      // Filter only the required IDs
      const allowedIds = [19, 21, 17, 22, 18, 16];
      const filteredCats = resultCat.filter((cat) =>
        allowedIds.includes(cat.id)
      );

      // console.log(filteredCats);
      setCategoryData(filteredCats);
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="lg:pb-10">
      <main className="container mx-auto  px-5   ">
        <div className="flex flex-col gap-1  ">
          <h2 className="text-lg font-semibold md:text-2xl">
            Shop by Categories
          </h2>
          <p className="text-xs md:text-base font-normal text-grayCustom">
            Freshest meats and much more!
          </p>
        </div>

        {/* <Heading headings={headings} /> */}

        {/* Preloader */}
        {!categoryData.length && loading && (
          <div className="pt-5 md:pt-10 flex flex-wrap justify-between gap-y-5 gap-x-3 md:gap-y-6 md:gap-x-20 lg:gap-x-6">
            {Array.from({ length: 6 }, (_, index) => index + 1).map(
              (number) => (
                <div
                  key={`PreloaderCats-${number}`}
                  className="text-center w-full max-w-[30%] sm:max-w-[24%] md:max-w-[120px]"
                >
                  <Skeleton
                    width={`100%`}
                    className="!rounded-full aspect-square mb-2"
                  />
                  <Skeleton width={`80%`} height={16} />
                </div>
              )
            )}
          </div>
        )}

        {/* Actual Cards */}
        {categoryData.length > 0 && !loading && (
          <div className="pt-5 md:pt-10 flex flex-wrap justify-between gap-y-5 gap-x-3 md:gap-y-6 md:gap-x-20 lg:gap-x-6">
            {categoryData.map((item, index) => (
              <div
                className="max-w-[30%] sm:max-w-[24%] md:max-w-[120px]"
                key={`CatID${item.id}`}
              >
                <CatCard itemData={item} />
              </div>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default HomeCats;
