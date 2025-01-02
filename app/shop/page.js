import ProductList from "../components/ui/productList";

const Page = () => {
  return (
    <>
      <ProductList basePath="/shop" allowedCategoryIds={[19, 21, 17, 22, 18, 16]} perPage={24}/>
    </>
  );
};

export default Page;
