import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/reducer'; 
import productsSlice from '../reducer/products'; 
import authSlice from "../reducer/auth"
import updateUsersSlice from "../reducer/updateUser"
import collectionsSlice from "../reducer/collection"
import bookingsSlice from "../reducer/bookings"

const rootReducer = {
  users: userReducer,
  products: productsSlice, 
  register:authSlice,
  updateUser: updateUsersSlice,
  collection: collectionsSlice,
  bookings:bookingsSlice
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;