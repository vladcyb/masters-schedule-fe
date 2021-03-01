import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { Setters } from '../../../shared/hooks/useSetters/types';
import './style.css';

type PropsType = {
  className?: string
  name: string
  label: string
  photo: any
  setPhoto: Dispatch<SetStateAction<any>>
  error?: string
  allowedFormats?: string[]
  setters: Setters
};

export const UploadPhoto = ({
  className,
  name,
  label,
  photo,
  setPhoto,
  error,
  allowedFormats = [
    'image/svg',
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ],
  setters,
}: PropsType) => {
  /* state */
  const [preview, setPreview] = useState('');
  const [dragEnter, setDragEnter] = useState(false);

  /* methods */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    const image = files[0];
    const { type } = image;
    if (!allowedFormats?.includes(type)) {
      setters.setErrors((errors: any) => ({
        ...errors,
        [name]: 'Format is not supported!',
      }));
      return;
    }
    if (image) {
      setPhoto(image);
    }
  };

  const handleStopDrag = () => {
    setDragEnter(false);
  };

  const handleDragOver = () => {
    setDragEnter(true);
  };

  /* effects */
  useEffect(() => {
    if (!photo) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const res = reader.result;
      if (typeof res === 'string') {
        setPreview(res);
      }
    });
    reader.readAsDataURL(photo);
  }, [photo, setPhoto]);

  return (
    <div
      className={`uploadPhoto ${className || ''} ${dragEnter ? 'uploadPhoto_drag' : ''}`}
      onDragLeave={handleStopDrag}
      onDrop={handleStopDrag}
      onDragOver={handleDragOver}
    >
      <label className="uploadPhoto__label" htmlFor={name}>{label}</label>
      <div className="uploadPhoto__box">
        <input className="uploadPhoto__input" type="file" name={name} onChange={handleChange} />
        <img className="uploadPhoto__preview" src={preview} alt="" />
      </div>
      <div className="uploadPhoto__error">{error}</div>
    </div>
  );
};
