import React, { useEffect, useState } from "react";
// import Card from "./Card";
import FoodCard from "./foodCard";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import ProductCard from "./productCard";

// import { fetchProducts } from "@/app/components/lib/fetchProducts";
import { fetchProducts } from "../lib/fetchProducts";

// const fooditems = [
//   {
//     img: Food1,
//     text1: "Ready to eat",
//     title: "Chicken Legs",
//     text2: "Versatile and Easy to Cook",
//     Price: "$320",
//     quantity: "1Kg",
//     icon: Delivery,
//     text3: "Delivery in 90 mins",
//   },
//   {
//     img: Food1,
//     text1: "Ready to eat",
//     title: "Chicken Legs",
//     text2: "Versatile and Easy to Cook",
//     Price: "$320",
//     quantity: "1Kg",
//     icon: Delivery,
//     text3: "Delivery in 90 mins",
//   },
//   {
//     img: Food1,
//     text1: "Ready to eat",
//     title: "Chicken Legs",
//     text2: "Versatile and Easy to Cook",
//     Price: "$320",
//     quantity: "1Kg",
//     icon: Delivery,
//     text3: "Delivery in 90 mins",
//   },
//   {
//     img: Food1,
//     text1: "Ready to eat",
//     title: "Chicken Legs",
//     text2: "Versatile and Easy to Cook",
//     Price: "$320",
//     quantity: "1Kg",
//     icon: Delivery,
//     text3: "Delivery in 90 mins",
//   },
//   {
//     img: Food1,
//     text1: "Ready to eat",
//     title: "Chicken Legs",
//     text2: "Versatile and Easy to Cook",
//     Price: "$320",
//     quantity: "1Kg",
//     icon: Delivery,
//     text3: "Delivery in 90 mins",
//   },
//   {
//     img: Food1,
//     text1: "Ready to eat",
//     title: "Chicken Legs",
//     text2: "Versatile and Easy to Cook",
//     Price: "$320",
//     quantity: "1Kg",
//     icon: Delivery,
//     text3: "Delivery in 90 mins",
//   },
// ];

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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadMorePreloader, setLoadMorePreloader] = useState(false);
  const fetchData = async (perPage, curPage) => {
    try {
      const productsRes = await fetchProducts(perPage, curPage);
      const productData = await productsRes.json();
      if (productData?.length) {
        setProducts((prevProducts) => [...prevProducts, ...productData]);
      } else {
        setHasMore(false); // No more products to load
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setLoadMorePreloader(false);
    }
  };

  useEffect(() => {
    fetchData(24, 1);
  }, []);

  // const handleLoadMore = () => {
  //   setLoadMorePreloader(true);
  //   const nextPage = currentPage + 1;
  //   setCurrentPage(nextPage);
  //   fetchData(24, nextPage);
  // };
  const router = useRouter();
  const productListingPage = () => {
    router.push("/productlistingpage");
  };

  return (
    <div className="fixed    font-maven inset-0 bg-black bg-opacity-60 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center z-[300]">
      <div className=" flex flex-col w-[93%] md:max-w-[1140px]    px-4 py-7  md:px-[60px] md:py-10 relative  my-2  md:my-6 rounded-md gap-5 md:gap-10  items-center  bg-white  overflow-y-auto  max-h-screen">
        <p className=" absolute top-2 right-2 md:top-2  md:right-4  ">
          <RxCross2
            className="  text-3xl text-[#767676] "
            onClick={() => closeSearchPopUp()}
          />
        </p>
        <div className=" w-full  relative  pt-9 md:pt-0">
          <input
            type="text"
            placeholder="Search for any delicous product"
            className=" w-full rounded-[10px] leading-none border-[#ced4da] border placeholder:text-sm  placeholder:text-[#767676]   outline-none bg-[#F8F8F7] py-[15px] px-12 md:py-[19px] md:px-[60px]"
          />
          <div className=" absolute  top-[56px] left-5   md:top-4 md:left-5">
            <Image src={`/assets/icons/search.svg`} alt="search" width={24} height={24} className="md:w-6 max-w-6" />
          </div>
        </div>
        <>
          {/* <Card /> */}

          <div className="  grid md:grid-cols-2 lg:grid-cols-3  w-full   gap-8   ">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </>

        <div
          onClick={productListingPage}
          className=" flex items-center gap-1 text-xs md:text-base text-[#FF5D58]  cursor-pointer "
        >
          <button>View All </button>
          <span>
            <GoArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
