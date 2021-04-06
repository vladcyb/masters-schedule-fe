import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { thunks } from '../../store/thunks';
import { getMaster } from '../../store/masterSlice/selectors';
import { Button, Container, Field } from '../../components/ui';
import { useField, useSetters } from '../../shared/hooks';
import { validateSetSchedule } from './validate';
import './style.css';

export const MySchedulePage = () => {
  /* hooks */
  const dispatch = useAppDispatch();
  const { data: { schedule: { hours } } } = useSelector(getMaster);
  const [getters, setters] = useSetters();
  const editField = useField('hours', getters, setters);

  /* state */
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(false);

  /* effects */
  useEffect(() => {
    dispatch(thunks.master.getSchedule());
  }, [dispatch]);

  useEffect(() => {
    setIsValid(validateSetSchedule(editField.props.value, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editField.props.value]);

  /* methods */
  const handleEdit = () => {
    setIsEditing(true);
  };

  const stopEdit = () => {
    setIsEditing(false);
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid) {
      return;
    }
    const response = await dispatch(thunks.master.setSchedule({ hours: editField.props.value }));
    if (response.meta.requestStatus === 'fulfilled') {
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <div className="mySchedulePage__hoursRow">
        <div>
          <span className="mySchedulePage__title">Расписание: </span>
          {isEditing ? (
            /* Форма для изменения часов работы */
            <form
              className="mySchedulePage__editForm"
              autoComplete="off"
              onSubmit={handleEditSubmit}
            >
              <Field
                className="mySchedulePage__editField"
                label="Введите часы работы:"
                {...editField.props}
              />
              <Button className="mySchedulePage__saveBtn" type="submit" sm>
                Сохранить
              </Button>
              <Button
                className="mySchedulePage__cancelBtn"
                variant="outline"
                sm
                onClick={stopEdit}
              >
                Отмена
              </Button>
            </form>
          ) : (
            <>
              <span className="mySchedulePage__hours">
                {hours || <i>(not set)</i>}
              </span>
              <button
                className="mySchedulePage__pencil"
                onClick={handleEdit}
                type="button"
                aria-label="редактировать"
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
