import DotPulsePreloader from "@/app/cart/components/ui/dotPulsePreloader";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const locationImg =
  "/pincode-modal-img.svg";
const locationImg2 =
  "/delhi.png";

const LocationModal = ({ closeLocationModal, setPincodeData, pincodeData }) => {
  const [pincode, setPincode] = useState("");

  const [error, setError] = useState("");
  const [Preloader, setPreloader] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("pincodeData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPincode(parsedData.pincode);
    }
  }, []);

  const checkPincodeAvailability = async () => {
    setPreloader(true);
    setError(""); // Clear any previous error
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      setPreloader(false);
      return;
    }

    try {
      const response = await fetch(
        `https://dev.giggs.in/wp-json/nwe/v1/delivery/check_pincode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pincode }),
        }
      );

      const data = await response.json();

      if (data && data.message) {
        localStorage.setItem("pincodeData", JSON.stringify(data));
        setPincodeData(data);
        closeLocationModal();
      } else {
        setError("Invalid Pincode or Service not available.");
      }
    } catch (error) {
      console.error("Error checking pincode availability:", error);
      setError("Something went wrong. Please try again.");
    }finally{
      setPreloader(false);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkPincodeAvailability();
  };
  return (
    <div className="fixed font-maven inset-0 bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center z-[300]">
      <div className="flex flex-col relative items-center gap-5 my-2 w-[93%] md:max-w-[500px] text-center bg-white rounded-md overflow-y-auto max-h-screen">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col md:flex-row gap-4 md:gap-10 items-center p-[15px] md:p-8 "
        >
          <p className="absolute top-1 right-2 md:top-2 md:right-3">
            <RxCross2
              size={22}
              onClick={() => closeLocationModal()}
              className="cursor-pointer"
            />
          </p>
          <div>
            <Image
              width={147}
              height={150}
              src={locationImg}
              alt="locationImg"
              className="max-w-[147px]"
            />
          </div>
          <div className="flex flex-col gap-2 lg:max-w-[218px]">
            <label htmlFor="" className="text-[##484848] lg:text-start">
              Please enter your pincode to check service availability in your
              area. <span className="text-[#ff5d58]">*</span>
            </label>
            <div>
              <input
                type="text"
                placeholder="E.g:110059"
                className="py-[7px] px-3 w-full placeholder:text-[#828a90] placeholder:text-sm leading-none rounded-2xl border border-[#ced4da]"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className={`py-[16px] px-[18px] font-medium rounded-2xl leading-none mt-2 w-full bg-primary hover:bg-primary-hover relative
                ${Preloader ? "text-primary hover:text-primary-hover" : "text-white"}`}
              
            >
              Check pincode
              {Preloader && (
                <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <DotPulsePreloader color={"#ffffff"} />
                </div>
              )}
            </button>
          </div>
        </form>
        <hr className="border-t border-gray-300 w-full" />

        <div className="flex flex-col gap-5 items-center p-[15px]">
          <>
            <div className="flex flex-col gap-1 items-center">
              <p>
                <Image
                  width={41}
                  height={50}
                  src={locationImg2}
                  alt="locationImg2"
                  className="max-w-10"
                />
              </p>
              {pincodeData ? (
                <p className="text-sm font-medium">{pincodeData.city}</p>
              ) : (
                <p className="text-sm font-medium">City</p>
              )}
            </div>
            <div className="text-xs">
              <strong>Note</strong>: <span>For other city please</span>
              <Link
                href={"/contact-us"}
                onClick={() => closeLocationModal()}
                className="ml-1"
              >
                <span className="text-primary cursor-pointer hover:text-primary-hover">
                  contact us
                </span>
              </Link>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
