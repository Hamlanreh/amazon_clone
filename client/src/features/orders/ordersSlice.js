import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  orders: [],
  results: 0,
  isLoading: true,
};

export const getOrders = createAsyncThunk('orders/getOrders', async id => {
  try {
    const { data } = await axios.get(`/orders`);
    return { data: data.data, length: data.length };
  } catch (error) {
    return error;
  }
});

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ cartItems, status }) => {
    try {
      const items = cartItems.map(item => ({
        product: item.id,
        quantity: item.amount,
      }));
      await axios.post('/orders', { items, status });
    } catch (error) {
      return error;
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  // reducers: {},
  extraReducers: {
    [getOrders.pending]: state => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.results = payload.length;
      state.orders = payload.data;
      state.isLoading = false;
    },
    [getOrders.rejected]: state => {
      state.isLoading = false;
    },

    [createOrder.pending]: state => {
      state.isLoading = true;
    },
    [createOrder.fulfilled]: state => {
      state.isLoading = false;
    },
    [createOrder.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default ordersSlice.reducer;
