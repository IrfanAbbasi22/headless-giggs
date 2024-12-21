import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
const ServiceCard = ({ serviceData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <div className="grid gap-4 md:gap-12  items-center   grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mt-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-full flex flex-col  text-center items-center justify-center  gap-2"
              >
                <div className="   w-full">
                  {" "}
                  <Skeleton height={120} width="80%" borderRadius="16px" />
                </div>
                <div className="    w-full leading-none mt-1">
                  <Skeleton height={30} width="60%" />
                </div>
                <div className=" w-full   leading-none">
                  <Skeleton className="mb-[2px]" height={8} width="60%" />
                  <Skeleton className="mb-[2px]" height={8} width="80%" />
                  <Skeleton className="mb-[2px]" height={8} width="60%" />
                </div>
              </div>
            ))
          : serviceData.map((service, index) => (
              <div
                key={index}
                className="w-full flex flex-col items-center md:gap-6  gap-2"
              >
                <div className="">
                  <Image width={119} height={118}
                    src={service.icon}
                    alt={service.title}
                    className=" rounded-md"
                  />
                </div>
                <div className=" flex flex-col gap-1 md:gap-3  items-center text-center     ">
                  <Link href={"/"}>
                    <h4 className=" font-semibold text-xs md:text-xl cursor-pointer">
                      {service.title}
                    </h4>
                  </Link>
                  <p className=" text-[8px] font-normal   md:text-xs">
                    {service.text}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default ServiceCard;
