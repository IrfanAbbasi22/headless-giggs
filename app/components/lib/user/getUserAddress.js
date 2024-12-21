import Cookies from 'js-cookie';

export const getUserAddress = async (token, perPage, curPage) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/user/addresses?per_page=${perPage}&page=${curPage}`;
        
        const userData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        };
  
        const response = await fetch(url, userData);
  
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
  