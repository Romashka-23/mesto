// Закрытие попап кликом на оверлей
const overlayClose = (event) => { 
    if (event.target.classList.contains('popup_opened')) { 
        closePopup(event.target); 
    } 
  }
// закрытие попап клавишей Esc
const escClose = (event) => {
    if (event.key === 'Escape') {
      closePopupIfEsc();
    }
};

// // Функция закрытия попап при нажатии Esc
const closePopupIfEsc = () =>{
    const searchOpenPopup = document.querySelector('.popup_opened');
    closePopup(searchOpenPopup);
};

export const closePopup = (popupWindow) => {
      // Снятие слушателя Esc
      document.removeEventListener('keydown', escClose);
      // Снятие слушателя Оверлей
      document.removeEventListener('mousedown', overlayClose);
      popupWindow.classList.remove('popup_opened');
};

//Открытие popup 
export const openPopup = (popupWindow) => {
    // Устанавливаем слушатель Esc
    document.addEventListener('keydown', escClose);
    // Устанавливаем слушатель Оверлэй
    document.addEventListener('mousedown', overlayClose);
    popupWindow.classList.add('popup_opened');
};

