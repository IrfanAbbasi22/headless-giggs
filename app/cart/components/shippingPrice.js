import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { toggleChangesPreloader, loadCartFromWoo } from '../store/slices/cartSlice';
import { fetchWooCommerceCart } from '@/app/components/lib/cart/fetchAndSyncCart';

export function useShippingPrice() {
    const cookieWCHash = Cookies.get('woocommerce_cart_hash');
    const cookieCartToken = Cookies.get('cart-token');
    const dispatch = useDispatch();

    const updateShippingRates = async (id) => {
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/cart/select-shipping-rate`;
        const credentials = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cart-Token": cookieWCHash ?? cookieCartToken ?? "",
            },
            body: JSON.stringify({
                rate_id: id,
            }),
        };
    
        try {
            dispatch(toggleChangesPreloader(true));

            const response = await fetch(url, credentials);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error Data:", errorData);
                throw new Error("Failed to update shipping rates!");
            }

            const data = await response.json();

            // Sync the updated cart
            const updatedCart = await fetchWooCommerceCart();
            if (updatedCart) {
                dispatch(loadCartFromWoo(updatedCart));
            }

            return data;
        } catch (error) {
            console.error("Error updating shipping rates:", error);
            throw error;
        } finally {
            dispatch(toggleChangesPreloader(false));
        }
    };

    return { updateShippingRates };
}