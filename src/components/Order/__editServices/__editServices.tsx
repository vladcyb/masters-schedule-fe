import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getServices } from '../../../store/serviceSlice/selectors';
import { useAppDispatch } from '../../../store';
import { thunks } from '../../../store/thunks';
import { Button, MultiSelect } from '../../ui';
import { MultiSelectOptionType } from '../../ui/MultiSelect/types';
import './style.css';

type PropsType = {
  orderId: number
  close: () => void
  setModalError: Dispatch<SetStateAction<string>>
};

export const EditServices = ({
  close,
  orderId,
  setModalError,
}: PropsType) => {
  /* state */
  const [servicesOptions, setServicesOptions] = useState<MultiSelectOptionType[]>([]);

  /* hooks */
  const { data: services } = useSelector(getServices);
  const dispatch = useAppDispatch();

  /* methods */
  const handleSaveClick = async () => {
    const serviceIds: number[] = [];
    servicesOptions.forEach((option) => {
      if (option.selected) {
        serviceIds.push(option.value);
      }
    });
    const result = await dispatch(thunks.order.setServices({
      id: orderId,
      services: serviceIds,
    }));
    if (result.meta.requestStatus === 'rejected') {
      setModalError(result.payload as string);
    }
    close();
  };

  /* effects */
  useEffect(() => {
    dispatch(thunks.service.update());
  }, [dispatch]);

  useEffect(() => {
    setServicesOptions(services.map((item) => ({
      value: item.id,
      title: item.title,
      selected: false,
    })));
  }, [services]);

  return (
    <div className="order__editServices">
      <MultiSelect
        options={servicesOptions}
        setOptions={setServicesOptions}
        label="Выберите услуги:"
      />
      <div className="order__serviceButtons">
        <Button className="order__editServicesCancel" variant="outline" onClick={close}>
          Отмена
        </Button>
        <Button className="order__editServicesSave" onClick={handleSaveClick}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};