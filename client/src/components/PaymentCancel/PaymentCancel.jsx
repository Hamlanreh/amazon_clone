import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './PaymentCancel.css';

import { ReactComponent as AmazonIcon } from '../../assets/images/amazon-logo.svg';
import { createOrder } from '../../features/orders/ordersSlice';

const PaymentCancel = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(createOrder({ cartItems, status: 'incomplete' }));
  }, [dispatch, cartItems]);

  return (
    <main className="payment__cancel">
      <section>
        <header>
          <Link to="/">
            <AmazonIcon className="payment__logo" alt="Amazon icon" />
          </Link>
        </header>
        <article>
          <div className="payment__emojis">😡😞😟😓</div>
          <h1>Payment Cancelled</h1>
          <Link className="payment__homeLink" to="/">
            <button>Back to home</button>
          </Link>
        </article>
      </section>
    </main>
  );
};

export default PaymentCancel;
