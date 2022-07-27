import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  checkoutSession: {},
  stripePromise: null,
  isLoading: false,
};

export const getCheckoutSession = createAsyncThunk(
  'stripe/getCheckoutSession',
  async items => {
    try {
      const newItems = items.map(item => ({
        product: item.id,
        quantity: item.amount,
      }));
      const { data } = await axios.post('/orders/create-checkout-session', {
        items: newItems,
      });
      return await data.session;
    } catch (error) {
      return error;
    }
  }
);

const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  //   reducers: {},
  extraReducers: {
    [getCheckoutSession.pending]: state => {
      state.isLoading = true;
    },
    [getCheckoutSession.fulfilled]: (state, action) => {
      state.checkoutSession = action.payload;
      state.isLoading = false;
    },
    [getCheckoutSession.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default stripeSlice.reducer;
