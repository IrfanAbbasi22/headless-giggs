import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_data: {},
    user_token: '',
    addresses: [],
    isSignInVisible: false,
    showUserAddressForm: false,
    editUserAddress: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      address_1: "",
      address_2: "",
      state: "",
      postcode: "",
      city: "",
      country: "",
    }
  },
  reducers: {
    showUserModal(state, action){
      const res = action.payload
      state.isSignInVisible = res;
    },
    showUserAddAddressForm(state, action){
      const { isVisible, address } = action.payload;

      state.showUserAddressForm = isVisible;
      state.editUserAddress = address;
    },
    setUserAddresses(state, action) {
      state.addresses = action.payload;
    },

    updateUserFromServer(state, action) {
      const data = action.payload

      state.user_data = data.user_data;
      state.user_token = data?.user_token;
    },

    updateUserDetails(state, action) {
      const data = action.payload

      state.user_data = data.user_data;
    },

    resetUser(state, action) {
      return { ...state,
        user_data: {},
        user_token: '',
        addresses: [],
        isSignInVisible: false,
        showUserAddressForm: false,
        editUserAddress: {
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          address_1: "",
          address_2: "",
          state: "",
          postcode: "",
          city: "",
          country: "",
        }
      };
    }
  },
});

// Selectors
export const userDetails = (state) => state.user.user_data;
export const userDataToken = (state) => state.user.user_token;
export const isUserLoggedIn = (state) => !!state.user.user_token;
export const userAddresses = (state) => state.user.addresses;
export const isSignInVisible = (state) => state.user.isSignInVisible;
export const showUserAddressForm = (state) => state.user.showUserAddressForm;
export const editUserAddress = (state) => state.user.editUserAddress;

export const { updateUserFromServer, updateUserDetails, resetUser, showUserModal, showUserAddAddressForm, setUserAddresses } = userSlice.actions;
export default userSlice.reducer;