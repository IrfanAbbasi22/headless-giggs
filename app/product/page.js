"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/components/lib/fetchProducts";
import ProductCard from "@/app/components/ui/productCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect( ()=>{
    const fetchData = async () => {
      const products = await fetchProducts();
      // console.log('prData', products);

      if(products?.length){
        setProducts(products);
      }
      setLoading(false);
    };

    fetchData();
  }, [])

  if (loading) {
    return <div className="container flex flex-wrap gap-5 mx-auto text-center items-center justify-center">Loading products...</div>;
  }

  return (
    <div className="container gap-5 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.length ? 
          products.map((product, index) => (
            <ProductCard key={`productCard${index}`} product={product}   />
          )) : (
            'Products Not Found'
          )
        
        }
    </div>
  )
}

export default Shop