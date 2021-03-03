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
  isFormSubmitted: boolean
};

export const UploadPhoto = ({
  className,
  name,
  label,
  photo,
  setPhoto,
  error,
  isFormSubmitted,
}: PropsType) => {
  /* state */
  const [preview, setPreview] = useState('');
  const [dragEnter, setDragEnter] = useState(false);
  const [showError, setShowError] = useState(false);

  /* methods */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setShowError(true);
    if (!files) {
      return;
    }
    const image = files[0];
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

  useEffect(() => {
    if (isFormSubmitted) {
      setShowError(true);
    }
  }, [isFormSubmitted]);

  return (
    <div
      className={`uploadPhoto ${className || ''} ${dragEnter ? 'uploadPhoto_drag' : ''}`}
      onDragLeave={handleStopDrag}
      onDrop={handleStopDrag}
      onDragOver={handleDragOver}
    >
      <label className="uploadPhoto__label" htmlFor={name}>{label}</label>
      <div className="uploadPhoto__box">
        <input
          className="uploadPhoto__input"
          type="file"
          name={name}
          onChange={handleChange}
          accept=".png,.jpg,.jpeg,.svg,.gif,.jfif"
        />
        <img className="uploadPhoto__preview" src={preview} alt="" />
      </div>
      <div className="uploadPhoto__error">{showError && error}</div>
    </div>
  );
};
