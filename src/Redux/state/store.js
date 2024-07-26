import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/reducer'; 
import roomsSlice from '../reducer/rooms'; 
import authSlice from "../reducer/auth"
import updateUsersSlice from "../reducer/updateUser"
import collectionsSlice from "../reducer/collection"
import bookingsSlice from "../reducer/bookings"

const rootReducer = {
  users: userReducer,
  rooms: roomsSlice, 
  register:authSlice,
  updateUser: updateUsersSlice,
  collection: collectionsSlice,
  bookings:bookingsSlice
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;