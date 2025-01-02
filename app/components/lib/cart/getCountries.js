export const getCountries = async () => {
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/delivery/countries`;
  const credentials = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Check if data is already cached in sessionStorage
  const cachedCountries = sessionStorage.getItem('countries');
  if (cachedCountries) {
    // If cached data exists, return it
    return JSON.parse(cachedCountries);
  }

  try {
    const response = await fetch(url, credentials);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to get the countries!");
    }

    const countries = await response.json();

    // Cache the data in sessionStorage for future use
    sessionStorage.setItem('countries', JSON.stringify(countries));
    
    return countries;
  } catch (error) {
    console.error(error);
  }
};
