import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './ForgotPassword.css';

import useDocumentTitle from '../../utils/useDocumentTitle';

import { ReactComponent as AmazonIcon } from '../../assets/images/amazon-logo.svg';
import { forgotPassword } from '../../features/user/userSlice';

const ForgotPassword = () => {
  useDocumentTitle('Forgot your password?');

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleResetPassword = e => {
    e.preventDefault();
    if (email) dispatch(forgotPassword(email));
  };

  return (
    <main className="forgotPass">
      <header className="forgotPass__header">
        <Link to="/">
          <AmazonIcon className="forgotPass__logo" />
        </Link>
      </header>

      <section className="forgotPass__section">
        <form id="forgotPass__form">
          <h1>Forgot Password</h1>

          <div className="form__control">
            <label htmlFor="">Email address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <button
            className="forgotPass__submitBtn"
            type="submit"
            onClick={handleResetPassword}
          >
            Send Reset Password
          </button>

          <div className="forgotPass__term">
            <p>
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice.
            </p>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ForgotPassword;
