import Cookies from 'js-cookie';

export const deleteUserAddress = async (data) => {
    const userToken = Cookies.get('user_token');

    if(!userToken){
        return 'Please sign-in';
    }
    // Make error message ui using redux which will dispacth message with show error: true & on close make it blank and show:false

    try {
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/user/addresses/delete`;
        
        const userAddressData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                "id": data,
            }),
        };
  
        const response = await fetch(url, userAddressData);
  
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
  