import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserThunk from '../../store/userSlice/thunk';
import { Navbar } from '../../components/Navbar';
import { useAppDispatch } from '../../store';
import { getOrders } from '../../store/userSlice/selectors';
import { Button } from '../../components/ui';
import { Orders } from '../../components/Orders';
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

  /* effects */
  useEffect(() => {
    dispatch(UserThunk.getOrders());
  }, [dispatch]);

  return (
    <div className="ordersPage">
      <Navbar />
      {isAdding ? (
        <>TODO</>
      ) : (
        <>
          <div className="ordersPage__orders">
            <Orders orders={orders} />
          </div>
          <Button className="ordersPage__addButton" onClick={handleAddClick}>
            Add
          </Button>
        </>
      )}
    </div>
  );
};
