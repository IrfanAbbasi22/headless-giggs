"use client";
import React, { useState, useEffect } from "react";
import { TfiMenuAlt } from "react-icons/tfi";

import { PiSignOut } from "react-icons/pi";
import Order from "./orders/page";
import Addresses from "./addresses/addresses";
import RemoveModal from "../components/ui/removeModal";
import { MdFilterListAlt } from "react-icons/md";

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
const MENU_ITEMS = [
  {
    id: 1,
    label: "My orders",
    icon: <TfiMenuAlt className="text-base lg:text-xl cursor-pointer" />,
    link: "/my-account/orders",
    tabKey: "myOrders",
  },
  {
    id: 2,
    label: "My addresses",

    icon: <SlLocationPin className="text-base lg:text-xl cursor-pointer" />,

    link: "/my-account/addresses",
    tabKey: "myAddresses",
  },
];
const userLogin = Cookies.get("user_token");
const MyAccount = () => {
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

  const [activeTab, setActiveTab] = useState("myOrders");
  const activeMenuItem = MENU_ITEMS.find((item) => item.tabKey === activeTab);

  // Component to display based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "myOrders":
        return <Order />;
      case "myAddresses":
        return <Addresses />;
      default:
        return <Order />;
    }
  };

  return (
    <div className=" py-4 lg:py-10">
      <div className=" container mx-auto px-5">
        <div className=" flex  justify-between border-b py-3  ">
          <h3 className=" text-base lg:text-2xl font-medium lg:font-bold">
            {activeMenuItem?.label || "My Account"}
          </h3>

          {userData?.name?.length > 0 && (
            <h4 className=" text-sm lg:text-xl  lg:font-semibold">
              {userData.name}
            </h4>
          )}
        </div>

        <div className=" grid grid-cols-12  mt-5 lg:mt-7 ">
          <div className="  col-span-12 lg:col-span-3">
            <ul className="lg:sticky lg:top-24 grid  grid-cols-1 gap-3 lg:gap-6 py-3  lg:py-5  font-medium">
              {MENU_ITEMS.map((item) => (
                <React.Fragment key={item.id}>
                  {/* lg screens */}
                  {item.tabKey && (
                    <li
                      onClick={() => setActiveTab(item.tabKey)}
                      className="hidden lg:grid grid-cols-2 lg:grid-cols-1 items-center"
                    >
                      <div className="flex items-center gap-2 lg:gap-3">
                        <span>{item.icon}</span>
                        <span className="text-base lg:text-xl cursor-pointer">
                          {item.label}
                        </span>
                      </div>
                      <span className="place-items-end lg:hidden">
                        <Image
                          src={`/assets/icons/right-arrow-icon.svg`}
                          alt="RightArrow"
                          height={16}
                          width={16}
                        />
                      </span>
                    </li>
                  )}

                  {/* sm screens */}
                  {item.link && (
                    <Link
                      href={item.link}
                      className="grid grid-cols-2 lg:grid-cols-1 lg:hidden items-center"
                    >
                      <div className="flex items-center gap-2 lg:gap-3">
                        <span>{item.icon}</span>
                        <span className="text-base lg:text-xl cursor-pointer">
                          {item.label}
                        </span>
                      </div>
                      <span className="place-items-end lg:hidden">
                        <Image
                          src={`/assets/icons/right-arrow-icon.svg`}
                          alt="RightArrow"
                          height={16}
                          width={16}
                        />
                      </span>
                    </Link>
                  )}
                  <hr className=" lg:hidden" />
                </React.Fragment>
              ))}
              <li
                onClick={openLogoutModal}
                className="flex items-center gap-2 lg:gap-3 cursor-pointer"
              >
                <span>
                  <PiSignOut className="text-base lg:text-xl" />
                </span>
                <span className="text-base lg:text-xl">Sign out</span>
              </li>
              <hr className=" lg:hidden" />
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

          <div className=" hidden lg:inline-block col-span-9 border-l">
            <div className=" grid grid-cols-12">
              <div className="    col-span-12    py-3 lg:py-5  flex flex-col gap-3 lg:gap-9">
                <div className=" flex flex-col  gap-1 ">
                  <div>{renderContent()}</div>
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
