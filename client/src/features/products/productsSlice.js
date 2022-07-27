import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  products: [],
  isLoading: true,
};

export const getCategoryProducts = createAsyncThunk(
  'products/getCategoryProducts',
  async ({ category, page }) => {
    try {
      const { data } = await axios.get(
        `/products?category=${category}&page=${page}&limit=20`
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  // reducers: {},
  extraReducers: {
    [getCategoryProducts.pending]: state => {
      state.isLoading = true;
    },
    [getCategoryProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    },
    [getCategoryProducts.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default productsSlice.reducer;
