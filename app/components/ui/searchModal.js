import React, { useEffect, useRef, useState } from "react";
// import Card from "./Card";
import FoodCard from "./foodCard";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import ProductCard from "./productCard";

// import { fetchProducts } from "@/app/components/lib/fetchProducts";
import { fetchProducts } from "../lib/fetchProducts";
import Skeleton from "react-loading-skeleton";

const headings = [
  {
    title: "Deals of the day",
    textOne: "Lorem ipsum dolor sit amet consectetur",
    textTwo:
      "  Lorem ipsum, dolor sit amet consectetur adipisicing eli Doloribus reiciendis nisi dolores, optio",
  },
];

const SearchModal = ({ closeSearchPopUp }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadMorePreloader, setLoadMorePreloader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const hasInitiated = useRef(false);
  // const fetchData = async (perPage, curPage, search) => {
  //   try {
  //     const productsRes = await fetchProducts(perPage, curPage, search);
  //     const productData = await productsRes.json();
  //     if (productData?.length) {
  //       setProducts((prevProducts) => [...prevProducts, ...productData]);
  //     } else {
  //       setHasMore(false); // No more products to load
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   } finally {
  //     setLoading(false);
  //     setLoadMorePreloader(false);
  //   }
  // };
  const fetchData = async (option = {}) => {
    setLoading(true);
    try {
      // console.log("Fetching with search:", search); // Debugging
      const productsRes = await fetchProducts(option);
      const productData = await productsRes.json();
      if (option.curPage === 1) {
        setProducts(productData || []);
      } else if (productData?.length) {
        setProducts((prevProducts) => [...prevProducts, ...productData]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  // useEffect(() => {
  //   fetchData(6, 1);
  // }, []);

  useEffect(() => {
    if (!hasInitiated.current) {
      hasInitiated.current = true;
      fetchData({
        perPage: 6,
        curPage: 1,
      });
    }
  }, []);

  const searchProduct = (e) => {
    setSearchQuery(e.target.value);
    fetchData({
      perPage: 6,
      curPage: 1,
      search: e.target.value,
    });
  };

  const router = useRouter();
  const shopPage = () => {
    if (searchQuery) {
      router.push(`/shop/product-category/${searchQuery}`);
    } else {
      router.push("/shop");
    }

    closeSearchPopUp();
  };

  return (
    <div className="fixed    font-maven inset-0 bg-black bg-opacity-60 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center z-[300]">
      <div className=" flex flex-col w-[93%] md:max-w-[1140px]    px-4 py-7  md:px-[60px] md:py-10 relative  my-2  md:my-6 rounded-md gap-5 md:gap-10  items-center  bg-white  overflow-y-auto  max-h-screen">
        <p className=" absolute top-2 right-2 md:top-2  md:right-4  ">
          <RxCross2
            className="  text-3xl text-[#767676] cursor-pointer "
            onClick={() => closeSearchPopUp()}
          />
        </p>
        <div className=" w-full  relative  pt-9 md:pt-0">
          <input
            value={searchQuery}
            onChange={searchProduct}
            type="text"
            placeholder="Search for any delicous product"
            className=" w-full rounded-[10px] leading-none border-[#ced4da] border placeholder:text-sm  placeholder:text-[#767676]   outline-none bg-[#F8F8F7] py-[15px] px-12 md:py-[19px] md:px-[60px]"
          />
          <div className=" absolute  top-[56px] left-5   md:top-4 md:left-5">
            <Image
              src={`/assets/icons/search.svg`}
              alt="search"
              width={24}
              height={24}
              className="md:w-6 max-w-6"
            />
          </div>
        </div>
        <>
          {/* <Card /> */}

          <div className="  grid md:grid-cols-2 lg:grid-cols-3  w-full   gap-8   ">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden flex flex-col gap-2 w-full"
                >
                  <div className="relative leading-none">
                    <Skeleton className="aspect-[246/174] !rounded-md" />
                  </div>
                  <div className="flex flex-col">
                    <div className="leading-none">
                      <Skeleton width="25%" height={14} />
                    </div>
                    <Skeleton height={20} className="mt-[6px] mb-1" />
                    <Skeleton height={14} className="mb-2" />
                    <Skeleton width="50%" height={16} className="mb-1" />
                    <div className="flex justify-between items-center">
                      <div className="w-1/2">
                        <Skeleton height={16} />
                      </div>
                      <div className="w-6 h-6 lg:w-8 lg:h-8">
                        <Skeleton height={24} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {!loading && products.length === 0 && (
              <div className="text-center text-gray-500 w-full">
                No products found
              </div>
            )}
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </>
        {(products.length >= 6 || (hasSearched && products.length > 0)) && (
          <div
            onClick={shopPage}
            className="flex items-center gap-1 text-xs md:text-base text-[#FF5D58] cursor-pointer"
          >
            <button>View All</button>
            <span>
              <GoArrowRight />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
