import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../../utils/axios';

const initialState = {
  checkoutSession: {},
  stripePromise: null,
  isLoading: false,
};

export const loadStripePromise = createAsyncThunk(
  'stripe/loadStripePromise',
  async () => {
    try {
      let stripePromise;
      if (!stripePromise) {
        stripePromise = loadStripe(
          'pk_test_51LH06mJ4f7QTW0t8xGUCuUX0Id6ckcelLdPfE4iC6AaPvDYRcL3R8Z8vFdctXTzZ2jceSwEHPROk16UGqBbK3Zjs00lBdGrkOu'
        );
      }
      return await stripePromise;
    } catch (error) {
      return error;
    }
  }
);

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
    [loadStripePromise.pending]: state => {
      state.isLoading = true;
    },
    [loadStripePromise.fulfilled]: (state, action) => {
      state.stripePromise = action.payload;
      state.isLoading = false;
    },
    [loadStripePromise.rejected]: state => {
      state.isLoading = false;
    },

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
