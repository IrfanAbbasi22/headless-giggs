"use client"
import { fetchProducts } from '@/app/components/lib/fetchProducts';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  loadCartFromWoo,
  cartDetails,
} from "../../cart/store/slices/cartSlice";
import { addToCartAPI } from '@/app/components/lib/cart/addToCart';
import { toast, Bounce } from "react-toastify";
import { showSideCart } from '@/app/cart/store/slices/sideCartSlice';
import Skeleton from 'react-loading-skeleton';
import ProductCard from "./productCard"
const Products = ({categoryData}) => {

  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [ cartLoading, setCartLoading] = useState(false)
  
  
    // Variation Management
    const [selectedVariation, setSelectedVariation] = useState(null);
    const dispatch = useDispatch();
    const cartDetailsData = useSelector(cartDetails);
    console.log(cartDetailsData)
    const fetchProductsData = async (option = {}) => {
      try {
      
        setFilterLoading(true);
        const productsRes = await fetchProducts(option);
        // console.log(productsRes,"rrrrrrrrrrrrr")
        const productData = await productsRes.json()
        // console.log(productData,"ssssssssssss")
        setProducts(productData)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };


    useEffect(() => {

fetchProductsData({category:categoryData.id})
    }, [categoryData]);


    

  return (
    
      
  <div id={categoryData.id} className="category-section lg:px-8">
    <h3 className="pt-6 py-2 capitalize font-medium lg:text-xl gap-2 sticky top-[6rem] lg:top-[110px] z-20 bg-white">
      <span className=' pr-1'>{categoryData.name}</span>
      <span className="hidden lg:inline-block text-white text-base rounded px-2 bg-primary">
        {categoryData.count}
      </span>
    </h3>
    {
      loading ? (
          <div className="flex gap-3">
          <div className="border relative w-36 lg:max-w-[160px] lg:h-[120px] h-24 rounded-lg flex items-center justify-center">
            {/* Skeleton for image */}
            <Skeleton height={80} width={120} />
          </div>
          <div className="pt-4 flex flex-col gap-1 lg:gap-2 w-full">
            {/* Skeleton for product name */}
            <Skeleton height={20} width="60%" />
            {/* Skeleton for price */}
            <Skeleton height={20} width="20%" />
            <div className="flex justify-between text-sm">
              <div className="flex leading-7 gap-1 text-[15px] lg:text-lg">
                {/* Skeleton for price */}
                <Skeleton height={20} width="30%" />
              </div>
              <div>
                {/* Skeleton for the button */}
                <Skeleton height={30} width="100%" />
              </div>
            </div>
          </div>
        </div>
      ):
       products.length > 0 ? (
        <div className="py-4">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} loading={loading} />
          ))}
        </div>
      ) : (
        <div className="lg:px-4 py-4">No products found</div>
      )
    }
  </div>

      
    
  )
}

export default Products

