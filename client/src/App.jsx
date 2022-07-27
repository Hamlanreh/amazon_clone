import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import CategoryProducts from './components/CategoryProducts/CategoryProducts';
import Cart from './components/Cart/Cart';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Reviews from './components/Reviews/Reviews';
import User from './components/User/User';
import Orders from './components/User/Orders/Orders';
import Settings from './components/User/Settings/Settings';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel/PaymentCancel';
import NotFound404 from './components/NotFound404/NotFound404';

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
                <Cart />
                <Footer />
              </>
            }
          />

          <Route
            path="/product/:productId/reviews"
            element={
              <>
                <Header />
                <Reviews />
                <Footer />
              </>
            }
          />

          <Route
            path="/user"
            element={
              <>
                <Header />
                <User />
                <Footer />
              </>
            }
          >
            <Route index element={<Orders />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/success" element={<PaymentSuccess />} />

          <Route path="/cancel" element={<PaymentCancel />} />

          <Route
            path="*"
            element={
              <>
                <Header />
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
