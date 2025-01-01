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
                <a href={dish.redirect} target="_blank" rel="noreferrer" className="group overflow-hidden aspect-[345/251] inline-block w-full rounded-lg">
                  <Image width={345} height={251}
                    src={dish.img}
                    alt={dish.title}
                    className="w-full object-cover group-hover:scale-110 transition-all"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                    <Image width={45} height={45}
                      src={`/assets/icons/youtube-icon.svg`}
                      alt="YouTube"
                      className=" cursor-pointer"
                    />
                  </div>
                </a>
              </div>
              <div className="flex flex-col gap-1 md:max-w-[80%]">
                <a href={dish.redirect} target="_blank" rel="noreferrer" className="font-semibold text-xl hover:text-primary transition-all max-w-max">
                    {dish.title}
                </a>
                <p className="font-normal text-[#00000080] text-sm">
                  {dish.text}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default VideoCard;
