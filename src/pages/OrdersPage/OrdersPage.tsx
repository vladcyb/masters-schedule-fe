import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserThunk from '../../store/userSlice/thunk';
import { Navbar } from '../../components/Navbar';
import { Order } from '../../components/Order';
import { useAppDispatch } from '../../store';
import { getOrders } from '../../store/userSlice/selectors';
import './style.css';
import { Spinner } from '../../components/ui';

export const OrdersPage = () => {
  /* hooks */
  const dispatch = useAppDispatch();
  const orders = useSelector(getOrders);

  /* effects */
  useEffect(() => {
    dispatch(UserThunk.getOrders());
  }, [dispatch]);

  return (
    <div className="ordersPage">
      <Navbar />
      <div className="ordersPage__orders">
        {orders.loading ? (
          <Spinner visible />
        ) : (
          orders.data.map((order) => (
            <div className="ordersPage__order" key={order.id}>
              <Order
                description={order.description}
                startDate={order.startDate}
                finishDate={order.finishDate}
                status={order.status}
                comment={order.comment}
                photo={order.photo}
                address={order.address}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
