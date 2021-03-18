import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch } from '../../../store';
import { useField, useSetters } from '../../../shared/hooks';
import { thunks } from '../../../store/thunks';
import { Button, Field } from '../../ui';
import { validateStartDateForm } from './validate';
import './style.css';

type PropsType = {
  onClose: () => void
  id: number
  setModalError: Dispatch<SetStateAction<string>>
};

export const EditStartDateForm = ({
  id,
  onClose,
  setModalError,
}: PropsType) => {
  /* state */
  const [isValid, setIsValid] = useState(false);

  /* hooks */
  const dispatch = useAppDispatch();
  const [getters, setters] = useSetters();

  /* fields */
  const startDateField = useField('date', getters, setters);
  const startTimeField = useField('time', getters, setters);

  /* methods */
  const editStartDate = async (e: React.FormEvent) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    const date = startDateField.props.value;
    const time = startTimeField.props.value;
    setIsValid(validateStartDateForm({
      date,
      time,
    }, setters));
    if (isValid) {
      const startDate = `${date}T${time}`;
      const result = await dispatch(thunks.order.setStartDate({
        id,
        date: startDate,
      }));
      onClose();
      if (result.meta.requestStatus === 'rejected') {
        setModalError(result.payload as string);
      }
    }
  };

  /* effects */
  useEffect(() => {
    setIsValid(validateStartDateForm({
      date: startDateField.props.value,
      time: startTimeField.props.value,
    }, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateField.props.value, startTimeField.props.value]);

  return (
    <form
      className="order__editStartDateForm"
      onSubmit={editStartDate}
      autoComplete="off"
    >
      <Field
        className="order__editStartDateField"
        label="Дата:"
        autoFocus
        mask="9999-99-99"
        placeholder="ГГГГ-ММ-ДД"
        {...startDateField.props}
      />
      <Field
        label="Время:"
        mask="99:99"
        placeholder="ЧЧ:ММ"
        {...startTimeField.props}
      />
      <div className="order__controls">
        <Button className="order__save" type="submit">
          Сохранить
        </Button>
        <Button className="order__cancel" onClick={onClose} variant="outline">
          Отмена
        </Button>
      </div>
    </form>
  );
};
