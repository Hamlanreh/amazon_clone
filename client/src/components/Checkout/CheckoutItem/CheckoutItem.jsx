import React from 'react';
import { useDispatch } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './CheckoutItem.css';

import {
  removeItem,
  increase,
  decrease,
} from '../../../features/cart/cartSlice';

const CheckoutItem = checkoutItem => {
  const dispatch = useDispatch();

  return (
    <div className="checkoutItem">
      <img
        className="checkoutItem__img"
        src={checkoutItem.photo}
        alt={checkoutItem.name}
        crossOrigin="anonymous"
      />
      <div className="checkoutItem__detail">
        <h4 className="checkoutItem__heading">{checkoutItem.name}</h4>
        <p className="checkoutItem__rating">
          <span>
            {new Array(Math.round(checkoutItem.ratingsAverage)).fill('⭐')}
          </span>
        </p>
        <p className="checkoutItem__price">
          <strong>$</strong>
          <span>{checkoutItem.price}</span>
        </p>

        <div className="checkoutItem__totalItems">
          <button className="checkoutItem__btn">
            <span
              className="checkoutItem__removeFromCart"
              onClick={() => dispatch(decrease(checkoutItem.id))}
            >
              &minus;
            </span>

            <p className="checkoutItem__itemNoBox">
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: '2.4rem',
                  marginRight: '1rem',
                  color: 'var(--color-primary-orange)',
                }}
              />
              <span className="checkoutItem__itemNo">
                {checkoutItem.amount}
              </span>
            </p>

            <span
              className="checkoutItem__addToCart"
              onClick={() => dispatch(increase(checkoutItem.id))}
            >
              +
            </span>
          </button>

          <button
            className="checkoutItem__removeBtn"
            onClick={() => dispatch(removeItem(checkoutItem.id))}
          >
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
