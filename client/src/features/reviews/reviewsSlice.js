import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  reviews: [],
  isLoading: true,
};

export const getAllReviews = createAsyncThunk(
  'reviews/getAllReviews',
  async productId => {
    try {
      const { data } = await axios.get(`/products/${productId}/reviews`);
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ productId, review, rating }) => {
    try {
      await axios.post(`/products/${productId}/reviews`, {
        review,
        rating,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ productId, reviewId, review, rating }) => {
    try {
      await axios.patch(`/products/${productId}/reviews/${reviewId}`, {
        review,
        rating,
      });
    } catch (error) {
      return error;
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async ({ productId, reviewId }) => {
    try {
      await axios.delete(`/products/${productId}/reviews/${reviewId}`);
    } catch (error) {
      return error;
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  // reducers: {},
  extraReducers: {
    [getAllReviews.pending]: state => {
      state.isLoading = true;
    },
    [getAllReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload;
      state.isLoading = false;
    },
    [getAllReviews.rejected]: state => {
      state.isLoading = false;
    },

    [createReview.pending]: state => {
      state.isLoading = true;
    },
    [createReview.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createReview.rejected]: state => {
      state.isLoading = false;
    },

    [updateReview.pending]: state => {
      state.isLoading = true;
    },
    [updateReview.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateReview.rejected]: state => {
      state.isLoading = false;
    },

    [deleteReview.pending]: state => {
      state.isLoading = true;
    },
    [deleteReview.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteReview.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default reviewsSlice.reducer;
