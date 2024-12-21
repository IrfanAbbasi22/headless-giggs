import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetCart } from "../../store/slices/cartSlice";

export const RazorPay = (setPageLoader) => {
    const dispatch = useDispatch();

    const createRazorPayOrder = async (order_id, user) => {
        try {    
            const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/razorpay/create-order`;
            
            const orderData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Cart-Token': cookieWCHash ?? cookieCartToken ?? '',
                    // 'Authorization': `Bearer ${user.userToken ?? ''}`,
                    ...(user?.userToken && { 'Authorization': `Bearer ${user.userToken}` }),
                },
                body: JSON.stringify({
                    order_id: order_id,
    
                }),
            };
    
            const response = await fetch(url, orderData);
            
            if (!response.ok) {
                const responseError = await response.json();
                throw new Error('Failed to add product to the cart');
    
                // return responseError;
            }
    
            const razorpayData  = await response.json();
            return razorpayData ;
    
        } catch (error) {
            console.error(error.message);
        }
    };

    // Function to trigger Razorpay modal
    let razorpayScriptLoaded = false; // Flag to track if the script is loaded
    
    const openRazorpayModal = (order, razorpayData) => {
        console.log("razorpayScriptLoaded", razorpayScriptLoaded)
        // Check if Razorpay script is already loaded globally (on the window object)
        if (razorpayScriptLoaded) {
            // If the script is already loaded, open the Razorpay modal directly
            initializeRazorpay(order, razorpayData);
        } else {
            // Check if the script is not already present in the document
            const existingScript = document.getElementById("razorpay-checkout-script");
    
            console.log("razorpayScriptLoaded2", existingScript)
            if (!existingScript) {
                // Dynamically add the Razorpay Checkout script to the page
                const script = document.createElement("script");
                script.id = "razorpay-checkout-script";
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
    
                // Once the script is loaded, set the flag and open the Razorpay modal
                script.onload = () => {
                    razorpayScriptLoaded = true; // Mark the script as loaded
                    initializeRazorpay(order, razorpayData); // Initialize and open the Razorpay modal
                };
    
                document.body.appendChild(script);
            } else {
                razorpayScriptLoaded = true; // Mark the script as loaded
                initializeRazorpay(order, razorpayData);
            }
        }
    };
    
    
    // Function to initialize and open Razorpay modal
    const initializeRazorpay = (order, razorpayData) => {
        
        const options = {
            key: razorpayData.key, // Your Razorpay Key ID
            order_id: razorpayData.razorpay_order_id, // Your Razorpay Order ID
            handler: function (response) {
                // Handle the payment success
                console.log("Payment successful:", response);
                verifyRazorPayment(order, response);
                // You can send payment response to your server for verification
            },
            // Todo: User Profile in Razropay
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999", // Example phone number
            },
            theme: {
                color: "#3399cc", // Customize modal theme color
            },
        };
    
        console.log("Razorpay options", options);
        
        // Initialize Razorpay checkout with options
        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    
    // Verify Payment
    const verifyRazorPayment = async (order, data) => {
        setPageLoader(true);

        try {    
            const url = `${process.env.NEXT_PUBLIC_WOO_URL}/nwe/v1/razorpay/verify`;
            const verifyData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
    
                },
                body: JSON.stringify({
                    order_id: order.order_id,
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id,
                    razorpay_signature: data.razorpay_signature
                }),
            };
    
            const response = await fetch(url, verifyData);
            
            if (!response.ok) {
                const responseError = await response.json();
                throw new Error('Failed to verify the payment');
    
                // return responseError;
            }
    
            const razorpayVerifyPaymentData  = await response.json();
    
            dispatch(resetCart());
            Cookies.remove('woocommerce_cart_hash');
            Cookies.remove('cart-token');
    
            window.location.href = `/thanks?id=${order.order_id}&orderKey=${order.order_key}&email=${order.email}`;
            // router.push(`/thanks?id=${data.order_id}&orderKey=${data.order_key}&email=${data.billing_address.email}`);
            return razorpayVerifyPaymentData;
    
        } catch (error) {
            console.error(error.message);
        }finally{
            setPageLoader(false);
        }
    }

    return {createRazorPayOrder, openRazorpayModal, verifyRazorPayment};
}