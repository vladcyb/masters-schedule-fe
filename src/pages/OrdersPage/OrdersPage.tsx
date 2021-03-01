import React, { useEffect, useState } from 'react';
import { thunks } from '../../store/thunks';
import { useAppDispatch } from '../../store';
import { Button, Container } from '../../components/ui';
import { Orders, CreateOrderForm } from '../../components';
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
    dispatch(thunks.user.getOrders());
  }, [dispatch]);

  return (
    <Container className="ordersPage">
      {isAdding ? (
        <CreateOrderForm className="ordersPage__createForm" onCancel={cancelAdding} />
      ) : (
        <>
          <Orders orders={orders} />
          <Button
            className="ordersPage__createButton"
            onClick={handleAddClick}
            type="submit"
          >
            Create
          </Button>
        </>
      )}
    </Container>
  );
};
