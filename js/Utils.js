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
      popupClassToggle(popupWindow);
  }

//Переключатель класса попапа
export const popupClassToggle = (item) => {
    item.classList.toggle('popup_opened');
}