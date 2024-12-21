export const fetchProducts = async () => {
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            auth: {
                username: process.env.NEXT_PUBLIC_CONSUMER_KEY,
                password: process.env.NEXT_PUBLIC_CONSUMER_SECRET
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`),
            },
            params: {
                per_page: 100,
                stock_status: 'any',
            },
        });
        
        const data = await response.json();
        // console.log('data', data);

        return response;
        // if(data.length){
        //     return data;
        // }

    } catch (error) {
      console.error("Error fetching products:", error);
    }finally{
    //   setLoading(false);
    }
}