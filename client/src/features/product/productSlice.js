import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  product: {},
  isLoading: true,
};

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async productId => {
    try {
      const { data } = await axios.get(`/products/${productId}`);
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  // reducers: {},
  extraReducers: {
    [getProduct.pending]: state => {
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },
    [getProduct.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;
