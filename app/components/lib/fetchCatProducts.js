export const fetchCatProducts = async (categoryId) => {
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products?category=${categoryId}`;
  
  try {
    const response = await fetch(`${url}`, {
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
    });

    const data = await response.json();

    return data;
    // if(data.length){
    //     return data;
    // }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    //   setLoading(false);
  }
};
// const categoryIds = [19, 16]; // Dynamic category IDs
// categoryIds.forEach((categoryId) => fetchCatProducts(categoryId));
