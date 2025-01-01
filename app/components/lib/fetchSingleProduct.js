export const fetchSingleProduct = async (slug) => {
    console.log(slug);
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products?slug=${slug}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`),
            }
        });
        
        const data = await response.json();
        
        if(data.length){
            return data;
        }

    } catch (error) {
      console.error("Error fetching products:", error);
    }finally{
    //   setLoading(false);
    }
}