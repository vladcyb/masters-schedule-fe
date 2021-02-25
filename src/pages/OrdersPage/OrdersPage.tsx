import React, { useEffect, useState } from 'react';
import UserThunk from '../../store/userSlice/thunk';
import { useAppDispatch } from '../../store';
import { Button, Container } from '../../components/ui';
import { Orders, AddOrderForm } from '../../components';
import { OrdersStateType } from '../../store/userSlice/types';
import './style.css';

type PropsType = {
  orders: OrdersStateType
};

export const OrdersPage = ({ orders }: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

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
    <Container className="ordersPage">
      {isAdding ? (
        <AddOrderForm className="ordersPage__add" onCancel={cancelAdding} />
      ) : (
        <>
          <Orders orders={orders} />
          <Button
            className="ordersPage__addButton"
            onClick={handleAddClick}
            type="submit"
          >
            Add
          </Button>
        </>
      )}
    </Container>
  );
};
