import { createSlice } from '@reduxjs/toolkit';

const nonPersistSlice = createSlice({
  name: 'nonPersist',
  initialState: {
    isCouponModalVisible: false,
    fetchedCouponData: [],
    addressCardData: [],
  },
  reducers: {
    toggleIsCouponModalVisible(state, action){
      const res = action.payload;
      state.isCouponModalVisible = res;
    },
    setFetchedCoupons(state, action){
      const res = action.payload;
      state.fetchedCouponData = res;
    },
    setaddressCardData(state, action){
      const { type, payload } = action.payload;
      if(type == "update"){
        state.addressCardData = payload;
      }else if(type == "loadMore"){
        const newAddresses = payload; // Expecting an array of addresses
        state.addressCardData = [...state.addressCardData, ...newAddresses];
      }
    },
  },
});

// Selectors
export const isCouponModalVisibleOnScreen = (state) => state.nonPersist.isCouponModalVisible;
export const fetchedCoupons = (state) => state.nonPersist.fetchedCouponData;
export const addressCardData = (state) => state.nonPersist.addressCardData;

export const { toggleIsCouponModalVisible, setFetchedCoupons, setaddressCardData } = nonPersistSlice.actions;
export default nonPersistSlice.reducer;