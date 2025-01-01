"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchProducts } from "@/app/components/lib/fetchProducts";
import ProductCard from "@/app/components/ui/productCard";

import DotPulsePreloader from "@/app/components/ui/preloader/dotPulsePreloader";
import Image from "next/image";
import ProductCardPreloader from "@/app/components/ui/productCardPreloader";
import Skeleton from "react-loading-skeleton";
import { fetchCats } from "@/app/components/lib/fetchCats";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = ({ params }) => {
    const { slug } = React.use(params);
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadMorePreloader, setLoadMorePreloader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [filterLoading, setFilterLoading] = useState(true);
    const hasInitiated = useRef(false);
    



  const fetchData = async (option = {}) => {
    try {
      if (option.category || option.orderby || option.order)
        setFilterLoading(true);

      const productsRes = await fetchProducts(option);

      // fetchProducts({
      //   perPage: 10,
      //   curPage: 2,
      //   category: "123",
      //   search: "bags",
      //   order: "desc",
      //   orderby: "price",
      // });
      const productData = await productsRes.json();

      if (productData?.length) {
        setProducts((prevProducts) => {
          const updatedProducts = [...prevProducts, ...productData];

          // Delay the logic after setting the state
          window.setTimeout(() => {
            const totalProducts = productsRes.headers.get("X-WP-Total");

            if (updatedProducts.length >= totalProducts) {
              setHasMore(false);
            }
          }, 1000);

          return updatedProducts;
        });
      } else {
        setHasMore(false); // No more products to load
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setFilterLoading(false);
      setLoadMorePreloader(false);
    }
  };

  const fetchCatData = async () => {
    setLoading(true);
    try {
      const resultCat = await fetchCats();
  
      // Filter only the required IDs
      const allowedIds = [19, 21, 17, 22, 18, 16];
      const filteredCats = resultCat.filter((cat) =>
        allowedIds.includes(cat.id)
      );
  
      setCategoryData(filteredCats);
  
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    console.log('inside initial effect');
    
    if (!hasInitiated.current && slug) {
      hasInitiated.current = true;
      fetchCatData();
    }
  
    // This effect will re-run when categoryData is updated
    if (categoryData.length > 0) {
      const curCat = categoryData.find((cat) => cat.slug === slug);
      
      if (curCat) {
        setSelectedCategory(curCat);
        setProducts([]); // Reset products
        setCurrentPage(1); // Reset page to 1
        fetchData({
          perPage: 24,
          curPage: 1,
          category: curCat.id,
        });
      }
    }
  }, [slug, categoryData]);

  
  const handleCategoryChange = (categoryId) => {

    console.log('categoryId', categoryId);
    return
    router.push(`/product/${categoryId}`)
    setSelectedCategory(categoryId); // Update the selected category
    setProducts([]); // Reset products
    setCurrentPage(1); // Reset page to 1
    fetchData({
      perPage: 24,
      curPage: 1,
      category: categoryId,
    }); // Fetch products for the selected category
    window.scrollTo(0, 0); // Scroll to top

    // Optionally, you can still update the URL if you want to reflect the category in the URL without causing a reload
    const selectedCat = categoryData.find((cat) => cat.id === categoryId);
    const categoryName = selectedCat?.name.replace(/\s+/g, "-").toLowerCase(); // Convert to URL-friendly format
    const newUrl = categoryName
      ? `/shop/product-category/${categoryName}`
      : "/shop";
    router.replace(newUrl, undefined, { shallow: true }); // Use shallow routing to avoid a full page reload
  };

  const handleLoadMore = () => {
    setLoadMorePreloader(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchData({
      perPage: 24,
      curPage: nextPage,
    });
  };
  const sortOptions = [
    { label: "Default", orderby: "menu_order", order: "asc" },
    { label: "Popularity", orderby: "popularity", order: "desc" },
    { label: "Latest", orderby: "date", order: "desc" },
    { label: "Price: High to Low", orderby: "price", order: "desc" },
    { label: "Price: Low to High", orderby: "price", order: "asc" },
  ];
  const handleSortChange = (label) => {
    const selectedOption = sortOptions.find((option) => option.label === label);
    console.log("orberby", selectedOption);
    setProducts([]); // Reset products for new sorting
    setCurrentPage(1); // Reset page to 1
    fetchData({
      perPage: 24,
      curPage: 1,
      orderby: selectedOption.orderby,
      order: selectedOption.order,
    });
  };

  if (loading & (currentPage === 1)) {
    return (
      <>
        <section className="  pt-7 pb-10 ">
          <div className=" container  mx-auto px-5 ">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3 gap-10  hidden lg:flex-col  lg:flex ">
                <Skeleton height={32} width={"80%"} className="!rounded-md" />
                <Skeleton height={24} width={"100%"} className="!rounded-md" />
                <div className=" flex flex-col gap-4  text-[#2C292980]">
                  <Skeleton
                    height={16}
                    width={`100%`}
                    className="!rounded-md"
                  />
                  <Skeleton
                    height={16}
                    width={`100%`}
                    className="!rounded-md"
                  />
                  <Skeleton
                    height={16}
                    width={`100%`}
                    className="!rounded-md"
                  />
                  <Skeleton
                    height={16}
                    width={`100%`}
                    className="!rounded-md"
                  />
                  <Skeleton
                    height={16}
                    width={`100%`}
                    className="!rounded-md"
                  />
                </div>
              </div>

              <div className="lg:col-span-9 col-span-12  flex flex-col  gap-6 md:gap-10">
                {/* Card Wrapper */}
                <div className=" lg:flex justify-between hidden  ">
                  <Skeleton height={32} width={300} className="!rounded-md" />
                  <Skeleton height={32} width={300} className="!rounded-md" />
                </div>

                <div className="grid lg:grid-cols-12 gap-4  grid-cols-6 col-start-1 col-span-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`shopPreloaderItem${index}`}
                      className="col-span-3 lg:col-span-4"
                    >
                      <ProductCardPreloader />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className=" pt-8 pb-10 ">
        <div className=" container  mx-auto px-5 ">
          <div className="grid grid-cols-12 gap-6">
            {/* desktop */}
            <div className="col-span-3 gap-6   hidden lg:flex-col  lg:flex ">
              <div className=" flex flex-col gap-7">
                <h3 className=" text-2xl font-semibold"> Filters</h3>

                <h4>Filter by Category</h4>
              </div>

              <ul className="flex flex-col gap-4 text-[#2C292980]">
                {categoryData.map((category) => (
                  <li
                    key={category.id}
                    className={`cursor-pointer  leading-8 ${
                      selectedCategory.id === category.id
                        ? " text-black  border-r-4 "
                        : " "
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {/* <Link href={`/product-category/${category.slug}`}> */}
                        {category.name}
                    {/* </Link> */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-9 col-span-12  flex flex-col  gap-6 md:gap-10">
              <div className=" lg:flex justify-between hidden  ">
                <h3 className="text-2xl font-semibold">
                  {selectedCategory
                    ? categoryData.find((cat) => cat.id === selectedCategory?.id)
                        ?.name || "Category"
                    : "Category"}
                </h3>

                <div>
                  <>
                    {/* <div className="flex items-center gap-1  font-medium text-base">
                      <span> Sort by:</span>
                      <div className="relative  rounded-[30px] ">
                        <select className="w-full  text-xs lg:text-base    pl-1 pr-4 text-[#2C292980]  outline-none appearance-none ">
                          <option value="" disabled>
                            Default Sorting
                          </option>
                          <option value="popularity"> Popularity</option>
                          <option value="latest">Latest</option>
                          <option value="lowtohigh"> Price: Low to High</option>
                          <option value="howtoligh"> Price: High to Low</option>
                        </select>
                        <Image
                          width={16}
                          height={16}
                          src={`/assets/icons/down-arrow.svg`}
                          alt="down arrow"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                      </div>
                    </div> */}
                    <div className="flex items-center gap-1 font-medium text-base">
                      <span>Sort by:</span>
                      <div className="relative rounded-[30px]">
                        <select
                          className="w-full text-xs lg:text-base pl-1 pr-4 text-[#2C292980] outline-none appearance-none"
                          onChange={(e) => handleSortChange(e.target.value)}
                        >
                          {/* <option value="" disabled>
                            Default Sorting
                          </option> */}
                          {sortOptions.map((option) => (
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <Image
                          width={16}
                          height={16}
                          src={`/assets/icons/down-arrow.svg`}
                          alt="down arrow"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                      </div>
                    </div>
                  </>
                </div>
              </div>
              {/* desktop */}
              {/* mobile */}
              <div className="grid grid-cols-1 gap-6 lg:hidden col-span-12 col-start-1">
                <div className=" flex justify-between ">
                  <div>
                    <div className="relative border rounded-[30px] bg-[#DADADA80]">
                      <select
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full py-[6px] pl-4 pr-8 bg-transparent text-xs outline-none appearance-none"
                      >
                        <option disabled>Category</option>
                        {categoryData.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                      <Image
                        width={16}
                        height={16}
                        src={`/assets/icons/down-arrow.svg`}
                        alt="down arrow"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="relative  border rounded-[30px] bg-[#DADADA80]">
                    <select
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full py-[6px]  pl-4 pr-8 bg-transparent text-xs outline-none appearance-none "
                    >
                      {sortOptions.map((option) => (
                        <option key={option.label} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Image
                      width={16}
                      height={16}
                      src={`/assets/icons/down-arrow.svg`}
                      alt="down arrow"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
                {/* <h4 className="text-xl font-semibold">
                  {selectedCategory
                    ? categoryData.find((cat) => cat.id === selectedCategory)
                        ?.name
                    : "Category"}
                </h4> */}
                <h4 className="text-xl font-semibold">
                  {selectedCategory
                    ? categoryData.find(
                        (cat) => cat.id === Number(selectedCategory?.id)
                      )?.name || "Category"
                    : "Category"}
                </h4>
              </div>
              {/* mobile */}
              <div className="grid lg:grid-cols-12 gap-4  grid-cols-6 col-start-1 col-span-6    ">
                {/* {products.length ? (
                  products.map((product, index) => (
                    <ProductCard
                      gridClass="col-span-3 lg:col-span-4"
                      key={`productCard${index}`}
                      product={product}
                    />
                  ))
                ) : (
                  <div className="grid items-center justify-center   col-span-12   ">
                    <div>
                      <Image
                        src={`/assets/icons/no-item.svg`}
                        width={193}
                        height={193}
                        alt="NoItem"
                      />
                    </div>
                  </div>
                )} */}
                {filterLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`shopPreloaderItem${index}`}
                      className="col-span-3 lg:col-span-4"
                    >
                      <ProductCardPreloader />
                    </div>
                  ))
                ) : products.length ? (
                  products.map((product, index) => (
                    <ProductCard
                      gridClass="col-span-3 lg:col-span-4"
                      key={`productCard${index}`}
                      product={product}
                    />
                  ))
                ) : (
                  <div className="grid items-center justify-center col-span-12">
                    <div>
                      <Image
                        src={`/assets/icons/no-item.svg`}
                        width={193}
                        height={193}
                        alt="NoItem"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Load More CTA */}

              {hasMore && (
                <div className="   place-items-center grid  mt-5  ">
                  <button
                    onClick={handleLoadMore}
                    className="w-max py-3 px-8 bg-primary hover:bg-primary-hover rounded-[100px] text-white font-medium disabled:text-primary transition-all relative"
                    disabled={loadMorePreloader}
                  >
                    Load more
                    {loadMorePreloader ? (
                      <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DotPulsePreloader color={"#fff"} />
                      </div>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
