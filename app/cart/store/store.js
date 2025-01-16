import { configureStore } from '@reduxjs/toolkit';
import productDetailModalReducer from './slices/productDetailModalSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import cartStepsReducer from './slices/cartStepsSlice';
import sideCartReducer from './slices/sideCartSlice';
import nonPersistReducer from './slices/nonPersistSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Default to localStorage


import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Custom storage fallback for SSR
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, _value) {
      return Promise.resolve();
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local') // Use localStorage in the browser
    : createNoopStorage(); // Use noop storage on the server

// Persistence configuration
const cartPersistConfig = {
  key: 'cart',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};


const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    productDetailModal: productDetailModalReducer,
    cart: cartPersistedReducer,
    cartSteps: cartStepsReducer,
    sideCart: sideCartReducer,
    nonPersist: nonPersistReducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
