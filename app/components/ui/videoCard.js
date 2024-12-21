import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

const VideoCard = ({ dishData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 md:mt-10">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full flex flex-col gap-2">
              <Skeleton height={310} width="100%" borderRadius="16px" />
              <Skeleton height={24} width="30%" />
              <Skeleton height={16} width="60%" />
            </div>
          ))
        : dishData.map((dish, index) => (
            <div key={index} className="w-full flex flex-col gap-2">
              <div className="relative">
                <Image width={345} height={251}
                  src={dish.img}
                  alt={dish.title}
                  className="md:w-full h-[251px]  aspect-[345/251] md:h-full object-cover rounded-md cursor-pointer"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  <Image width={45} height={45}
                    src={`/assets/icons/youtube-icon.svg`}
                    alt="YouTube"
                    className=" cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 md:w-[293px] w-40">
                <Link href={"/"}>
                  <h4 className="font-semibold text-xs md:text-xl cursor-pointer">
                    {dish.title}
                  </h4>
                </Link>
                <p className="text-[8px] font-normal text-[#00000080] md:text-xs">
                  {dish.text}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default VideoCard;
