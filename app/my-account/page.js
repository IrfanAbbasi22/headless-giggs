"use client";
import React, { useState, useEffect, Children } from "react";
import { TfiMenuAlt } from "react-icons/tfi";

import { PiSignOut } from "react-icons/pi";
import Orders from "./comp/orders";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuUser } from "react-icons/lu";
import Addresses from "./comp/addresses";
import RemoveModal from "../components/ui/removeModal";
import { MdFilterListAlt } from "react-icons/md";
import UserProfile from "../components/ui/userProfile";
import Link from "next/link";
import Image from "next/image";
import { useHandleUserLogout } from "@/app/components/lib/user/handleUserLogout";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserLoggedIn,
  showUserModal,
  userDetails,
} from "../cart/store/slices/userSlice";
import { useRouter } from "next/navigation";
import NotLoggedIn from "../cart/components/ui/notLoggedIn";
// import DotPulsePreloader from "../components/ui/preloader/dotPulsePreloader";
import { SlLocationPin } from "react-icons/sl";
import GetAddress from "../cart/components/ui/address/getAddress";

const MENU_ITEMS = [
  {
    id: 1,
    label: "My Profile",
    icon: <LuUser className="text-base lg:text-xl cursor-pointer" />,
    slug: "profile",
  },
  {
    id: 2,
    label: "My orders",
    icon: <RxHamburgerMenu className="text-base lg:text-xl cursor-pointer" />,
    slug: "orders",
  },
  {
    id: 3,
    label: "My addresses",
    icon: <SlLocationPin className="text-base lg:text-xl cursor-pointer" />,
    slug: "addresses",
  },
];

const userLogin = Cookies.get("user_token");
const MyAccount = ({ slug }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isUserLoggedIn);
  const userData = useSelector(userDetails);
  const { handleLogout } = useHandleUserLogout();
  const [logoutModal, setLogoutModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const userLogout = () => {
    handleLogout();
    setLogoutModal(false);
  };
  const openLogoutModal = () => {
    setLogoutModal(true);
  };

  // const [activeTab, setActiveTab] = useState("myOrders");
  const [activeLink, setActiveLink] = useState("myOrders");

  return (
    <div className=" py-4 lg:py-10">
      <div className=" container mx-auto px-5">
        <div className=" flex  justify-between items-center border-b py-3  ">
          {/* <h3 className=" text-base lg:text-2xl font-medium lg:font-bold">
            {activeMenuItem?.label || "My Account"}
          </h3> */}
          <h3 className=" text-base lg:text-2xl font-medium lg:font-bold">
            My Dashboard
          </h3>

          {userData?.name?.length > 0 && (
            <h4 className=" text-sm lg:text-xl  lg:font-semibold">
              {userData.name}
            </h4>
          )}
        </div>

        <div className=" grid grid-cols-12  mt-5 lg:mt-7 ">
          <div className="  col-span-12 lg:col-span-3">
            <ul className="lg:sticky lg:top-24 grid  grid-cols-1 lg:gap-4   lg:py-5  font-medium">
              <>
                {
                  !(slug && window.innerWidth < 992) && (
                    <>
                      {MENU_ITEMS.map((item) => (
                        <React.Fragment key={item.id}>
                          <li
                            onClick={() => router.push(`/my-account/${item.slug}`)} // Navigate using slug
                            className={`lg:text-xl border-b lg:border-b-0 py-2 flex items-center gap-2 lg:gap-3 cursor-pointer ${
                              slug === item.slug ? "lg:border-r-4 lg:border-primary" : ""
                            }`}
                          >
                              {item.icon}
                              {item.label}
                          </li>
                        </React.Fragment>
                      ))}
                    
                      <li
                        onClick={openLogoutModal}
                        className="flex items-center text-base lg:text-xl gap-2 lg:gap-3 cursor-pointer border-b lg:border-b-0 py-2"
                      >
                        <PiSignOut/>
                        Sign out
                      </li>
                    </>
                  )
                }
              </>
            </ul>
          </div>
          {logoutModal && (
            <RemoveModal
              title="Do you want to Sign out?"
              primaryButtonText="Sign out"
              secondaryButtonText="Cancel"
              onClose={() => setLogoutModal(false)}
              onPrimaryAction={userLogout}
              onSecondaryAction={() => setLogoutModal(false)}
              showSecondaryButton={false}
              // deletePreloader={deletePreloader}
            />
          )}

          <div className=" inline-block col-span-12 lg:col-span-9 lg:border-l">
            <div className=" grid grid-cols-12">
              <div className="    col-span-12    py-3 lg:py-5  flex flex-col gap-3 lg:gap-9">
                <div className=" flex flex-col  gap-1  ">
                  {slug === "profile" && <UserProfile slug={slug} />}
                  {slug === "orders" && <Orders slug={slug} />}
                  {slug === "addresses" && <Addresses slug={slug} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
