import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isProcessing: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const {
        id,
        name,
        photo,
        price,
        priceDiscount,
        ratingsAverage,
        ratingsQuantity,
        category,
        amount,
      } = action.payload;
      const index = state.cartItems.findIndex(cartItem => cartItem.id === id);

      if (index === -1) {
        state.cartItems = [
          ...state.cartItems,
          {
            id,
            name,
            photo,
            price,
            priceDiscount,
            ratingsAverage,
            ratingsQuantity,
            category,
            amount,
          },
        ];
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        cartItem => cartItem.id !== itemId
      );
    },

    increase: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map(cartItem => {
        if (cartItem.id === itemId) cartItem.amount = cartItem.amount + 1;
        return cartItem;
      });
    },

    decrease: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map(cartItem => {
        if (cartItem.id === itemId) cartItem.amount = cartItem.amount - 1;
        return cartItem;
      });

      state.cartItems = state.cartItems.filter(cartItem => cartItem.amount > 0);
    },

    calculateTotals: state => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },

    clearItems: state => {
      state.cartItems = [];
    },
  },

  // extraReducers: {},
});

export const {
  addItem,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
