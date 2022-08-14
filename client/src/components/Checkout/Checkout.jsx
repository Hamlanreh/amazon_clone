import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Checkout.css';

import CardSection from './CardSection/CardSection';
import Modal from '../Modal/Modal';

import CheckoutItem from './CheckoutItem/CheckoutItem';
import useDocumentTitle from '../../utils/useDocumentTitle';
import { clearItems } from '../../features/cart/cartSlice';
import { createOrder } from '../../features/orders/ordersSlice';
import { createPaymentSecret } from '../../features/stripe/stripeSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useDocumentTitle('Checkout ordered product');
  const { clientSecret } = useSelector(state => state.stripe);
  const { user } = useSelector(state => state.user);
  const { cartItems, amount, total } = useSelector(state => state.cart);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (total > 0) dispatch(createPaymentSecret(total));
  }, [dispatch, total, cartItems]);

  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.name,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Create a new order
        dispatch(createOrder({ cartItems }));
        // Clear the cartItems
        dispatch(clearItems());
        setError(null);
        setProcessing(false);
        // Navigate to orders page
        navigate('/orders', { replace: true });
      }
    }
  };

  return (
    <>
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
                    Clear Checkout
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
              <form className="checkout__form" onSubmit={handleSubmit}>
                <h3>Order Total: ${total.toFixed(2)}</h3>
                {total > 0 && (
                  <>
                    <CardSection />
                    <button
                      className="checkout__paymentBtn"
                      disabled={processing || false}
                    >
                      <p>{processing ? 'Processing' : 'Buy Now'}</p>
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {error && <Modal message={error.message} />}
    </>
  );
};

export default Checkout;
