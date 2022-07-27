import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Signup.css';

import useDocumentTitle from '../../utils/useDocumentTitle';

import { ReactComponent as AmazonIcon } from '../../assets/images/amazon-logo.svg';
import { signup } from '../../features/user/userSlice';

const Signup = () => {
  useDocumentTitle('Create account on amazon clone');

  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup({ name, email, password, passwordConfirm }));
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

  useEffect(() => {
    if (isAuthenticated) return navigate('/');
  }, [navigate, isAuthenticated]);

  return (
    <main className="signup">
      <header className="signup__header">
        <Link to="/">
          <AmazonIcon className="signup__logo" />
        </Link>
      </header>

      <section className="signup__section">
        <form
          id="signup__form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h1>Create account</h1>

          <div className="form__control">
            <label htmlFor="">Your name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

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
            <p>
              <i>i</i>Passwords must be at least 6 characters.
            </p>
          </div>

          <div className="form__control">
            <label htmlFor="">Re-enter password</label>
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button className="signup__submitBtn" type="submit">
            Continue
          </button>

          <div className="signup__terms">
            <p>
              By creating an account, you agree to Amazon's <br />
              Conditions of Use and Privacy Notice.
            </p>
          </div>

          <div className="signup__more">
            <p>
              Already have an account? <Link to="/login">Sign-In</Link> <br />
              Buying for work? Create a free business account
            </p>
          </div>
        </form>
      </section>

      <footer className="signup__footer">
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

export default Signup;
