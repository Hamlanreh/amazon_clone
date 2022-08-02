import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './PaymentSuccess.css';

import { ReactComponent as AmazonIcon } from '../../assets/images/amazon-logo.svg';
import { createOrder } from '../../features/orders/ordersSlice';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(createOrder({ cartItems, status: 'complete' }));
  }, [dispatch, cartItems]);

  return (
    <main className="payment__success">
      <section>
        <header>
          <Link to="/">
            <AmazonIcon className="payment__logo" alt="Amazon icon" />
          </Link>
        </header>
        <article>
          <div className="payment__emojis">😎😁😆🚀</div>
          <h1>Payment Success</h1>
          <button>Track Order status</button>
          <Link className="payment__homeLink" to="/">
            Back to home
          </Link>
        </article>
      </section>
    </main>
  );
};

export default PaymentSuccess;
