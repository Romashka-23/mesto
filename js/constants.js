// Карточки из коробки
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинск',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорск',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const parameters = {
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__button-save',
    activeButtonClass: 'popup__button-save_disactive'
  };
  

//Константы и переменные попапа профиля
export const popup = document.querySelector('.popup_profile');
export const editButton = document.querySelector('.profile__edit-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const popupTitle = document.querySelector('.popup__text_title');
export const popupSubtitle = document.querySelector('.popup__text_subtitle');
export const exitButton = document.querySelector('.popup__button-exit');
export const formElement = document.querySelector('.popup__container');

//Попап добавления карточки
export const popupAddCard = document.querySelector('.popup_cards');
export const addCardButton = document.querySelector('.profile__add-button');
export const popupCardTitle = popupAddCard.querySelector('.popup__text_title');
export const popupCardSubtitle = popupAddCard.querySelector('.popup__text_subtitle');
export const exitCardButton = popupAddCard.querySelector('.popup__button-exit');
export const formElementCard = popupAddCard.querySelector('.popup__container');

//Список элементов для добавления
export const elements = document.querySelector('.place-list'); 

//Попап  картинки
export const popupImg = document.querySelector('.popup_img');
export const exitPopupImg = document.querySelector('.popup__button-exit_img');

