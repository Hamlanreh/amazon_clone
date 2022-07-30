import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Orders.css';

import useDocumentTitle from '../../../utils/useDocumentTitle';

import Loading from '../../Loading/Loading';
import OrderItem from './OrderItem/OrderItem';
import { getOrders } from '../../../features/orders/ordersSlice';

const Orders = () => {
  useDocumentTitle('Account orders and returns');

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { orders, isLoading } = useSelector(state => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return navigate('/');
    dispatch(getOrders(user._id));
  }, [dispatch, navigate, isAuthenticated, user]);

  if (isLoading) return <Loading />;

  return (
    <div className="user__ordersBox">
      <h1>Customer's Orders</h1>
      <ul className="user__orders">
        {orders.length > 1 ? (
          orders.map(order => (
            <OrderItem key={order._id} id={order._id} {...order} />
          ))
        ) : (
          <div className="user__ordersEmpty">
            <h2>You haven't ordered list is empty!</h2>
          </div>
        )}
      </ul>

      {/* <div className="orders__paginateBtn">
        <button>Previous</button>
        <button>Next</button>
      </div> */}
    </div>
  );
};

export default Orders;
