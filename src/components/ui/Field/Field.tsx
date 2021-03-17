import React from 'react';
import Input from 'react-input-mask';
import './style.css';

type PropsType = {
  label: string
  error?: string
  type?: 'text' | 'password'
  textarea?: boolean
  mask?: string
  maskChar?: string | null
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
  mask,
  maskChar,
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
      <Input
        className="field__input"
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        mask={mask || ''}
        maskChar={maskChar || null}
        {...inputProps}
      />
    )}
    <div className="field__error">{error}</div>
  </div>
);
