export const getAllOrders = async () => {
  try {
    const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

    const baseUrl = process.env.NEXT_PUBLIC_WOO_URL;

    const url = `${baseUrl}/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

    const response = await fetch(url);

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(
        `Failed to fetch orders: ${JSON.stringify(responseError)}`
      );
    }

    const orders = await response.json();

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};
