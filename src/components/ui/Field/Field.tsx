import React from 'react';
import './style.css';

type PropsType = {
  label: string
  error?: string
  type?: 'text' | 'password'
  textarea?: boolean
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export const Field = ({
  value,
  onChange,
  type = 'text',
  name,
  error = '',
  label,
  className,
  textarea,
  ...inputProps
}: PropsType) => (
  <div className={`field ${className || ''} ${textarea ? 'field_textarea' : ''}`}>
    <label className="field__label" htmlFor={name}>{label}</label>
    {textarea ? (
      <textarea
        className="field__textarea"
        value={value}
        onChange={onChange}
        name={name}
        {...inputProps}
      />
    ) : (
      <input
        className="field__input"
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        {...inputProps}
      />
    )}
    <div className="field__error">{error}</div>
  </div>
);
