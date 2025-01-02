import Cookies from 'js-cookie';

function debounce(callback, delay) {
  let timeoutId;

  return function (...args) {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        try {
          const result = callback(...args);
          resolve(result); // Return the result of the async function
        } catch (error) {
          reject(error); // In case of any error, reject the promise
        }
      }, delay);
    });
  };
}

// Fetch the WooCommerce cart data
// export const fetchWooCommerceCart = async (cartToken) => {
export const fetchWooCommerceCart = debounce(async (cartToken) => {
  // console.log('Cookies.wchash', Cookies.get('woocommerce_cart_hash'));
  // console.log('Cookies.token', Cookies.get('woocommerce_cart_hash'));

  // TODO: make common functions for API.
  const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/store/cart`;
  const credentials = {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Cart-Token': Cookies.get('woocommerce_cart_hash') ?? Cookies.get('cart-token') ?? '',
    },
  };

  try {
    const response = await fetch(url, credentials);
    const data = await response.json();

    // Save Cart Token in Cookie
    if(!Cookies.get('cart-token') && !Cookies.get('woocommerce_cart_hash')){
      const cartToken = response.headers.get('Cart-Token');
      if (cartToken) {
        Cookies.set('cart-token', cartToken, { expires: 2 })
      }
    }
    
    return data; // Return the cart data
  } catch (error) {
    console.error('Error fetching WooCommerce cart:', error);
    return null;
  }
// };
}, 1000);