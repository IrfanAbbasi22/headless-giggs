import Cookies from "js-cookie";

export const handleUserLogin = async (isRegistered, otpToken) => {
  try {
    const url = isRegistered
      ? `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/login/otp-token`
      : `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/register/otp-token`;

    const userData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp_token: otpToken,
      }),
    };

    const response = await fetch(url, userData);

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error("Failed to request the OTP");
    }

    const responseData = await response.json();
    Cookies.set("user_token", responseData.user_token, { expires: 365 * 10 });

    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
  }
};