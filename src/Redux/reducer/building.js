import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

export const createCollection = createAsyncThunk(
  'collections/createCollection',
  async (collectionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/collection/create`, collectionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCollections = createAsyncThunk(
  'collections/fetchCollections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/collection`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCollectionById = createAsyncThunk(
  'collections/fetchCollectionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/collection/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCollectionById = createAsyncThunk(
  'collections/updateCollectionById',
  async ({ id, collectionData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/collection/${id}`, collectionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCollectionById = createAsyncThunk(
  'collections/deleteCollectionById',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/collection/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [],
    collection: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCollection.fulfilled, (state, action) => {
      state.collections.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createCollection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCollection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCollections.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCollections.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCollectionById.fulfilled, (state, action) => {
      state.collection = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCollectionById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCollectionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCollectionById.fulfilled, (state, action) => {
      state.collections = state.collections.map(collection =>
        collection.id === action.payload.id ? action.payload : collection
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateCollectionById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCollectionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCollectionById.fulfilled, (state, action) => {
      state.collections = state.collections.filter(collection => collection.id !== action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteCollectionById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCollectionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default collectionsSlice.reducer;