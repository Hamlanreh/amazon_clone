import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  clientSecret: '',
  stripePromise: null,
  isLoading: false,
};

export const createPaymentSecret = createAsyncThunk(
  'stripe/getPaymentSecret',
  async total => {
    try {
      const { data } = await axios.post('/orders/secret', { total });
      return data.client_secret;
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
    [createPaymentSecret.pending]: state => {
      state.isLoading = true;
    },
    [createPaymentSecret.fulfilled]: (state, action) => {
      state.clientSecret = action.payload;
      state.isLoading = false;
    },
    [createPaymentSecret.rejected]: state => {
      state.isLoading = false;
      state.clientSecret = '';
    },
  },
});

export default stripeSlice.reducer;
