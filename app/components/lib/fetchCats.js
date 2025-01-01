export const fetchCats = async () => {
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products/categories`;

  // Check if data is already cached in sessionStorage
  const cachedCategories = sessionStorage.getItem('productCats');
  if (cachedCategories) {
    // If cached data exists, return it
    return JSON.parse(cachedCategories);
  }

  try {
    // If no cached data, fetch from the API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(
          `${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`
        ),
      },
    });

    const data = await response.json();

    // Cache the data in sessionStorage for future use
    sessionStorage.setItem('productCats', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of an error
  }
};
