export const fetchProducts = async (perPage = 99, curPage = 1, category) => {
  // const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products`;

  try {
    let url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products?per_page=${perPage}&page=${curPage}`;

    if (category) {
      url += `&category=${category}`;
    }

    // const response = await fetch(
    //   `${url}?per_page=${perPage}&page=${curPage}&category=${category}`,

    const productData = {
      method: "GET",
      auth: {
        username: process.env.NEXT_PUBLIC_CONSUMER_KEY,
        password: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            `${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`
          ),
      },
    };

    const response = await fetch(url, productData);

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError.error);
    }
    // const responseData = await response.json();
    // return responseData;
    // const data = await response.json();
    // console.log('data', data);

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
