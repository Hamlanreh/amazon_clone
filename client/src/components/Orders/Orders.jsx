import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Orders.css';

import Loading from '../Loading/Loading';
import OrderItem from './OrderItem/OrderItem';
import useDocumentTitle from '../../utils/useDocumentTitle';
import { getOrders } from '../../features/orders/ordersSlice';

const Orders = () => {
  useDocumentTitle('Orders');
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { orders, isLoading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getOrders(user._id));
  }, [dispatch, user]);

  if (isLoading) return <Loading />;

  return (
    <section className="orders">
      <div className="orders__heading">
        <h1>
          Your Orders {isAuthenticated && <span>({orders.length} orders)</span>}
        </h1>
      </div>

      <div className="orders__content">
        {isAuthenticated && (
          <ul className="orders__list">
            {orders.map(order => (
              <OrderItem order={order} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Orders;
