import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import Image from "next/image";

const navItems = [
  {
    label: "Home",
    icon: <Image src={`/assets/icons/home.svg`} alt="home_icon" width={20} height={20} className=" " />,
    // additionalClasses: "",
  },
  {
    label: "Categories",
    icon: <Image src={`/assets/icons/Categories.svg`} alt="category_icon" width={20} height={20} />,
    // additionalClasses: "",
  },
  {
    label: "Search",
    icon: <Image src={`/assets/icons/Search.svg`} alt="search_icon" width={20} height={20} />,
    // additionalClasses: "",
    onClick: "openSearchPopUp",
  },
  {
    label: "Location",
    icon: <Image src={`/assets/icons/location.svg`} alt="location_icon" width={20} height={20} />,
    // additionalClasses: "",
    onClick: "openLocationModal",
  },
];

const BottomNavbar = ({ openLocationModal, openSearchPopUp }) => {
  return (
    <nav className="  lg:hidden bg-[#FFE7E6] fixed bottom-0  flex flex-col items-center   z-40 w-full">
      <div className=" flex items-center  justify-between   py-[10px]  max-w-[500px]     px-5  w-full  border-t">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-1 hover:cursor-pointer hover:text-[#FF5D58] `}
          >
            <span
              className=""
              onClick={() => {
                if (item.onClick === "openLocationModal") openLocationModal();
                if (item.onClick === "openSearchPopUp") openSearchPopUp();
              }}
            >
              {item.icon}
            </span>
            <span className=" text-WarmGray  text-xs font-normal">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
