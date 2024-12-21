// "use client";
// import { useEffect, useState } from "react";
// import { fetchProducts } from "@/app/components/lib/fetchProducts";
// import ProductCard from "@/app/components/ui/productCard";

// import DotPulsePreloader from "../../components/ui/preloader/dotPulsePreloader";
// import Image from "next/image";

// const CategoryShop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadMorePreloader, setLoadMorePreloader] = useState(false);

//   const fetchData = async (perPage, curPage) => {
//     try {
//       const productsRes = await fetchProducts(perPage, curPage);
//       const productData = await productsRes.json();

//       if (productData?.length) {
//         setProducts((prevProducts) => [...prevProducts, ...productData]);
//       } else {
//         setHasMore(false); // No more products to load
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//       setLoadMorePreloader(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(24, 1);
//   }, []);

//   const handleLoadMore = () => {
//     setLoadMorePreloader(true);
//     const nextPage = currentPage + 1;
//     setCurrentPage(nextPage);
//     fetchData(24, nextPage);
//   };

//   if (loading & currentPage === 1) {
//     return (
//       <div className="container flex flex-wrap gap-5 mx-auto text-center items-center justify-center">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <>
//       <section className="  pt-7 pb-10 ">
//         <div className=" container  mx-auto px-5 ">
//           <div className="grid grid-cols-12 gap-6">
//             <div className="col-span-3 gap-10  hidden lg:flex-col  lg:flex ">
//               <h3 className=" text-2xl font-semibold"> Filter</h3>
//               <h4>Filter by Category</h4>
//               <div className=" flex flex-col gap-4  text-[#2C292980]">
//                 <p>item</p>
//                 <p>item</p>
//                 <p>item</p>
//                 <p>item</p>
//                 <p>item</p>
//                 <p>item</p>
//               </div>
//             </div>
//             <div className="lg:col-span-9 col-span-12  flex flex-col  gap-6 md:gap-10">
//               {/* Card Wrapper */}
//               <div className=" lg:flex justify-between hidden  ">
//                 <h3 className=" text-2xl font-semibold">Fish </h3>
//                 <div>
//                   <button className={``}>
//                     <p className="flex items-center gap-1  font-medium text-base">
//                       <span> Sort by:</span>
//                       <span className=" text-[#2C292980]">popular</span>
//                       <Image width={16} height={16} src={downarrow} alt="downarrow" />
//                     </p>
//                   </button>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 gap-6 lg:hidden col-span-12 col-start-1">
//                 <div className=" flex justify-between     ">
//                   <div>
//                     <button className=" py-[6px] px-3 border  rounded-[30px] bg-[#DADADA80]">
//                       <p className="flex items-center gap-1 text-xs ">
//                         Category
//                         <Image width={16} height={16} src={downarrow} alt="downarrow" />
//                       </p>
//                     </button>
//                   </div>
//                   <div>
//                     <button className=" py-[6px] px-3 border  rounded-[30px] bg-[#DADADA80]">
//                       <p className="flex items-center gap-1 text-xs">
//                         Sort by
//                         <Image width={16} height={16} src={downarrow} alt="downarrow" />
//                       </p>
//                     </button>
//                   </div>
//                 </div>

//                 <p className=" text-xl font-semibold">Filter </p>
//               </div>
//               <div className="grid lg:grid-cols-12 gap-4  grid-cols-6 col-start-1 col-span-6    ">
//                 {products.length
//                   ? products.map((product, index) => (
//                       <ProductCard
//                         gridClass="col-span-3 lg:col-span-4"
//                         key={`productCard${index}`}
//                         product={product}
//                       />
//                     ))
//                   : "Products Not Found"}
//               </div>

//               {/* Load More CTA */}
//               {
//                 hasMore &&
//                 <div className="   place-items-center grid  mt-5  ">
//                   <button onClick={handleLoadMore} 
//                     className="w-max py-3 px-8 bg-primary hover:bg-primary-hover rounded-[100px] text-white font-medium disabled:text-primary transition-all relative"
//                     disabled={loadMorePreloader}>
//                     Load more
//                     {loadMorePreloader ? (
//                         <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                           <DotPulsePreloader color={'#fff'}/>
//                         </div>
//                     ): ''}
//                   </button>


//                 </div>
//               }
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CategoryShop;
