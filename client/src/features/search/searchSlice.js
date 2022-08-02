import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  search: [],
  results: 0,
  isLoading: true,
};

export const searchProducts = createAsyncThunk(
  'search/getProducts',
  async name => {
    try {
      const { data } = await axios.get(`/products?name=${name}`);
      return { data: data.data, length: data.length };
    } catch (error) {
      return error;
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  //   reducers: {},
  extraReducers: {
    [searchProducts.pending]: state => {
      state.isLoading = true;
    },
    [searchProducts.fulfilled]: (state, { payload }) => {
      state.results = payload.length;
      state.search = payload.data;
      state.isLoading = false;
    },
    [searchProducts.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default searchSlice.reducer;
