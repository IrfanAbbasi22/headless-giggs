"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { RxCross2 } from "react-icons/rx";

import LocationModal from "./locationModal";
import TopBanner from "./topBanner";
import SearchModal from "./searchModal";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import BottomNavbar from "./bottomNavBar";

import { useSelector, useDispatch } from "react-redux";
import { selectedTotalItems } from "../../cart/store/slices/cartSlice";
import { setCurrentStep } from "@/app/cart/store/slices/cartStepsSlice";
import {
  showUserModal,
  isUserLoggedIn,
} from "../../cart/store/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectedTotalItems);
  const userLoggedInStatus = useSelector(isUserLoggedIn);

  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [searchPopUp, setSearchPopUp] = useState(false);
  const [userToggle, setUserToggle] = useState(false);

  const dropdownItems = [
    { label: "All" },
    { label: "Fish" },
    { label: "Mutton" },
    { label: "Ready to Relish" },
    { label: "Cold Cuts" },
    { label: "Imported" },
  ];

  const [offset, setOffset] = useState(0);

  const openLocationModal = () => {
    setLocationModal(true);
  };

  const closeLocationModal = () => {
    setLocationModal(false);
  };
  const openSearchPopUp = () => {
    setSearchPopUp(true);
  };
  const closeSearchPopUp = () => {
    setSearchPopUp(false);
  };

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);

    // console.log(offset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className=" fixed z-30 bg-white  top-0  w-full">
        {offset < 50 && <TopBanner />}
        <main className="container mx-auto px-5  py-4">
          <div className="flex items-center justify-between">
            <div className=" w-1/3  hidden lg:flex items-center gap-12">
              <div onClick={openLocationModal} className=" flex flex-col">
                <div className=" flex gap-1 items-center cursor-pointer">
                  <span>
                    <Image
                      src={`/assets/icons/location.svg`}
                      width={16}
                      height={16}
                      alt="location"
                    />
                  </span>
                  <span className="text-sm  font-medium">Delhi</span>
                  <span>
                    <Image
                      src={`/assets/icons/down-arrow.svg`}
                      width={16}
                      height={8}
                      alt="arrow"
                    />
                  </span>
                </div>
                <span className="text-xs pl-4">4/2851 1st...</span>
              </div>
              <div onClick={openSearchPopUp} className=" hidden lg:block">
                <Image
                  src={`/assets/icons/search.svg`}
                  width={20}
                  height={20}
                  alt="search-icon"
                  className=" cursor-pointer max-w-6 lg:w-6 lg:h-6"
                />
              </div>
            </div>

            {locationModal && (
              <LocationModal closeLocationModal={closeLocationModal} />
            )}
            {searchPopUp && <SearchModal closeSearchPopUp={closeSearchPopUp} />}

            <div className=" w-1/5  justify-center hidden lg:flex">
              <Link href={"/"}>
                <Image
                  src="/logo.svg"
                  priority
                  width={88}
                  height={42}
                  alt="LOGO"
                />
              </Link>
            </div>

            {/* mobile */}
            <div className=" lg:hidden ">
              <Link href={"/"}>
                <Image
                  src={`/assets/images/giggsLogo.png`}
                  width={75}
                  height={36}
                  alt="logo"
                  className="  h-9"
                />
              </Link>
            </div>

            {/* Desktop */}
            <div className="flex gap-6 items-center justify-end md:w-1/3   lg:gap-5  xl:gap-[34px]">
              <span className="hidden lg:block">
                <Link href={"/shop"}>
                  <Image
                    src={`/assets/icons/Categories.svg`}
                    width={20}
                    height={20}
                    alt="icon"
                    className=" cursor-pointer max-w-6 lg:w-6 lg:h-6"
                  />
                </Link>
              </span>
              <Link
                href={`/cart`}
                className="relative"
                onClick={() => {
                  dispatch(setCurrentStep("cart"));
                }}
              >
                {totalItems > 0 && (
                  <span className="absolute -top-[4px] left-[12px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <Image
                  src={`/assets/icons/Cart.svg`}
                  alt="icon"
                  width={20}
                  height={20}
                  className=" cursor-pointer max-w-6 lg:w-6 lg:h-6"
                />
              </Link>

              {userLoggedInStatus ? (
                <Link href={"/my-account"}>
                  <Image
                    className="cursor-pointer relative max-w-6 lg:w-6 lg:h-6 "
                    width={20}
                    height={20}
                    src={`/assets/icons/user.svg`}
                    onClick={() => setUserToggle(!userToggle)}
                    alt="user"
                  />
                </Link>
              ) : (
                <Image
                  className="cursor-pointer max-w-6 lg:w-6 lg:h-6"
                  width={20}
                  height={20}
                  onClick={() => {
                    dispatch(showUserModal(true));
                  }}
                  src={`/assets/icons/Login.svg`}
                  alt="login"
                />
              )}

              {/* {userToggle && (
                <>
                  <div className=" absolute z-50   top-12 right-7  rounded-lg border   bg-white">
                    <ul className=" flex flex-col gap-2   py-2 px-4 text-sm font-medium">
                      <li>
                        <Link
                          href={"/my-account"}
                          onClick={() => setUserToggle(false)}
                          className=" cursor-pointer"
                        >
                          My Account
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setUserToggle(false);
                            logoutUser();
                          }}
                          className=" cursor-pointer bg-primary text-white px-3 py-1 rounded-lg"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )} */}

              <div className="hidden lg:block ">
                <button className="bg-[#FF5D58] text-white font-medium  text-base  py-[14px] px-[18px]  rounded-2xl">
                  Download the App
                </button>
              </div>
            </div>
          </div>

          {/* {toggle && (
            <div className="fixed   lg:hidden inset-0 z-50 bg-white">
              <div className="flex   items-center justify-between p-4">
                <div>
                  <Image
                    width={100}
                    height={50}
                    src={`/assets/images/giggsLogo.png`}
                    alt="logo"
                    className="max-w-[110px]"
                  />
                </div>

                <span onClick={() => setToggle(false)}>
                  <RxCross2 size={22} />
                </span>
              </div>

              <ul className="flex flex-col font-normal   gap-4  py-6 px-6">
                <li className="flex items-center  gap-2">
                  <Image
                    width={16}
                    height={16}
                    src={`/assets/icons/Login.svg`}
                    alt="icon"
                    className="  "
                  />
                  <span className="  text-base ">Login</span>
                </li>
                <li className="flex items-center gap-2">
                  <Image
                    width={16}
                    height={16}
                    src={`/assets/icons/Categories.svg`}
                    alt="icon"
                    className="  "
                  />
                  <span className=" text-base"> Category</span>
                  <Image
                    width={16}
                    height={16}
                    src={`/assets/icons/down-arrow.svg`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    alt="arrow"
                    className="  "
                  />
                </li>

                {dropdownOpen && (
                  <ul className="pl-6 text-sm font-normal flex flex-col gap-4">
                    {dropdownItems.map((item, index) => (
                      <li key={index}>{item.label}</li>
                    ))}
                  </ul>
                )}

                <li>
                  <button
                    className={` ${
                      dropdownOpen === true ? "mt-4" : null
                    }      w-40   bg-[#FF5D58] text-white  h-14 rounded-3xl `}
                  >
                    Download the App
                  </button>
                </li>
              </ul>
            </div>
          )} */}
        </main>
        <BottomNavbar
          openLocationModal={openLocationModal}
          openSearchPopUp={openSearchPopUp}
        />
      </header>
    </>
  );
};

export default Header;
