import { useDispatch } from 'react-redux';
import { loadCartFromWoo } from '../../../cart/store/slices/cartSlice';
import Cookies from 'js-cookie';

export const useUpdateShippingAddress = () => {
    // Cookie Data
    const cookieWCHash = Cookies.get('woocommerce_cart_hash');
    const cookieCartToken = Cookies.get('cart-token');
    const dispatch = useDispatch();
    
    const updateShippingAddress = async(addressData) => {
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/cart/update-customer`;
        const credentials = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                'Cart-Token': cookieWCHash ?? cookieCartToken ?? '',
            },
            body: JSON.stringify({
                "billing_address": addressData,
                "shipping_address": addressData
            }),
        };
    
        try {
            const response = await fetch(url, credentials);
            if (!response.ok) {
                const errorData = await response.json();
    
                return errorData;
    
                throw new Error("Failed to update shipping address!");
            }
    
            const successData = await response.json();
    
            // Update Redux Store with updated data
            dispatch(loadCartFromWoo(successData));
            return successData;
        } catch (error) {
            console.error(error);
        }
    }

    return { updateShippingAddress }
};