import Link from "next/link";
import React from "react";
import Image from "next/image";
const page = () => {
  const downloads = [
    {
      img: "/assets/images/googleplay.png",
      Link: "https://play.google.com/store/apps/details?id=com.in.nexgi.startar",
    },
    {
      img: "/assets/images/appstore.png",
      Link: "https://apps.apple.com/in/app/startar/id1601759164",
    },
  ];
  return (
    <>
      <section className="py-4  bg-lightGray lg:py-10">
        <div className="container overflow-hidden ">
          <div className="">
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2  ">
              <div className=" flex flex-col gap-2  lg:gap-4 items-center text-center lg:text-start lg:items-start">
                <h2 className="  text-lg font-semibold lg:font-bold   lg:text-4xl ">
                  Use mobile app for better performance
                </h2>
                <p className=" text-xs lg:text-lg">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>

                <div className="flex items-center gap-2 mt-2 lg:mt-4 ">
                  {downloads.map((item, index) => (
                    <Link key={index} href={item.Link}>
                      <Image
                        width={137}
                        height={37}
                        src={item.img}
                        alt={`Download from ${index.item}`}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative  flex flex-col items-center">
                <svg
                  className="absolute bottom-12  left-1/2 -translate-x-1/2  text-primary w-96 "
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
                <Image
                  width={220}
                  height={150}
                  className="relative "
                  src="/assets/images/mobile-img.png"
                  alt="mobile"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
