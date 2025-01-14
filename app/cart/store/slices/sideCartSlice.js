import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isSideCartVisible: false,
};

const sideCartSlice = createSlice({
  name: 'sideCart',
  initialState,
  reducers: {
    showSideCart: (state, action) => {
      state.isSideCartVisible = action.payload;
    },
  },
});


export const isSideCartVisible = (state) => state.sideCart.isSideCartVisible;

export const { showSideCart } = sideCartSlice.actions;
export default sideCartSlice.reducer;