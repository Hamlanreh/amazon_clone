import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Header.css';

import { ReactComponent as AmazonIcon } from '../../assets/images/amazon-logo.svg';
import { getMe, logout } from '../../features/user/userSlice';
import { calculateTotals } from '../../features/cart/cartSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { amount } = useSelector(state => state.cart);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(calculateTotals());
  });

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleAuth = () => {
    if (!isAuthenticated) return navigate('/login');
    dispatch(logout());
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchText)
      navigate({ pathname: `/search`, search: `?name=${searchText}` });
    setSearchText('');
  };

  return (
    <header className="header" id="top">
      <div className="header__logoBox">
        <Link to="/">
          <AmazonIcon className="header__logo" alt="Amazon icon" />
        </Link>
      </div>

      <div className="header__location">
        <LocationOnOutlinedIcon sx={{ fontSize: '2rem', alignSelf: 'end' }} />
        <div>
          <span className="header__optionTop">Deliver to</span>
          <span className="header__optionBot">
            Nigeria
            {/* {window.navigator.geolocation.getCurrentPosition(position => {
              return position;
            })} */}
          </span>
        </div>
      </div>

      <form className="header__search">
        <select className="header__searchOption">
          <option defaultValue="all">All</option>
          <option value="books">Books</option>
          <option value="category">Category</option>
          <option value="electronics">Electronics</option>
          <option value="games">Games</option>
          <option value="fashion">Fashion</option>
          <option value="sport">Sport</option>
          <option value="technology">Technology</option>
        </select>
        <input
          type="text"
          className="header__searchInput"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="header__searchBtn"
          onClick={handleSearch}
        >
          <SearchOutlinedIcon sx={{ fontSize: '3rem' }} />
        </button>
      </form>

      <div className="header__country">
        {/* TODO: Optional  */}
        {/* Contains user current country */}
      </div>

      <div className="header__option" onClick={handleAuth}>
        <span className="header__optionTop">
          Hello, {isAuthenticated ? user.name.split(' ')[0] : 'Guest'}
        </span>

        {isAuthenticated ? (
          <span className="header__optionBot">Sign Out</span>
        ) : (
          <span className="header__optionBot">Account &amp; Lists</span>
        )}
      </div>

      <Link to={user?._id ? `/user` : `/`}>
        <div className="header__option">
          <span className="header__optionTop">Returns</span>
          <span className="header__optionBot">&amp; Orders</span>
        </div>
      </Link>

      <Link to="/cart">
        <div className="header__cartBox">
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: '3rem', fill: 'var(--color-primary-orange)' }}
          />
          <span className="cartDetail">Cart</span>
          <span className="cartTotal">{amount}</span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
