"use client";
import TopBanner from "./components/topbanner";
import Categories from "./components/categories";
import Products from "./components/products";
import Cart from "./components/cart";
import { fetchCats } from "../components/lib/fetchCats";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [categoryData, setCategoryData] = useState([]);

  const fetchCatData = async () => {
    try {
      const resultCat = await fetchCats();

      // Filter only the required IDs
      const allowedIds = [19, 21, 17, 22, 18, 16];
      const filteredCats = resultCat.filter((cat) =>
        allowedIds.includes(cat.id)
      );

      setCategoryData(filteredCats);
    } catch (err) {
      console.error(`Error fetching data: ${err.message}`);
      // setError(`Error fetching data: ${err.message}`);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);
  console.log(categoryData);
  return (
    <section className=" py-4 container">
      <div className="  border-t">
        <TopBanner />
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-12  z-10  sticky  top-[110px]">
        <div className=" col-span-3  border-t   lg:border-r  ">
          <Categories categoryData={categoryData} />
        </div>

        <div className="col-span-5 border-t lg:border-r">
          {categoryData.map((categoryData, i) => (
            <Products key={i} categoryData={categoryData} />
          ))}
        </div>

        <div className="col-span-4 border-t hidden lg:inline-block ">
          <Cart />
        </div>
      </div>
    </section>
  );
};

export default Page;
