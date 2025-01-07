import React from "react";
import ProductList from "@/app/components/ui/productList";

const Page = ({ params }) => {
    const { slug } = React.use(params);
    

  return (
    <>
      <ProductList
        basePath="/product-category"
        slug={slug}
        allowedCategoryIds={[19, 21, 17, 22, 18, 16]}
        perPage={24}
      />
    </>
  );
};

export default Page;
