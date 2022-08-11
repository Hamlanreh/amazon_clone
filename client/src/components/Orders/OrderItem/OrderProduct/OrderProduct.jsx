import React from 'react';
import './OrderProduct.css';

const OrderProduct = ({ product, quantity }) => {
  return (
    <li className="order__product">
      <img
        src={product.photo}
        alt={product.name}
        className="order__productImg"
      />
      <div className="order__productDetails">
        <h4 className="order__productName">{product.name}</h4>
        <p>${product.price}</p>
        <p className="order__productRating">
          {new Array(Math.round(product.ratingsAverage)).fill('⭐')}
        </p>
        <p>Quantity: {quantity}</p>
      </div>
    </li>
  );
};

export default OrderProduct;
