import React from 'react';
import './OrderItem.css';

const OrderItem = ({ id, createdAt }) => {
  return (
    <li className="orderItem">
      <div className="orderItem__top">
        <h4>
          Order ID: <span>{id}</span>
        </h4>
        <div>
          <button>Invoice</button>
          <button>Track order 🎯</button>
        </div>
      </div>
      <div className="orderItem__bot">
        <p>
          Order date: <span>{new Date(`${createdAt}`).toDateString()}</span>
        </p>
        <p>✈ Estimated delivery: {new Date(Date.now()).toDateString()}</p>
      </div>
    </li>
  );
};

export default OrderItem;
