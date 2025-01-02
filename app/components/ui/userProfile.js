let url = process.env.NEXT_PUBLIC_WOO_URL;
import React, { useState } from "react";

import { CiEdit } from "react-icons/ci";
import DotPulsePreloader from "@/app/components/ui/preloader/dotPulsePreloader";
import {
  updateUserDetails,
  userDataToken,
  userDetails,
} from "@/app/cart/store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { toast, Bounce } from "react-toastify";
const UserProfile = () => {
  const router = useRouter();
  
  const dispatch = useDispatch();
  const user = useSelector(userDetails);
  const userToken = useSelector(userDataToken);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    nwe_phone: user?.nwe_phone || "",
    nwe_user_gender: user?.nwe_user_gender || "",
  });

  const genderOptions = [
    { id: "male", value: "male", label: "Male" },
    { id: "female", value: "female", label: "Female" },
    { id: "other", value: "other", label: "Other" },
  ];

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitPreloader, setSubmitPreloader] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }
    if (!formData.nwe_phone.trim()) {
      newErrors.nwe_phone = "Mobile Number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const validateOnblur = (fieldName) => {
    const newErrors = { ...errors };

    // Validate only the field that was blurred
    if (fieldName === "first_name" && !formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }
    if (fieldName === "nwe_phone" && !formData.nwe_phone.trim()) {
      newErrors.nwe_phone = "Mobile Number is required";
    }
    if (fieldName === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    }

    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    validateOnblur(e.target.name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear the error for the input being updated
    }));
  };

  const handleSave = async (e) => {
    setFormError("");
    setSubmitPreloader(true);

    if (e && e.preventDefault) {
      e.preventDefault(); // Prevent default form submission if event exists
    }

    // Validate all fields before submitting
    const validationErrors = validate();

    // If there are validation errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      setSubmitPreloader(false);
      return;
    }

    console.log(formData);
    try {
      const response = await fetch(`${url}/nwe/v1/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(formData),
      });
      // console.log(formData, "ssssssssss");

      if (!response.ok) {
        const err = await response.json();
        // throw new Error("Failed to update profile");
        setFormError(err.error);
        console.log('this is error', err.error)
      } else {
        const updatedUser = await response.json();
        dispatch(updateUserDetails(updatedUser));

        toast.success(updatedUser?.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error.message || "An error occurred while updating"); 
    }finally{
      setSubmitPreloader(false);
    }
  };
  return (
    <form
      onSubmit={handleSave}>
      <div className=" lg:px-5 flex flex-col gap-10">
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
        <div className="flex flex-wrap  gap-x-5 gap-y-10">
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
              onBlur={handleBlur}
              readOnly={!isEditing}
              disabled={submitPreloader}
            />

              {errors.first_name && (
                <small className="absolute left-0 -bottom-5 text-xs text-red-600">
                  {errors.first_name}
                </small>
              )}
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
              placeholder={`Enter last name`}
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              disabled={submitPreloader}
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
              placeholder={`Enter email`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              disabled={submitPreloader}
            />

              {errors.email && (
                <small className="absolute left-0 -bottom-5 text-xs text-red-600">
                  {errors.email}
                </small>
              )}
          </div>

          <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2  relative">
            <label htmlFor="userMobile" className="text-[#4d4d4d] text-sm">
              Mobile Number
            </label>

            <div className="flex">
              <input
                className="w-full py-[10px] px-4 border border-[#d9d9d9] rounded-md outline-none transition-all "
                type="tel"
                name="nwe_phone"
                id="userMobile"
                placeholder={`Enter mobile number`}
                value={formData.nwe_phone}
                onBlur={handleBlur}
                readOnly
                disabled={submitPreloader}
              />
            </div>
            {errors.nwe_phone && (
              <small className="absolute left-0 -bottom-5 text-xs text-red-600">
                {errors.nwe_phone}
              </small>
            )}
          </div>

          <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2  relative">
            <p className="text-[#4d4d4d] text-sm"> Gender</p>
            <div className="flex gap-2">
              {genderOptions.map((option) => (
                <React.Fragment key={option.id}>
                  <input
                    id={option.id}
                    type="radio"
                    name="nwe_user_gender"
                    value={option.value}
                    className="focus:ring-primary accent-primary cursor-pointer disabled:accent-primary"
                    checked={formData.nwe_user_gender === option.value}
                    onChange={handleChange}
                    disabled={!isEditing || submitPreloader}
                  />
                  <label
                    htmlFor={option.id}
                    className="text-[#4d4d4d] text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {isEditing && (
          <>
            <div className="">
              {formError && (
                <div className="form-group w-full text-sm text-red-600 pt-10 pb-5">
                  {formError}
                </div>
              )}

              <button
                className={`relative bg-primary hover:bg-primary-hover py-3 px-8 rounded-lg font-medium text-base
                    disabled:opacity-50 transition-bg ${
                      submitPreloader
                        ? "text-primary hover:text-primary-hover"
                        : "text-white"
                    }`}
                disabled={submitPreloader}
                type="submit"
              >
                Save Changes
                {submitPreloader && (
                  <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <DotPulsePreloader color={"#ffffff"} />
                  </div>
                )}
              </button>

            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default UserProfile;
