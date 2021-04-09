import React, { useEffect, useState } from 'react';
import { thunks } from '../../store/thunks';
import { useAppDispatch } from '../../store';
import { Button, Container } from '../../components/ui';
import { CreateOrderForm, Orders } from '../../components';
import { UserRole } from '../../API/interfaces';
import './style.css';

type PropsType = {
  role: UserRole
};

export const OrdersPage = ({
  role,
}: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const stopAdding = () => {
    setIsAdding(false);
  };

  /* effects */
  useEffect(() => {
    dispatch(thunks.order.get());
  }, [dispatch]);

  return (
    <Container className="ordersPage">
      {isAdding ? (
        <CreateOrderForm className="ordersPage__createForm" close={stopAdding} />
      ) : (
        <>
          <Orders role={role} />
          {role === UserRole.CLIENT && (
            <Button
              className="ordersPage__createButton"
              onClick={handleAddClick}
              type="button"
            >
              Создать
            </Button>
          )}
        </>
      )}
    </Container>
  );
};
