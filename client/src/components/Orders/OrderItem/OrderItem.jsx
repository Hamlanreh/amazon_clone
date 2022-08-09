import React from 'react';
import './OrderItem.css';

const OrderItem = ({ order }) => {
  return (
    <li className="order__item">
      <div className="order__heading">
        <div>
          <h2>Order</h2>
          <p>{new Date(order.createdAt).toDateString()}</p>
        </div>
        <p>{order._id}</p>
      </div>
      <ul className="order__productList">
        {order.items.map(({ product, quantity }) => (
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
        ))}
      </ul>
    </li>
  );
};

export default OrderItem;
