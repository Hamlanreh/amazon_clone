import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';

import { ReactComponent as AmazonIcon } from '../../assets/images/amazon-logo.svg';
import useDocumentTitle from '../../utils/useDocumentTitle';
import { login } from '../../features/user/userSlice';

const Login = () => {
  useDocumentTitle('Log in to your account');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (isAuthenticated) return navigate('/');
  }, [navigate, isAuthenticated]);

  return (
    <main className="login">
      <header className="login__header">
        <Link to="/">
          <AmazonIcon className="login__logo" />
        </Link>
      </header>

      <section className="login__section">
        <form id="signup__form" onSubmit={handleLogin}>
          <h1>Sign in</h1>

          <div className="form__control">
            <label htmlFor="">Email address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form__control">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="login__submitBtn" type="submit">
            Continue
          </button>

          <div className="login__term">
            <p>
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice.
            </p>
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </div>
        </form>

        <div className="login__info">
          <p>New to Amazon? </p>
          <Link to="/signup">
            <button>Create your Amazon account</button>
          </Link>
        </div>
      </section>

      <footer className="login__footer">
        <div>
          <ul>
            <li>Conditions of Use</li>
            <li>Privacy Notice</li>
            <li>Help</li>
          </ul>
        </div>
        <p>
          &copy; 1996-2022, AmazonClone.com, Inc. or its affiliates. Created by
          Oluwabi Ahmed (@Hamlanreh)
        </p>
      </footer>
    </main>
  );
};

export default Login;
