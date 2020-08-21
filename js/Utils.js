// Закрытие попап кликом на оверлей
export const overlayClose = (event) => { 
    if (event.target.classList.contains('popup_opened')) { 
        closePopup(event.target); 
    } 
  }
// закрытие попап клавишей Esc
export const escClose = (event) => {
    if (event.key === 'Escape') {
      closePopupIfEsc();
    }
};