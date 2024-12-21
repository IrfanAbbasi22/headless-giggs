export const fetchProducts = async (perPage = 99, curPage = 1, category) => {
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products`;

  try {
    const response = await fetch(
      `${url}?per_page=${perPage}&page=${curPage}&category=${category}`,

      {
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
      }
    );
    
    // const data = await response.json();
    // console.log('data', data);

    return response;
    // if(data.length){
    //     return data;
    // }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    //   setLoading(false);
  }
};

// export const fetchProducts = async (perPage = 99, curPage = 1, category) => {
//   let url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products?per_page=${perPage}&page=${curPage}`;

//   // Add category if provided
//   if (category) {
//     url += `&category=${category}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Basic " +
//           btoa(
//             `${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`
//           ),
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to fetch products");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching products:", error.message);
//   }
// };
