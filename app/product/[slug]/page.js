import { fetchSingleProduct } from "@/app/components/lib/fetchSingleProduct";
import Service from "@/app/sections/service";
import Link from "next/link";

import ClientSay from "@/app/components/ui/ClientSay";
import PdpDesc from "@/app/sections/PdpDesc";
import ProductDetailsHero from "@/app/components/ui/productDetailsHero";
import SwiperRelatedProducts from "@/app/components/ui/swiperRelatedProducts";

// export const revalidate = 10;
// export const dynamicParams = true; 

// Static generation for dynamic slugs
export async function generateStaticParams() {
  // console.log('Fetching product slugs from WooCommerce...');
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products`;
  
  let slugs = [];
  let page = 1;
  const perPage = 100; // Max number of products per page

  while (true) {
    const response = await fetch(`${url}?status=publish&page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(
          `${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`
        ),
      },
    });

    const data = await response.json();
    
    if (data.length === 0) break; // No more products, exit loop
    
    // Extract the slugs from the response data
    const pageSlugs = data.map((product) => `${product.slug}`);
    slugs = [...slugs, ...pageSlugs];
    
    page++; // Move to the next page
  }

  // console.log('Slugs:', slugs, 'Total Products:', slugs.length);
  
  return slugs.map((slug) => ({
    slug,
  }));
}

// Server Component for product details page
export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // Fetching the product data based on the slug
  const product = await fetchSingleProduct(slug);  

  // console.log('product', product[0].status);
  if (product === null || product === undefined) {
    return <>
      <main className="min-h-[70dvh] bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-[380px] md:max-w-md space-y-6 text-center">
          {/* Animated Icon */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-x w-10 h-10 sm:w-12 sm:h-12 text-primary"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/><path d="m17 13 5 5m-5 0 5-5"/></svg>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary/10 rounded-full blur-sm" />
          </div>

          {/* Content */}
          <div>
            <h1 className="text-lg font-semibold md:text-2xl tracking-tight">
              Product Not Found
            </h1>
            <p className="mt-1 text-base font-normal text-grayCustom max-w-[280px] sm:max-w-none mx-auto">
              We couldn&apos;t locate the product you&apos;re looking for. It might have been moved or is no longer available.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-5 h-5"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:text-white text-sm hover:bg-primary px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    </>;
  }
  const productDetailsdata = product[0];

  // console.log('productDetailsdata', productDetailsdata)

  return (
    <>
      {/* Hero Section */}
      <ProductDetailsHero  productDetailsdata={productDetailsdata}/>

      {/* Why Giggs */}
      <Service bgColor={`#FFE7E6`} alignCenterHeading={true} />

      {/* our client say */}
      <ClientSay />

      <SwiperRelatedProducts excludeID={productDetailsdata?.id} productIDs={productDetailsdata?.related_ids} heading={`Similar Products`} />

      {/* pdp description page */}
      {productDetailsdata?.description && (
        <PdpDesc data={productDetailsdata?.description} />
      )}
    </>
  );
}
