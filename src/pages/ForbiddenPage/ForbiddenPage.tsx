import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const ForbiddenPage = () => (
  <div className="forbiddenPage">
    {/* eslint-disable-next-line max-len */}
    <img className="forbiddenPage__img" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 473.931 473.931' style='enable-background:new 0 0 473.931 473.931;' xml:space='preserve'%3E%3Ccircle fill='%23ffc8c8' cx='236.966' cy='236.966' r='236.966'/%3E%3Cpath style='fill: %23ffffff;' d='M429.595,245.83c0,16.797-13.624,30.417-30.417,30.417H74.73c-16.797,0-30.421-13.62-30.421-30.417 v-17.743c0-16.797,13.624-30.417,30.421-30.417h324.448c16.793,0,30.417,13.62,30.417,30.417V245.83z'/%3E%3C/svg%3E%0A" alt="" />
    <div className="forbiddenPage__text">
      У вас недостаточно прав для просмотра этой страницы!
    </div>
    <div>
      <Link className="navlink" to="/">На главную</Link>
    </div>
  </div>
);