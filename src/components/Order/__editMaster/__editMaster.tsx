import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { thunks } from '../../../store/thunks';
import { Button, Select, SelectOptionType } from '../../ui';
import { getMasterList } from '../../../store/masterListSlice/selectors';
import './style.css';

type PropsType = {
  orderId: number
  close: () => void
};

export const EditMaster = ({
  close,
  orderId,
}: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();
  const masters = useSelector(getMasterList);
  const masterOptions = useMemo(() => masters.data.map<SelectOptionType>((item) => ({
    title: item.user.login,
    value: item.id,
  })), [masters.data]);

  /* state */
  const [selectedMasterId, setSelectedMasterId] = useState<undefined | number>(undefined);

  /* effects */
  useEffect(() => {
    dispatch(thunks.masters.update());
  }, [dispatch]);

  /* methods */
  const handleSaveClick = () => {
    if (typeof selectedMasterId !== 'number') {
      return;
    }
    close();
    dispatch(thunks.order.setMaster({
      id: orderId,
      masterId: selectedMasterId,
    }));
  };

  return (
    <div className="order__editMaster">
      <Select
        className="order__editMasterList"
        options={masterOptions}
        selected={selectedMasterId}
        setSelected={setSelectedMasterId}
        label="Выберите мастера:"
      />
      <div className="order__editMasterButtons">
        <Button className="order__editMasterCancel" onClick={close} variant="outline">
          Отмена
        </Button>
        <Button className="order__editMasterSave" onClick={handleSaveClick}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
