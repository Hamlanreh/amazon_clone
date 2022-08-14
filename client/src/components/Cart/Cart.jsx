import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';

import CartItem from './CartItem/CartItem';
import useDocumentTitle from '../../utils/useDocumentTitle';
import { calculateTotals, clearItems } from '../../features/cart/cartSlice';

const Cart = () => {
  useDocumentTitle('Cart');
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);
  const { cartItems, amount, total } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

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
                  {isAuthenticated || (
                    <div className="cart__emptyBtn">
                      <Link to="/login">
                        <button>Sign in to your account</button>
                      </Link>
                      <Link to="/signup">
                        <button>Sign up now</button>
                      </Link>
                    </div>
                  )}
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
                <strong> ${total.toFixed(2)}</strong>
              </span>
            </p>
          )}

          {isAuthenticated && cartItems.length > 0 && (
            <Link className="cart__checkoutBtn" to="/checkout">
              Proceed to Checkout
            </Link>
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
