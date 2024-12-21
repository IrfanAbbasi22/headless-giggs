import Cookies from "js-cookie";

export const verifyOTP = async (otpToken, otp) => {
  // console.log("otp token", otpToken);
  // console.log("otp ", otp);
  // const cookieWCHash = Cookies.get('woocommerce_cart_hash');
  // const cookieCartToken = Cookies.get('cart-token');

  try {
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/user/verify-otp`;

    const productData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Cart-Token': cookieWCHash ?? cookieCartToken ?? '',
      },
      body: JSON.stringify({
        otp_token: otpToken,
        otp: otp,
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
