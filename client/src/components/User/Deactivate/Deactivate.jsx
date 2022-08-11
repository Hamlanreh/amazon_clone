import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Deactivate.css';

import useDocumentTitle from '../../../utils/useDocumentTitle';
import { deactivateAccount } from '../../../features/user/userSlice';

const Deactivate = () => {
  useDocumentTitle('Deactivate your account');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);

  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (user.email !== email.toLowerCase()) return;
    dispatch(deactivateAccount());
    navigate('/');
  };

  return (
    <main className="deactivate__section">
      <h1>Deactivate Account</h1>
      <p>Are you sure you want to deactivate your account?</p>

      <form className="deactivate__form" onSubmit={handleSubmit}>
        <label>
          Enter <strong>{`(${user.email})`}</strong> into the box below
        </label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button>Deactivate Account</button>
      </form>
    </main>
  );
};

export default Deactivate;
