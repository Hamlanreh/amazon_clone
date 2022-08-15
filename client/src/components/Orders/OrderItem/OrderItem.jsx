import React from 'react';
import './OrderItem.css';

import OrderProduct from './OrderProduct/OrderProduct';

const OrderItem = ({ order }) => {
  return (
    <li className="order__item">
      <div className="order__heading">
        <div>
          <h2>Order</h2>
          <p>
            {`${new Date(order.createdAt).toDateString()} ${new Date(
              order.createdAt
            ).toLocaleTimeString()}`}
          </p>
        </div>
        <p>{order._id}</p>
      </div>
      <ul className="order__productList">
        {order.items.map(({ product, quantity }) => (
          <OrderProduct
            key={product._id}
            product={product}
            quantity={quantity}
          />
        ))}
      </ul>
    </li>
  );
};

export default OrderItem;
