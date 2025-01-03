"use client";
import { useSearchParams } from "next/navigation";

import ProductList from "../components/ui/productList";

const Page = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("s");

  return (
    <>
      <ProductList basePath="/shop" searchQuery={searchQuery} allowedCategoryIds={[19, 21, 17, 22, 18, 16]} perPage={24}/>
    </>
  );
};

export default Page;
