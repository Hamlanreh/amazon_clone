import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './User.css';

const User = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return navigate('/');
  }, [navigate, isAuthenticated]);

  return (
    <main className="user__section">
      <div>
        <aside className="user__aside">
          <img src={user.photo} alt={user.name} crossOrigin="anonymous" />
          <ul className="user__nav">
            <li
              className={
                window.location.pathname === '/user' ||
                window.location.pathname === '/user/orders'
                  ? 'active'
                  : ''
              }
            >
              <Link to="orders">Orders</Link>
            </li>
            <li
              className={
                window.location.pathname === '/user/settings' ? 'active' : ''
              }
            >
              <Link to="settings">Settings</Link>
            </li>
            <li
              className={
                window.location.pathname === '/user/deactivate' ? 'active' : ''
              }
            >
              <Link to="deactivate">Deactivate</Link>
            </li>
          </ul>
        </aside>

        <section className="user__content">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default User;
