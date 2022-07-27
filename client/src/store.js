import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import productsReducer from './features/products/productsSlice';
import topProductsReducer from './features/topProducts/topProductsSlice';
import reviewsReducer from './features/reviews/reviewsSlice';
import productReducer from './features/product/productSlice';
import ordersReducer from './features/orders/ordersSlice';
import searchReducer from './features/search/searchSlice';
import stripeReducer from './features/stripe/stripeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    topProducts: topProductsReducer,
    reviews: reviewsReducer,
    product: productReducer,
    orders: ordersReducer,
    search: searchReducer,
    stripe: stripeReducer,
  },
});

export default store;
