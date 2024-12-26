import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { showUserModal, updateUserFromServer, isSignInVisible } from "../../store/slices/userSlice";
import { cartBillingAddress } from "../../store/slices/cartSlice";

import { toast, Bounce } from 'react-toastify';

// Auth
import { reqOTP, resendOTP } from "@/app/components/lib/user/requestOTP";
import { verifyOTP } from "@/app/components/lib/user/verifyOTP";
import { handleUserLogin } from "@/app/components/lib/user/handleUserLogin";

// UI
import { RxCross2 } from "react-icons/rx";
import DotPulsePreloader from "@/app/components/ui/preloader/dotPulsePreloader";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const SigninModal = () => {
  const router = useRouter(); 
  const curPath = usePathname();
  const dispatch = useDispatch();
  const isShown = useSelector(isSignInVisible);

  const closeModal = () => {
    dispatch(showUserModal(false));

    setInputErrorMessage("");
    setSubmitPreloader(false);
    setIsOtpSent(false);
    setOtp("");
    setReqData({});
    setCountdown(10);
    setIsResendVisible(false);
    setFormData({
      country_ext: "91",
      mobile: "",
      ver_method: "sms",
    });

  }

  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [submitPreloader, setSubmitPreloader] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [reqData, setReqData] = useState({});
  const [countdown, setCountdown] = useState(10);
  const [isResendVisible, setIsResendVisible] = useState(false);

  const countryExt = useSelector(cartBillingAddress);

  // Store data to requrest OTP
  const [formData, setFormData] = useState({
    country_ext: "91",
    mobile: "",
    ver_method: "sms",
  });

  const handlePhoneChange = (value, data) => {
    const countryCode = data.dialCode;
    const phoneNumber = value.replace(`${countryCode}`, '');

    setFormData((prevData) => ({
      ...prevData,
      country_ext: countryCode,
      mobile: phoneNumber,
    }));
  };

  const handleKeyDown = (event) => {
    const isNumeric = /^[0-9]$/.test(event.key) || event.key === "Backspace" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === 'Enter';
    if (!isNumeric) {
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      if (event.target.classList.contains('mobileInput')) {
        handleReqOTP(event)
      }
    }
  };


  useEffect(() => {
    if (isOtpSent && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setIsResendVisible(true);
    }
  }, [countdown, isOtpSent]);

  const mobileInputRef = useRef(null); // Create a reference for the input field
  const otpInputRef = useRef(null); // Create a reference for the input field

  useEffect(() => {
    if(isShown === true){
      if (mobileInputRef.current) {
        mobileInputRef.current.focus();
      }
    }
  }, [isShown])

  useEffect(() => {
    if(isOtpSent === true){
      if (otpInputRef.current) {
        otpInputRef.current.focus();
      }
    }
  }, [isOtpSent])


  const handleReqOTP = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    setInputErrorMessage("");
    setSubmitPreloader(true);

    try {
      const result = await reqOTP(formData);

      if (result?.otp_token) {
        setIsOtpSent(true);
        setReqData(result);
      } else {
        setInputErrorMessage(result?.error || "Failed to send OTP");
      }
    } catch (error) {
      setInputErrorMessage("An error occurred. Please try again later.");
      console.error("Request failed:", error);
    } finally {
      setSubmitPreloader(false);
    }
  };

  const handleResendOTP = async () => {
    setInputErrorMessage("");
    setOtp("");

    setSubmitPreloader(true);
    
    try {
      const result = await resendOTP(reqData);

      if (result?.otp_token) {
        setReqData(result);
        setCountdown(result?.resend_in || 10);
        setIsResendVisible(false);
      } else {
        setInputErrorMessage(result?.message || "Failed to resend OTP");
      }
    } catch (error) {
      setInputErrorMessage("An error occurred. Please try again later.");
      console.error("Resend failed:", error);
    }finally{
      setSubmitPreloader(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setInputErrorMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setInputErrorMessage("");
    setSubmitPreloader(true);
    const otpToken = reqData.otp_token;
    
    try {
      const result = await verifyOTP(otpToken, otp);

      if (result?.otp_token) {
        const loginHandler = await handleUserLogin(result.is_registered, result?.otp_token);

        if(loginHandler?.user_token){
          console.log('asdasdadasdadasdasd', loginHandler?.message)
          toast.success(loginHandler?.message || 'Login successful!', {
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
          // console.log('login message', loginHandler.message );
          dispatch(updateUserFromServer(loginHandler));
          
          if (curPath === '/login') {
            router.push('/my-account');
          }

        }
        
        closeModal();
      } else {
        setInputErrorMessage(result?.message || "Invalid OTP");
      }
    } catch (error) {
      setInputErrorMessage("An error occurred. Please try again later.");
      console.error("Verification failed:", error);
    } finally {
      setSubmitPreloader(false);
    }
  };

  return (
    <>
      {
        isShown &&
        <div className="fixed inset-0  w-full  bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center z-[300]">
          <div className=" bg-white  bottom-0  lg:bottom-auto  lg:max-w-[420px] rounded-t-2xl lg:rounded-2xl py-6 px-4 flex flex-col gap-10 fixed w-full">
            {!isOtpSent ? (
              <>
                <div>
                  <div className=" flex justify-between">
                    <strong className=" text-lg">Sign in</strong>
                    <span>
                      <RxCross2 size={22} className="cursor-pointer"
                        onClick={closeModal}
                         />
                    </span>
                  </div>
                </div>

                <form onSubmit={(e) => handleReqOTP(e)}>
                  <div className="flex flex-col gap-3">
                    <div className="">
                      <PhoneInput
                        country={countryExt?.country?.toLowerCase() ?? 'in'}
                        placeholder="Mobile number"
                        onChange={handlePhoneChange}
                        className={`w-full outline-none`}
                        containerClass={``}
                        inputClass={`!w-full outline-none mobileInput`}

                        inputProps={{
                          onKeyDown: handleKeyDown,
                          ref: mobileInputRef
                        }}
                      />

                      {/* <input ref={mobileInputRef}
                        type="tel"
                        placeholder="Mobile number"
                        className="w-full outline-none py-1"
                        value={formData.mobile}
                        onKeyDown={handleKeyDown}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            mobile: e.target.value,
                          }))
                        }
                      /> */}
                    </div>
                    {inputErrorMessage && (
                      <span className="text-red-400">{inputErrorMessage}</span>
                    )}

                    <div className="flex flex-col items-center gap-4 text-[10px] lg:text-sm">
                      <div className="flex flex-wrap gap-x-1 justify-center">
                        By continuing, you agree to our company&apos;s
                        <Link href={"/terms-and-conditions"}>
                          <strong className="text-primary">
                            Terms and conditions
                          </strong></Link> and 
                          <Link href={"/privacy-policy"}> <strong className="text-primary">Privacy Policy</strong> </Link>
                      </div>

                      <button type="submit"
                          className={`py-3 px-10 text-base font-semibold rounded-lg bg-primary max-w-fit relative
                              ${submitPreloader ? 'text-primary' : 'text-white'} disabled:opacity-80
                          `} disabled={!formData?.mobile || submitPreloader}
                      >
                        Send OTP

                        {
                          submitPreloader && 
                          <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <DotPulsePreloader color={'#ffffff'} />
                          </div>
                        }
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div className=" flex flex-col gap-9">
                  <div className=" flex flex-col gap-1 ">
                    <div className=" flex justify-between">
                      <span className="text-lg">OTP Verification</span>
                      <span>
                        <RxCross2 size={22} className="cursor-pointer"
                          onClick={closeModal}
                        />
                      </span>
                    </div>
                    <p>Enter 6-digit OTP sent to +91 {formData.mobile}</p>
                  </div>
                  <div className=" flex flex-col gap-4">
                    <div className="  border-b">
                      <input
                        type="text" ref={otpInputRef}
                        placeholder="Please Enter OTP"
                        className="w-full outline-none py-1"
                        value={otp}
                        onKeyDown={handleKeyDown}
                        maxLength={6}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>

                    <div className="text-sm -mt-3 text-opacity-70 text-black">
                      {inputErrorMessage && (
                        <p className="text-red-400">{inputErrorMessage}</p>
                      )}

                      {/* Resend Counter/CTA */}
                      {!isResendVisible && (
                        <p>
                          Resend in: {countdown > 0 ? `${countdown}s` : "00s"}
                        </p>
                      )}

                      {isResendVisible && (
                        <p>
                          Didn&apos;t get the code?
                          <button type="button"
                            onClick={handleResendOTP}
                            className={`ml-1 font-medium text-primary disabled:opacity-70`}
                            disabled={submitPreloader}
                          >
                            Resend OTP
                          </button>
                        </p>
                      )}

                    </div>
                    
                    {/* Verify CTA */}
                    <div className=" flex  flex-col items-center gap-3  ">
                      <button type="submit"
                          className={`py-3 px-10 text-base font-semibold rounded-lg bg-primary max-w-fit relative
                              ${submitPreloader ? 'text-primary' : 'text-white'} disabled:opacity-80
                          `} disabled={!otp || otp.length !== 6 || submitPreloader}
                      >
                        Verify

                        {
                          submitPreloader && 
                          <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <DotPulsePreloader color={'#ffffff'} />
                          </div>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default SigninModal;
