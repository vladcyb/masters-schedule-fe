import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import './style.css';

type PropsType = {
  className?: string
  name: string
  label: string
  photo: any
  setPhoto: Dispatch<SetStateAction<any>>
  error?: string
};

export const UploadPhoto = ({
  className,
  name,
  label,
  photo,
  setPhoto,
  error,
}: PropsType) => {
  /* state */
  const [preview, setPreview] = useState('');
  const [dragEnter, setDragEnter] = useState(false);

  /* methods */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setPhoto(files[0]);
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
