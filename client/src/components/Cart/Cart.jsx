import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';

import useDocumentTitle from '../../utils/useDocumentTitle';

import CartItem from './CartItem/CartItem';
import { calculateTotals, clearItems } from '../../features/cart/cartSlice';
import { getCheckoutSession } from '../../features/stripe/stripeSlice';

let stripePromise;
const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51LH06mJ4f7QTW0t8xGUCuUX0Id6ckcelLdPfE4iC6AaPvDYRcL3R8Z8vFdctXTzZ2jceSwEHPROk16UGqBbK3Zjs00lBdGrkOu'
    );
  }
  return await stripePromise;
};

const Cart = () => {
  useDocumentTitle('Cart');

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);
  const { cartItems, amount, total } = useSelector(state => state.cart);
  const { checkoutSession } = useSelector(state => state.stripe);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

  const handleCheckout = async e => {
    const stripe = await getStripe();
    dispatch(getCheckoutSession(cartItems));
    setTimeout(() => {
      stripe.redirectToCheckout({ sessionId: checkoutSession.id });
    }, 3000);
  };

  return (
    <section className="cart">
      <div className="cart__left">
        <div className="cart__productBox">
          {cartItems.length < 1 && (
            <div className="cart__emptyBox">
              <div className="cart__emptyLeft"></div>
              <div className="cart__emptyRight">
                <div>
                  <h2>Your Amazon Cart Is Empty</h2>
                  <p>Shop today's deals</p>
                  <div className="cart__emptyBtn">
                    <Link to="/login">
                      <button>Sign in to your account</button>
                    </Link>
                    <Link to="/signup">
                      <button>Sign up now</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {cartItems.length < 1 || (
            <div className="cart__list">
              {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} {...cartItem} />
              ))}
              <button
                className="cart__clearBtn"
                onClick={() => dispatch(clearItems())}
              >
                Clear cartitems
              </button>
            </div>
          )}
        </div>

        <div className="cart__subtotal">
          {cartItems.length < 1 || (
            <p>
              Subtotal ({amount} items):
              <span>
                <strong>${total}</strong>
              </span>
            </p>
          )}

          {isAuthenticated && cartItems.length > 0 && (
            <button
              className="cart__checkoutBtn"
              type="button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          )}
        </div>

        <p className="cart__terms">
          The price and availability of items at Amazon.com are subject to
          change. The Cart is a temporary place to store a list of your items
          and reflects each item's most recent price. Shopping Cart
          <br />
          Learn more
          <br />
          Do you have a gift card or promotional code? We'll ask you to enter
          your claim code when it's time to pay.
        </p>
      </div>

      <div className="cart__right"></div>
    </section>
  );
};

export default Cart;
