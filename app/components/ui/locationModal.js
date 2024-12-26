import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const locationImg =
  "https://www.giggs.in/wp-content/themes/giggsmeatbasket/nexgi-inc/assets/img/pincode-modal-img.svg";
const locationImg2 =
  "https://www.giggs.in/wp-content/themes/giggsmeatbasket/assets/img/cities/delhi.png";
const locationModal = ({ closeLocationModal }) => {
  return (
    <div className="fixed    font-maven inset-0 bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center z-[300]">
      <div className=" flex flex-col relative items-center gap-5  my-2     w-[93%]  md:max-w-[500px] text-center bg-white rounded-md overflow-y-auto  max-h-screen">
        <form className=" flex flex-col md:flex-row gap-4 md:gap-10 items-center  p-[15px]    md:p-8  ">
          <p className=" absolute top-1  right-2  md:top-2 md:right-3 ">
            <RxCross2
              size={22}
              onClick={() => closeLocationModal()}
              className="  cursor-pointer"
            />
          </p>
          <div>
            <Image
              width={147}
              height={150}
              src={locationImg}
              alt="locationImg"
              className=" max-w-[147px] "
            />
          </div>
          <div className=" flex flex-col  gap-2 lg:max-w-[218px] ">
            <label htmlFor="" className=" text-[##484848] lg:text-start">
              Please enter your pincode to check service availability in your
              area. <span className="text-[#ff5d58]">*</span>
            </label>
            <div>
              <input
                type="text"
                placeholder="E.g:110059"
                className=" py-[7px] px-3  w-full placeholder:text-[#828a90] placeholder:text-sm     leading-none  rounded-2xl  border border-[#ced4da]"
              />
            </div>
            <button className=" py-[16px] px-[18px] text-white font-medium rounded-2xl  leading-none mt-2 w-full bg-primary hover:bg-primary-hover">
              Check pincode
            </button>
          </div>
        </form>
        <hr className="border-t border-gray-300 w-full" />

        <div className=" flex flex-col gap-5 items-center   p-[15px]  ">
          <div className=" flex flex-col gap-1 items-center">
            <p>
              <Image
                width={41}
                height={50}
                src={locationImg2}
                alt="locationImg2"
                className=" max-w-10"
              />
            </p>
            <p className=" text-sm font-medium">Delhi</p>
          </div>
          <div className=" text-xs ">
            <strong>Note</strong>: <span>For other city please</span>
            <Link
              href={"/contact-us"}
              onClick={() => closeLocationModal()}
              className=" ml-1"
            >
              <span className=" text-primary cursor-pointer hover:text-primary-hover">
                contact us
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default locationModal;
