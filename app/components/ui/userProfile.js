import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import {
  updateUserFromServer,
  userDetails,
} from "@/app/cart/store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
const userProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(userDetails);
  console.log(user, "userssssssssss");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    gender: user?.gender || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // dispatch(updateUserFromServer({ user_data: formData }));
    // setIsEditing(false);
    console.log("backend discussion");
  };
  return (
    <div className=" lg:px-5 flex flex-col gap-3">
      <div className="  flex items-center justify-between">
        <div className="  flex gap-3 items-center ">
          {" "}
          <Image
            src={`/assets/icons/back-arrow.svg`}
            width={24}
            height={25}
            alt="BackArrow"
            className=" lg:hidden cursor-pointer"
            onClick={() => router.push("/my-account")}
          />
          <h3 className="text-xl font-medium "> My profile</h3>
        </div>

        {isEditing ? (
          <RxCross2
            className="  text-xl  cursor-pointer "
            onClick={() => setIsEditing(false)}
          />
        ) : (
          <CiEdit
            className=" text-xl cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
      <div className="flex flex-wrap  gap-5">
        <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2  relative">
          <label htmlFor="userFirstName" className="text-[#4d4d4d] text-sm">
            First Name
          </label>
          <input
            className={`w-full py-[10px] px-4 border border-[#d9d9d9] rounded-md outline-none transition-all ${
              isEditing ? "focus:border-primary" : ""
            } `}
            type="text"
            name="first_name"
            id="userFirstName"
            placeholder={user?.first_name || "Enter first name"}
            value={formData.first_name}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2  relative">
          <label htmlFor="userLastName" className="text-[#4d4d4d] text-sm">
            Last Name
          </label>
          <input
            className={`w-full py-[10px] px-4 border border-[#d9d9d9] rounded-md outline-none transition-all ${
              isEditing ? "focus:border-primary" : ""
            } `}
            type="text"
            name="last_name"
            id="userLastName"
            placeholder={user?.last_name || "Enter last name"}
            value={formData.last_name}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2  relative">
          <label htmlFor="userEmail" className="text-[#4d4d4d] text-sm">
            Email Address
          </label>

          <input
            className={`w-full py-[10px] px-4 border border-[#d9d9d9] rounded-md outline-none transition-all ${
              isEditing ? "focus:border-primary" : ""
            } `}
            type="email"
            name="email"
            id="userEmail"
            placeholder={user?.email || "Enter email"}
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2  relative">
          <label htmlFor="userMobile" className="text-[#4d4d4d] text-sm">
            Mobile Number
          </label>

          <div className="flex">
            <input
              className="w-full py-[10px] px-4 border border-[#d9d9d9] rounded-md outline-none transition-all "
              type="tel"
              name="phone"
              id="userMobile"
              placeholder={user?.nwe_phone || "Enter mobile number"}
              value={user?.nwe_phone || ""}
              readOnly
            />
          </div>
        </div>
        <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2  relative">
          <p className="text-[#4d4d4d] text-sm"> Gender</p>
          <div className=" flex  gap-2">
            <input
              id="male"
              type="radio"
              name="gender"
              value="Male"
              className="focus:ring-primary accent-primary cursor-pointer"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label
              htmlFor="male"
              className="text-[#4d4d4d] text-sm cursor-pointer"
            >
              Male
            </label>
            <input
              id="female"
              type="radio"
              name="gender"
              value="Female"
              className="focus:ring-primary accent-primary cursor-pointer"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label
              htmlFor="female"
              className="text-[#4d4d4d] text-sm cursor-pointer"
            >
              Female
            </label>
            <input
              id="other"
              type="radio"
              name="gender"
              value="Other"
              className="focus:ring-primary accent-primary cursor-pointer"
              checked={formData.gender === "Other"}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label
              htmlFor="other"
              className="text-[#4d4d4d] text-sm cursor-pointer"
            >
              Other
            </label>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="mt-5">
          <button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark cursor-pointer"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default userProfile;
