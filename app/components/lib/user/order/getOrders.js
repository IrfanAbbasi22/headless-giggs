export const getOrders = async (
  token,
  id,
  perPage = 9,
  curPage = 1,
  status = ""
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/orders?customer=${id}&per_page=${perPage}&page=${curPage}`;
    if (status) {
      url += `&status=${status}`;
    }
    // const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/orders?customer=${id}&per_page=${perPage}&page=${curPage}&status=${status}`;
    const orderData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            `${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`
          ),
      },
    };

    const response = await fetch(url, orderData);

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError.error);

      // return responseError;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error.message);
  }
};
