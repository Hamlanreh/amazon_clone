import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  topProducts: [],
  results: 0,
  isLoading: true,
};

export const getTopProducts = createAsyncThunk(
  'topProducts/getTopProducts',
  async () => {
    try {
      const { data } = await axios.get(`/products/top-category-products`);
      return { data: data.data, length: data.length };
    } catch (error) {
      return error;
    }
  }
);

const topProductsSlice = createSlice({
  name: 'topProducts',
  initialState,
  //   reducers: {},
  extraReducers: {
    [getTopProducts.pending]: state => {
      state.isLoading = true;
    },
    [getTopProducts.fulfilled]: (state, { payload }) => {
      state.results = payload.length;
      state.topProducts = payload.data;
      state.isLoading = false;
    },
    [getTopProducts.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default topProductsSlice.reducer;
