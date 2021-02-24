import React from 'react';
import { createCn } from 'bem-react-classname';
import { Button } from '../ui';
import './style.css';

type PropsType = {
  cancelAdding: () => void
  className?: string
};

export const AddLocationForm = ({
  cancelAdding,
  className,
}: PropsType) => {
  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  /* classes */
  const cn = createCn('addLocationForm', className);

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <Button className="addLocationForm__add">Add</Button>
      <Button className="addLocationForm__cancel" variant="outline" onClick={cancelAdding}>
        Cancel
      </Button>
    </form>
  );
};
