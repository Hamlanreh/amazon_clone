import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Product.css';

import { addItem } from '../../features/cart/cartSlice';

const Product = product => {
  const dispatch = useDispatch();

  return (
    <article className="product">
      <img
        className="product__img"
        src={product.photo}
        alt={product.name}
        crossOrigin="anonymous"
      />

      <Link to={`/product/${product.id}/reviews`}>
        <h4 className="product__title">{product.name}</h4>
      </Link>

      <p className="product__ratingBox">
        <span className="product__rating">
          {new Array(Math.floor(product.ratingsAverage)).fill('⭐')}
        </span>
        <span className="product__ratingNum">
          {product.ratingsQuantity} ratings
        </span>
      </p>

      <div className="product__priceBox">
        <p className="product__price">
          <sup>$</sup>
          <span>{product.price}</span>
          <sup>00</sup>
        </p>
        <p className="product__discount">
          <span>${product.priceDiscount}</span>
        </p>
      </div>

      <button
        className="product__cartBtn"
        onClick={() => dispatch(addItem({ ...product, amount: 1 }))}
      >
        <span>Add to Cart</span>
        <ShoppingCartOutlinedIcon
          sx={{
            fontSize: '2.4rem',
            marginLeft: '1rem',
            color: 'var(--color-primary-black)',
          }}
        />
      </button>
    </article>
  );
};

export default Product;
