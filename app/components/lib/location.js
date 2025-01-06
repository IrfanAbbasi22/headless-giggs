// export const location = async (pincode) => {
//   const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/delivery/check_pincode`;
//   const data = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       cc: pincode,
//     }),
//   };

//   try {
//     const response = await fetch(url, data);
//     if (!response.ok) {
//       const error = await response.json();
//       return error;
//       throw new Error("Failed to get the states!");
//     }

//     const location = await response.json();
//     return location;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const checkPincodeAv = async (pincode) => {
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/delivery/check_pincode`;
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pincode: pincode,
    }),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pincode: pincode,
      }),
    });
    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      return error; // Return the error message if response is not ok
    }

    const location = await response.json();
    console.log(location);
    return location; // Return the location data if response is successful
  } catch (error) {
    console.error(error);
    return null; // Return null in case of an error
  }
};
