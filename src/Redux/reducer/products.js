import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchproductsByCollection = createAsyncThunk('products/fetchproductsByCollection', async (collectionId) => {
    console.log("Fetching products for collection ID:", collectionId);
    const response = await axios.get(`/products/findByCollection/${collectionId}`);

    return response.data; 

});

export const updateproducts = createAsyncThunk(
    'products/updateproducts',
    async ({ collectionId, roomId, updateproductsData }) => {
        try {
            const response = await axios.patch(`/products/${collectionId}/types/${roomId}`, updateproductsData);

            return response.data;

        } catch (error) {
            throw error;
        }
    }
);


export const fetchproductsById = createAsyncThunk(
    'products/fetchproductsById',
    async (roomId) => {
        try {
            const response = await axios.get(`/products/${roomId}`);

            return response.data;

        } catch (error) {
            throw error;
        }
    }
);

export const createproducts = createAsyncThunk(
    'products/createproducts',
    async ({ collectionId, productData }) => {
        try {
            const response = await axios.post(`/products/${collectionId}/types`, productData);

            return response.data;

        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedcollectionId: '' 
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedCollectionId(state, action) {
            state.selectedcollectionId = action.payload; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchproductsByCollection.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchproductsByCollection.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchproductsByCollection.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error;
            })
            .addCase(updateproducts.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(updateproducts.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.products = state.products.map((room) =>
                    room._id === action.payload._id ? action.payload : room
                );
            })
            .addCase(updateproducts.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            })
          
            builder
            .addCase(createproducts.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(createproducts.fulfilled, (state, action) => {
                state.loading = 'idle';
             
                state.products.push(action.payload);
            })
            .addCase(createproducts.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            })
         

            builder
    .addCase(fetchproductsById.pending, (state) => {
        state.loading = 'loading';
    })
    .addCase(fetchproductsById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.products = [action.payload];
    })
    .addCase(fetchproductsById.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
    });
    }
});

export const { setSelectedCollectionId } = productsSlice.actions; 

export default productsSlice.reducer;