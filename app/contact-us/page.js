"use client";
import Link from "next/link";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      console.log("Form submitted successfully:", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only numeric input for phone field
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <section className="py-4 bg-lightGray lg:py-10">
      <div className=" container  flex flex-col  items-center ">
        <div className="">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Contact us
            </h2>
          </div>

          <div className="max-w-5xl  mt-12 sm:mt-16">
            <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
              <div className="overflow-hidden bg-white rounded-xl">
                <div className="p-6 flex items-center flex-col gap-7">
                  <svg
                    className="flex-shrink-0 w-10 h-10   text-gray-400 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ff5d58"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <Link
                    href={"tel:78XXXXXXXX"}
                    className=" text-lg font-medium leading-relaxed text-gray-900 cursor-pointer hover:text-primary"
                  >
                    78XXXXXXXX
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden bg-white rounded-xl">
                <div className="p-6 flex flex-col items-center gap-7">
                  <svg
                    className="flex-shrink-0 w-10 h-10  text-gray-400 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ff5d58"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <Link
                    href={"mailto:contact@nexgi.com"}
                    className=" text-lg font-medium leading-relaxed text-gray-900 cursor-pointer hover:text-primary"
                  >
                    contact@nexgi.com
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden bg-white rounded-xl">
                <div className="p-6 flex items-center flex-col gap-7">
                  <svg
                    className="flex-shrink-0 w-10 h-10  text-gray-400 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ff5d58"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <p className=" text-lg font-medium leading-relaxed text-gray-900 ">
                    A 67 S/F, KH. 81 , NEB Sarai, South Delhi, Delhi, 110068
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden bg-white rounded-xl">
              <div className="px-6 py-12 sm:p-12">
                <h3 className="text-3xl font-semibold text-center text-gray-900">
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit} className="mt-14">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                    <div className="  flex flex-col gap-[10px]">
                      <label
                        htmlFor="contactName"
                        className="text-base font-medium text-gray-900"
                      >
                        Name <span className=" text-red-400">*</span>
                      </label>
                      <div className=" relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          id="contactName"
                          placeholder="Enter your full name"
                          className=" w-full px-4 py-4 text-black placeholder-gray-500  bg-white border focus:border-primary focus:outline-none  rounded-md  "
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="  flex flex-col gap-[10px]">
                      <label
                        htmlFor="contactEmail"
                        className="text-base font-medium text-gray-900"
                      >
                        Email address <span className=" text-red-400">*</span>
                      </label>
                      <div className=" relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          id="contactEmail"
                          placeholder="Enter your email"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500  bg-white border  rounded-md focus:border-primary focus:outline-none "
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="  flex flex-col gap-[10px]">
                      <label
                        htmlFor="contactPhone"
                        className="text-base font-medium text-gray-900"
                      >
                        Phone number <span className=" text-red-400">*</span>
                      </label>
                      <div className=" relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          id="contactPhone"
                          placeholder="Enter your phone"
                          className=" w-full px-4 py-4 text-black placeholder-gray-500  bg-white border  rounded-md focus:border-primary focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Company name{" "}
                      </label>
                      <div className="mt-2.5 relative">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Enter your full name"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                    </div> */}

                    <div className="sm:col-span-2 flex-col flex gap-4">
                      <label
                        htmlFor="contactMessage"
                        className="text-base font-medium text-gray-900"
                      >
                        Message
                      </label>
                      <div className=" relative">
                        <textarea
                          name="message"
                          id="contactMessage"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          className=" w-full px-4 py-4 text-black placeholder-gray-500  bg-white border  rounded-md resize-y focus:border-primary focus:outline-none "
                          rows="4"
                        ></textarea>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className=" w-full px-4 py-4  text-base font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded-md focus:outline-none hover:bg-primary-hover "
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
