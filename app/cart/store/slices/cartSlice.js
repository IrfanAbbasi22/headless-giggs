// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // Product list
    items: [],
    // Total Items
    items_count: 0,

    // Billing Address
    billing_address: {},
    shipping_address: {},
    totals: { 
      "total_items": 0,
      "total_price": 0,
      "currency_prefix": '',
    },
    // Coupons Data
    coupons: [],
    // Recomended Products
    cross_sells: [],
    itemsPreloader: false,
    isCouponApplied: false,
    shipping_rates: [],
    countries: [],
  },
  reducers: {
    // Set the cart data from WooCommerce API
    setCart(state, action) {
      // state.items = action.payload.items;
      // state.totals.total_items = action.payload.totals.total_items;
      state.totals.total_price = action.payload.totals.total_price;
      state.currencySymbol = action.payload.currencySymbol;
    },

    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    updateQty(state, action) {
      const { id, qty } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        if (qty === 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = qty;
        }
      }

      state.items_count = state.items.reduce((total, item) => total + item.quantity, 0);
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);

      state.items_count = state.items.reduce((total, item) => total + item.quantity, 0);
    },

    // Load WooCommerce cart into Redux (used when the page loads)
    loadCartFromWoo(state, action) {
      const data = action.payload
      state.cross_sells = data?.cross_sells;
      state.items = data?.items;
      state.items_count = parseInt(data?.items_count, 10);
      state.totals = data?.totals;
      state.billing_address = data?.billing_address;
      state.shipping_address = data?.shipping_address;
      state.coupons = data?.coupons;
      state.itemsPreloader = false;
      state.shipping_rates = data?.shipping_rates;
    },

    // TODO: update name convension & make it use internally don't write extra for coupon
    // TODO: update names for variables(relative ones)
    // TODO: 
    couponApplied(state, action){
      const res = action.payload;
      state.isCouponApplied = res;
    },
    
    toggleChangesPreloader(state, action) {
      const res = action.payload
      state.itemsPreloader = res;
    },
    
    setInitCountries(state, action){
      const res = action.payload;
      state.countries = res
    },

    resetCart(state, action) {
      return { 
        ...state,

        // Need these keys because it blanks the local storage.
        items: [],
        // Total Items
        items_count: 0,

        // Billing Address
        billing_address: {},
        shipping_address: {},
        totals: { 
          "total_items": 0,
          "total_price": 0,
          "currency_prefix": '',
        },
        // Coupons Data
        coupons: [],
        // Recomended Products
        cross_sells: [],
        itemsPreloader: false,
        isCouponApplied: false,
        shipping_rates: [],
        countries: [],
      };
    }
  },
});

// Selectors
export const cartDetails = (state) => state.cart;
export const cartBillingAddress = (state) => state.cart.billing_address;
export const selectedCartItems = (state) => state.cart.items;
export const selectedTotalItems = (state) => state.cart.items_count;
export const selectedItemsTotalPrice = (state) => state.cart.totals.total_price;
export const cartChangesPreloader = (state) => state.cart.itemsPreloader;
export const isCouponAppliedData = (state) => state.cart.isCouponApplied;
export const recomendedProducts = (state) => state.cart.cross_sells;
export const cartCurrency = (state) => state.cart.totals.currency_prefix;
export const cartCountries = (state) => state.cart.countries;

export const { addToCart, updateQty, removeFromCart, toggleChangesPreloader, setCart, resetCart, loadCartFromWoo, couponApplied, setInitCountries } = cartSlice.actions;
export default cartSlice.reducer;