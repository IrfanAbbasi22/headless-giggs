export const fetchProducts = async (options = {}) => {
  const {
    perPage = 99,
    curPage = 1,
    category,
    search,
    order,
    orderby,
    include,
    exclude,
  } = options;

  try {
    const params = new URLSearchParams({
      status: "publish",
      per_page: perPage,
      page: curPage,
    });

    if (category) params.append("category", category);
    if (search) params.append("search", search);
    if (order) params.append("order", order);
    if (orderby) params.append("orderby", orderby);
    if (exclude) params.append("exclude", exclude);
    if (include) params.append("include", include);
    let url = `${
      process.env.NEXT_PUBLIC_WOO_URL
    }/wc/v3/products?${params.toString()}`;

    // return;
    const productData = {
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

    const response = await fetch(url, productData);

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError.error);
    }

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
