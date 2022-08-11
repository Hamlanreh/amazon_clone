import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import CategoryProducts from './components/CategoryProducts/CategoryProducts';
import Cart from './components/Cart/Cart';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Reviews from './components/Reviews/Reviews';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import User from './components/User/User';
import Settings from './components/User/Settings/Settings';
import Deactivate from './components/User/Deactivate/Deactivate';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel/PaymentCancel';
import NotFound404 from './components/NotFound404/NotFound404';

// let stripePromise;
// const getStripe = async () => {
//   if (!stripePromise) {
//     stripePromise = await loadStripe(
//       'pk_test_51LH06mJ4f7QTW0t8xGUCuUX0Id6ckcelLdPfE4iC6AaPvDYRcL3R8Z8vFdctXTzZ2jceSwEHPROk16UGqBbK3Zjs00lBdGrkOu'
//     );
//   }
//   return stripePromise;
// };

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            index
            path="/"
            element={
              <>
                <Header />
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/search"
            element={
              <>
                <Header />
                <Navbar />
                <Search />
                <Footer />
              </>
            }
          />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/category/:category"
            element={
              <>
                <Header />
                <Navbar />
                <CategoryProducts />
                <Footer />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Navbar />
                <Cart />
                <Footer />
              </>
            }
          />

          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Navbar />
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/product/:productId/reviews"
            element={
              <>
                <Header />
                <Navbar />
                <Reviews />
                <Footer />
              </>
            }
          />

          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Navbar />
                <Orders />
                <Footer />
              </>
            }
          />

          <Route
            path="/user"
            element={
              <>
                <Header />
                <Navbar />
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
                <Footer />
              </>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="deactivate"
              element={
                <ProtectedRoute>
                  <Deactivate />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cancel"
            element={
              <ProtectedRoute>
                <PaymentCancel />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <>
                <Header />
                <Navbar />
                <NotFound404 />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
