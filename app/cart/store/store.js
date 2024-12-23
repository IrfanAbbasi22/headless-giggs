import { configureStore } from '@reduxjs/toolkit';
import productDetailModalReducer from './slices/productDetailModalSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import cartStepsReducer from './slices/cartStepsSlice';
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
import storage from 'redux-persist/lib/storage'; // Default to localStorage

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
