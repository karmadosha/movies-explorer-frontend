import React, { useEffect } from 'react';
import './InfoTooltip.css';
import successIcon from '../../images/success-icon.svg';
import failedIcon from '../../images/failed-icon.svg';
import { usePopupClose } from '../../hooks/usePopupClose';

function InfoTooltip({ isOpen, onClose, errorMessage, infoMessage }) {
  
  usePopupClose(isOpen, onClose);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
      <button className="popup__close-btn" type="button" onClick={onClose} />
      {errorMessage ? (
        <>
          <img className='popup__img' src={failedIcon} alt='Сообщение об ошибке' />
          <p className='popup__title'>{errorMessage}</p>
        </>
      ) : (
        <>
          <img className='popup__img' src={successIcon} alt='Знак успеха' />
          <p className='popup__title'>{infoMessage}</p>
        </>
      )}
      </div>
    </div>
  )
}

export default InfoTooltip;