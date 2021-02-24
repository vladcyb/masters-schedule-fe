import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserThunk from '../../store/userSlice/thunk';
import { useAppDispatch } from '../../store';
import { getOrders } from '../../store/userSlice/selectors';
import { Button } from '../../components/ui';
import { Orders, AddOrderForm } from '../../components';
import './style.css';

export const OrdersPage = () => {
  /* hooks */
  const dispatch = useAppDispatch();
  const orders = useSelector(getOrders);

  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const cancelAdding = () => {
    setIsAdding(false);
  };

  /* effects */
  useEffect(() => {
    dispatch(UserThunk.getOrders());
  }, [dispatch]);

  return (
    <div className="ordersPage">
      {isAdding ? (
        <AddOrderForm className="ordersPage__add" onCancel={cancelAdding} />
      ) : (
        <>
          <div className="ordersPage__orders">
            <Orders orders={orders} />
          </div>
          <Button
            className="ordersPage__addButton"
            onClick={handleAddClick}
            type="submit"
          >
            Add
          </Button>
        </>
      )}
    </div>
  );
};
