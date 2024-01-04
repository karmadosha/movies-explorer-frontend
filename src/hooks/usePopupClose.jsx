import { useEffect } from 'react';

export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if(!isOpen) return;

    function closeByOverlay(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup();
      }
    };
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('mousedown', closeByOverlay);
    document.addEventListener('keydown', closeByEscape);

    return () => {
      document.removeEventListener('mousedown', closeByOverlay);
      document.removeEventListener('keydown', closeByEscape);
    };
  }, [isOpen, closePopup]);
};