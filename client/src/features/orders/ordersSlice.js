import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  orders: [],
  isLoading: true,
};

export const getOrders = createAsyncThunk('orders/getOrders', async id => {
  try {
    const { data } = await axios.get(`/orders`);
    return data.data;
  } catch (error) {
    return error;
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  // reducers: {},
  extraReducers: {
    [getOrders.pending]: state => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    [getOrders.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default ordersSlice.reducer;
