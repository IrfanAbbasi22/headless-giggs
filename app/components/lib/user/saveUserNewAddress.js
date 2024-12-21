import Cookies from 'js-cookie';

export const saveUserNewAddress = async (data) => {
    const userToken = Cookies.get('user_token');

    if(!userToken){
        return 'Please sign-in';
    }

    try {
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/user/addresses/save`;
        
        const userAddressData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(data),
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

        console.error('error return', error.message);
        console.log('errordatatype return', typeof error);
        return error.message;
    }
};
  