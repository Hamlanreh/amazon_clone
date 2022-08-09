import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css';

import CheckoutItem from './CheckoutItem/CheckoutItem';
import useDocumentTitle from '../../utils/useDocumentTitle';
import { clearItems } from '../../features/cart/cartSlice';
// import { getCheckoutSession } from '../../features/stripe/stripeSlice';

const Checkout = () => {
  useDocumentTitle('Checkout');
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(state => state.user);
  const { cartItems, amount, total } = useSelector(state => state.cart);
  //   const { checkoutSession } = useSelector(state => state.stripe);

  return (
    <section className="checkout">
      <h1>Checkout ({amount} items):</h1>

      <div className="checkout__content">
        <div className="checkout__row">
          <div className="checkout__left">
            <h2>Delivery Address</h2>
          </div>
          <div className="checkout__right">
            <p>{user.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="checkout__row">
          <div className="checkout__left">
            <h2>Review items and delivery</h2>
          </div>
          <div className="checkout__right">
            {cartItems.length < 1 || (
              <div className="checkout__list">
                {cartItems.map(cartItem => (
                  <CheckoutItem key={cartItem.id} {...cartItem} />
                ))}
                <button
                  className="checkout__clearBtn"
                  onClick={() => dispatch(clearItems())}
                >
                  Clear checkout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="checkout__row">
          <div className="checkout__left">
            <h2>Payment method</h2>
          </div>
          <div className="checkout__right">
            <h2>Card Details</h2>
            {isAuthenticated && cartItems.length > 0 && (
              <div className="checkout__payment">
                <h3>Order Total: ${total.toFixed(2)}</h3>
                <button className="checkout__paymentBtn">Buy Now!</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
