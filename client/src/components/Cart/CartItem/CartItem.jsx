import React from 'react';
import { useDispatch } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './CartItem.css';

import {
  removeItem,
  increase,
  decrease,
} from '../../../features/cart/cartSlice';

const CartItem = cartItem => {
  const dispatch = useDispatch();

  return (
    <div className="cartItem">
      <img
        className="cartItem__img"
        src={cartItem.photo}
        alt={cartItem.name}
        crossOrigin="anonymous"
      />
      <div className="cartItem__detail">
        <h4 className="cartItem__heading">{cartItem.name}</h4>
        <p className="cartItem__rating">
          <span>
            {new Array(Math.round(cartItem.ratingsAverage)).fill('⭐')}
          </span>
          <span>{cartItem.ratingsQuantity}</span>
        </p>
        <p className="cartItem__price">
          $<span>{cartItem.price}</span>
        </p>

        <div className="cartItem__totalItems">
          <button className="cartItem__btn">
            <span
              className="cartItem__removeFromCart"
              onClick={() => dispatch(decrease(cartItem.id))}
            >
              &minus;
            </span>

            <p className="cartItem__itemNoBox">
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: '2.4rem',
                  marginRight: '1rem',
                  color: 'var(--color-primary-orange)',
                }}
              />
              <span className="cartItem__itemNo">{cartItem.amount}</span>
            </p>

            <span
              className="cartItem__addToCart"
              onClick={() => dispatch(increase(cartItem.id))}
            >
              +
            </span>
          </button>

          <button
            className="cartItem__removeBtn"
            onClick={() => dispatch(removeItem(cartItem.id))}
          >
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
