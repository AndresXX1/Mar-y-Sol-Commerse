import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
  try {
    const response = await axios.patch('/api/user', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/user/all');
  return response.data;
});

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await axios.get('/api/bookings?filter=all');
  return response.data;
});

export const fetchCollection = createAsyncThunk('collection/fetchCollection', async () => {
  const response = await axios.get('/collection');
  return response.data;
});

export const updatecollection = createAsyncThunk('collection/updateCollection', async ({ id, updatedcollection }) => {
  try {
    const response = await axios.patch(`/collection/${id}`, updatedcollection);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  products: [], 
  loading: false,
  error: null,
  entities: []
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        const index = state.entities.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities.push(...action.payload);
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })
      .addCase(fetchCollection.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      })
      .addCase(fetchCollection.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })
      // Añade el caso para manejar la actualización de colecciones
      .addCase(updatecollection.fulfilled, (state, action) => {
        state.loading = 'idle';
        const index = state.entities.findIndex(collection => collection._id === action.payload._id);
        if (index !== -1) {
          state.entities[index] = action.payload; // Actualiza la colección en el estado si se encuentra
        }
      })
      .addCase(updatecollection.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      });
  }
});

export default userSlice.reducer;