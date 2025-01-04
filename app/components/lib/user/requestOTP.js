export const reqOTP = async (data) => {
  // console.log("country", data.country_ext);
  // console.log("mobile", data);

  try {
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/user/req-otp`;

    const productData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country_ext: data.country_ext ?? "91",
        country_code: data.country_code ?? "",
        mobile_no: data.mobile ?? "",
        ver_method: "sms",
      }),
    };

    const response = await fetch(url, productData);

    if (!response.ok) {
      const responseError = await response.json();
      return responseError;
      
      throw new Error("Failed to request the OTP");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error.message);
    // return error;
  }
};


// Resend OTP
export const resendOTP = async (data) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/user/resend-otp`;

    const productData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp_token: data.otp_token,
        ver_method: "sms",
      }),
    };

    const response = await fetch(url, productData);

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error("Failed to request the OTP");

      // return responseError;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error.message);
  }
};
