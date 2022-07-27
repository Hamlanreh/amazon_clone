import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  search: [],
  isLoading: true,
};

export const searchProducts = createAsyncThunk(
  'search/getProducts',
  async name => {
    try {
      const { data } = await axios.get(`/products?name=${name}`);
      return data.data;
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
    [searchProducts.fulfilled]: (state, action) => {
      state.search = action.payload;
      state.isLoading = false;
    },
    [searchProducts.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default searchSlice.reducer;
