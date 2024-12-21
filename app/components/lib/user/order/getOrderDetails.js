export const getOrderDetails = async (id, token) => {
  
  try {
      const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/v1/order/${id}`;
      
      const orderData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Basic ' + btoa(`${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`),
            'Authorization': `Bearer ${token}`,
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
