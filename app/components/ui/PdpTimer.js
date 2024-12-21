"use client";
import React, { useEffect, useState } from "react";

const PdpTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-12-15T19:51:59").getTime(); 
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {Object.values(timeLeft).some((val) => val > 0) && (
        <div className="bg-[#F8F8F7] px-4 lg:px-8 py-5 mt-6 lg:w-full 2xl:w-9/12 rounded-lg flex flex-row flex-wrap gap-y-3 items-center justify-between border border-[#DADADA66] ">
          
          <div className="">
            <p className="text-sm mb-2">Hurry! The sale ends in</p>

            <div className="flex gap-2 items-start">
              <div className="text-center">
                <p className="font-medium">
                  {String(timeLeft.days).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-50">Days</p>
              </div>
              <span>:</span>
              <div className="text-center">
                <p className="font-medium">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-50">Hours</p>
              </div>
              <span>:</span>
              <div className="text-center">
                <p className="font-medium">
                  {String(timeLeft.mins).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-50">Mins</p>
              </div>
              <span>:</span>
              <div className="text-center">
                <p className="font-medium">
                  {String(timeLeft.secs).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-50">Secs</p>
              </div>
            </div>
          </div>

          <div className="lg:border-l border-[#DADADA66] lg:pl-6">
            <p className="text-sm ">This item is selling fast!</p>
            <div className="mt-4 w-40 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-primary w-8/12 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdpTimer;
