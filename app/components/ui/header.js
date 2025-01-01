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
  const [pincodeData, setPincodeData] = useState(null);

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

  // useEffect(() => {
  //   const onScroll = () => setOffset(window.scrollY);

  //   // console.log(offset);
  //   window.removeEventListener("scroll", onScroll);
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);
  useEffect(() => {
    const storedPincodeData = localStorage.getItem("pincodeData");
    if (storedPincodeData) {
      setPincodeData(JSON.parse(storedPincodeData));
    }
  }, []);

  return (
    <>
      <header className=" fixed z-30 bg-white  top-0  w-full">
        <TopBanner />
        {/* {offset < 50 && <TopBanner />} */}
        <main className="container mx-auto px-5  py-4 ">
          <div className="flex items-center justify-between">
            <div className=" w-1/3  hidden lg:flex items-center gap-12">
              <div onClick={openLocationModal} className=" flex flex-col">
                <div
                  className=" flex gap-1 items-center cursor-pointer"
                  title="Check Delivery"
                >
                  <span>
                    <Image
                      src={`/assets/icons/location.svg`}
                      width={16}
                      height={16}
                      alt="location"
                    />
                  </span>
                  <span className="text-sm font-medium">
                    {pincodeData ? pincodeData.city : "Delhi"}
                  </span>
                  <span>
                    <Image
                      src={`/assets/icons/down-arrow.svg`}
                      width={16}
                      height={8}
                      alt="arrow"
                    />
                  </span>
                </div>
                <span className="text-xs pl-4">
                  {pincodeData
                    ? `${pincodeData.pincode} is deliverable`
                    : "4/2851 1st..."}
                </span>
              </div>
              <div onClick={openSearchPopUp} className=" hidden lg:block">
                <Image
                  src={`/assets/icons/search.svg`}
                  width={20}
                  height={20}
                  alt="search-icon"
                  className=" cursor-pointer max-w-6 lg:w-6 lg:h-6"
                  title="Search"
                />
              </div>
            </div>

            {locationModal && (
              <LocationModal
                closeLocationModal={closeLocationModal}
                pincodeData={pincodeData}
                setPincodeData={setPincodeData}
              />
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
                  className="h-9"
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
                    title="Shop"
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
                  title="See Your Cart"
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
                    title="My Account"
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
                  title="Login/Signup"
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
