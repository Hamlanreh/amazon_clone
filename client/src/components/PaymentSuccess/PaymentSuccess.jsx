import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentSuccess.css';

import { ReactComponent as AmazonIcon } from '../../assets/images/amazon-logo.svg';

const PaymentSuccess = () => {
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
