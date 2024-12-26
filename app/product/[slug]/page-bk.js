import { fetchProducts } from "@/app/components/lib/fetchProducts";
import { fetchSingleProduct } from "@/app/components/lib/fetchSingleProduct";
import HomeCatProducts from "@/app/components/ui/homeCatProducts";
import SwiperSlider from "@/app/components/ui/swiperSlider";
import Service from "@/app/sections/service";
import Image from "next/image";
import Link from "next/link";

import ClientSay from "@/app/components/ui/ClientSay";
import PdpDesc from "@/app/sections/PdpDesc";
import QuantityInc from "@/app/components/ui/QuantityInc";
import PdpTimer from "@/app/components/ui/PdpTimer";

// Static generation for dynamic slugs
export async function generateStaticParams() {
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products`;

  // Fetching the list of products
  const response = await fetchProducts();

  const data = await response.json();

  const slugs = data.map((product) => `${product.slug}`);

  // console.log('slugs', slugs);
  return slugs.map((slug) => ({
    slug,
  }));
}

// Server Component for product details page
export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // Fetching the product data based on the slug
  const product = await fetchSingleProduct(slug);
  const productDetailsdata = product[0];

  // if(window.innerWidth < 766){
  //   console.log("first")
  // }

  if (!product) {
    return <div>Product not found</div>;
  }

  const headings = [
    {
      title: "Update your Basket",
    },
  ];
  const headings2 = [
    {
      title: "Similar Products",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-6 md:gap-12">
            <div className="col-span-12 md:col-span-6">
              {/* {productDetailsdata.images &&
                productDetailsdata.images.map((item, index) => (
                  <Image className={`aspect-[608/480] object-cover object-center rounded-2xl w-full`}
                    key={`${item.src}-${index}`} 
                    src={item.src} 
                    width={608} 
                    height={480} 
                    alt={`Product image ${index + 1}`}
                  />
                ))
              } */}
              <SwiperSlider images={productDetailsdata.images} />
            </div>

            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-col">
                <div className="grid grid-cols-4">
                  <div className="col-span-3 cats flex felx-wrap gap-2">
                    {productDetailsdata.categories &&
                      productDetailsdata.categories.map((item, index) => (
                        <Link
                          href={`/${item.slug}`}
                          key={`catKey-${item.slug}`}
                          className={`text-sm text-primary hover:text-primary-hover transition-colors`}
                        >
                          {item.name}
                          {index < productDetailsdata.categories.length - 1
                            ? ", "
                            : ""}
                        </Link>
                      ))}
                  </div>
                  <div className="star flex items-center gap-2 justify-end md:hidden">
                    <span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_234_570)">
                          <path
                            d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                            fill="#FF9D00"
                            stroke="#FF9D00"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_234_570">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span>4.9</span>
                  </div>
                </div>

                <h1
                  className={`text-lg md:text-3xl lg:text-[44px] lg:leading-[50px] font-semibold md:mt-3`}
                >
                  {productDetailsdata.name}
                </h1>

                {productDetailsdata?.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetailsdata?.description,
                    }}
                    className={`text-sm text-black text-opacity-50 mt-2 `}
                  />
                )}

                <div className="hidden md:flex items-center gap-2 flex-row flex-wrap text-[14px] text-raisinBlack mt-5">
                  <span className="flex">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_234_570)">
                        <path
                          d="M9.15238 2.29628L10.3256 4.66208C10.4856 4.99141 10.9122 5.30729 11.2722 5.36778L13.3986 5.72399C14.7585 5.95251 15.0784 6.94723 14.0985 7.92849L12.4454 9.59529C12.1654 9.87756 12.0121 10.422 12.0987 10.8118L12.5721 12.8752C12.9453 14.5084 12.0854 15.1402 10.6522 14.2866L8.65912 13.097C8.29918 12.8819 7.70592 12.8819 7.33925 13.097L5.34616 14.2866C3.91965 15.1402 3.05308 14.5016 3.42638 12.8752L3.89966 10.8118C3.98631 10.422 3.833 9.87756 3.55302 9.59529L1.89988 7.92849C0.926651 6.94723 1.23995 5.95251 2.5998 5.72399L4.72623 5.36778C5.07952 5.30729 5.50614 4.99141 5.66612 4.66208L6.83932 2.29628C7.47925 1.01257 8.51912 1.01257 9.15238 2.29628Z"
                          fill="#FF9D00"
                          stroke="#FF9D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_234_570">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <span className="inline-block relative after:content-['•'] after:text-raisinBlack after:absolute after:right-[-1rem] mr-[1rem]">
                    (4.9 Stars)
                  </span>

                  <span className="">425 Reviews</span>
                </div>

                {/* variants price */}
                <div className="hidden md:flex items-center gap-1 font-semibold mt-5">
                  <div className="text-lg lg:text-2xl ">
                    <span>₹440 </span>-<span> ₹2621</span>|
                  </div>
                  <div className="text-sm lg:text-lg">
                    <span>500g </span>-<span> 1kg</span>
                  </div>
                </div>

                <p className="hidden md:flex font-medium text-xs lg:text-[14px] gap-1 items-center text-primary mt-3">
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src={`/assets/icons/delivery.svg`}
                      alt="Delivery icon"
                    />
                  </span>
                  <span>Delivery in 90 mins</span>
                </p>

                {/* selcting attr like weight  */}
                <div className="  text-black mt-[18px]">
                  <p>Weight</p>
                  <div className="flex gap-3 text-sm mt-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="variation"
                        className="peer hidden"
                      />
                      <span className="peer-checked:bg-primary peer-checked:text-white px-2 py-[6px] rounded-md border">
                        500g
                      </span>
                    </label>

                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="variation"
                        className="peer hidden"
                      />
                      <span className="peer-checked:bg-primary peer-checked:text-white px-2 py-[6px] rounded-md border">
                        1kg
                      </span>
                    </label>
                  </div>
                </div>

                {/* timer  */}
                <PdpTimer />

                {/* Checkout buttons */}
                <div className="mt-5 flex gap-[14px] flex-row flex-wrap">
                  <QuantityInc />
                  <button className="border text-xs lg:text-base border-raisinBlack rounded-[10px] flex-1 p-3 lg:p-4 hover:bg-primary hover:text-white transition-all hover:border-primary">
                    Add to Cart
                  </button>
                  <button className="rounded-[10px] text-xs lg:text-base w-full p-3 lg:p-4 bg-primary hover:bg-primary-hover text-white transition-all">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* position fixed part */}

              <div className="fixedATC fixed w-full bottom-0 left-0 bg-secondary p-5 z-50 grid grid-cols-2 md:hidden transition-all" >
                <div className="">
                  <p className="text-xs">Total Price</p>

                  <div className="productCardPricing flex justify-start items-center gap-2 mt-2">
                    {productDetailsdata.price && (
                      <p className="discountedPrice text-lg font-semibold">
                        {" "}
                        ₹{productDetailsdata.price}{" "}
                      </p>
                    )}

                    {productDetailsdata.on_sale &&
                      productDetailsdata.regular_price && (
                        <del className="originalPrice text-lg text-black opacity-50 font-medium">
                          ₹{productDetailsdata.regular_price}
                        </del>
                      )}

                    {productDetailsdata.on_sale &&
                      productDetailsdata.regular_price && (
                        <p className="discount text-sm">
                          {(
                            ((productDetailsdata.regular_price -
                              productDetailsdata.price) /
                              productDetailsdata.regular_price) *
                            100
                          ).toFixed()}
                          % Off
                        </p>
                      )}
                  </div>

                  <p className="text-xs mt-2">
                    MRP:{" "}
                    {productDetailsdata.on_sale &&
                      productDetailsdata.regular_price && (
                        <del className="originalPrice font-medium">
                          ₹{productDetailsdata.regular_price}
                        </del>
                      )}{" "}
                    (incl. of all taxes)
                  </p>
                </div>

                <div className="flex items-end flex-col">
                  <button
                    className={`text-white text-base leading-tight rounded-xl py-[12px] px-4 bg-[#FF5D58] hover:bg-[#f13832] flex items-center gap-2  h-fit w-fit`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    </svg>
                    Add to cart
                  </button>
                  <p className=" font-medium text-xs gap-1 flex items-center text-primary mt-2">
                    <span>
                      <Image
                        width={16}
                        height={16}
                        src={`/assets/icons/delivery.svg`}
                        alt="Delivery icon"
                      />
                    </span>
                    <span>Delivery in 90 mins</span>
                  </p>
                </div>
              </div>
              {/* position fixed part end */}
              
            </div>
          </div>
        </div>
      </section>

      {/* categories ProductCard "Update your basket" */}
      <div className="md:hidden">
        <HomeCatProducts cat_id="19" headings={headings} />
      </div>

      {/* Why Giggs */}
      <Service bgColor={`#FFE7E6`} alignCenterHeading={true} />

      {/* our client say */}
      <ClientSay />

      {/* categories ProductCard "Similar Products" */}
      <HomeCatProducts cat_id="19" headings={headings2} />

      {/* pdp description page */}
      <PdpDesc />
    </>
  );
}
