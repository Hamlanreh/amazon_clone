import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Settings.css';

import useDocumentTitle from '../../../utils/useDocumentTitle';

import { updateUser, updatePassword } from '../../../features/user/userSlice';

const Settings = () => {
  useDocumentTitle('Account profile settings and changes');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(user.photo);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleChangeProfile = e => {
    e.preventDefault();
    if (!name || !email || !photo) return;
    dispatch(updateUser({ id: user._id, name, email, photo }));

    setName('');
    setEmail('');
    return navigate('/user');
  };

  const handleChangePassword = e => {
    e.preventDefault();
    if (!password || !passwordConfirm) return;
    dispatch(updatePassword({ password, passwordConfirm }));

    setPassword('');
    setPasswordConfirm('');
    return navigate('/user');
  };

  return (
    <div className="user__profile">
      <h1>Profile settings</h1>

      <form
        id="user__profileForm"
        encType="multipart/form-data"
        onSubmit={handleChangeProfile}
      >
        <h2>User information</h2>

        <div className="form__control">
          <img src={user.photo} alt={user.name} crossOrigin="anonymous" />
          <div>
            <label>Upload user photo</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={e => setPhoto(e.target.files[0])}
            />
          </div>
        </div>

        <div className="form__control">
          <label>Username</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form__control">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Save changes</button>
      </form>

      <form id="user__passwordForm" onSubmit={handleChangePassword}>
        <h2>Change password</h2>
        <div className="form__control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
          />
        </div>

        <div className="form__control">
          <label>Confirm password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            minLength={8}
          />
        </div>
        <button type="submit">Save password</button>
      </form>
    </div>
  );
};

export default Settings;
