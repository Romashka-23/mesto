import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { escClose, overlayClose, closePopup, popupClassToggle} from './Utils.js';

// Карточки из коробки
const initialCards = [
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

const parameters = {
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__button-save',
    activeButtonClass: 'popup__button-save_disactive'
  };
  

//Константы и переменные попапа профиля
const popup = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupTitle = document.querySelector('.popup__text_title');
const popupSubtitle = document.querySelector('.popup__text_subtitle');
const exitButton = document.querySelector('.popup__button-exit');
const formElement = document.querySelector('.popup__container');

//Попап добавления карточки
const popupAddCard = document.querySelector('.popup_cards');
const addCardButton = document.querySelector('.profile__add-button');
const popupCardTitle = popupAddCard.querySelector('.popup__text_title');
const popupCardSubtitle = popupAddCard.querySelector('.popup__text_subtitle');
const exitCardButton = popupAddCard.querySelector('.popup__button-exit');
const formElementCard = popupAddCard.querySelector('.popup__container');

//Список элементов для добавления
const elements = document.querySelector('.place-list'); 

//Попап  картинки
const popupImg = document.querySelector('.popup_img')
const imgPopup = document.querySelector('.popup__big-image');
const imgName = document.querySelector('.popup__img-name');
const exitPopupImg = document.querySelector('.popup__button-exit_img');


//Функции очистки ошибок
function  cleanErrorEditform() {
    editFormValidator.resetValidationErrors();
};

function cleanErrorAddcard() {
    addCardFormValidator.resetValidationErrors();
};

//Чистим инпуты
function cleanPopupInputs(item) {
    if (item.classList.contains('popup_cards')){
        const inputs = Array.from(item.querySelectorAll('.popup__text'));
        inputs.forEach((inputElement) => {
        inputElement.value = "";
    });
}
}

//Открытие popup 
function openPopup(popupWindow){
    cleanPopupInputs(popupWindow);
    // Устанавливаем слушатель Esc
    document.addEventListener('keydown', escClose);
    // Устанавливаем слушатель Оверлэй
    document.addEventListener('mousedown', overlayClose);
    popupClassToggle(popupWindow);
}

//Функция добавления карточки
function addCard(item) {
    const newCard = new Card(item);
    const cardElement = newCard.generateCard();
    elements.prepend(cardElement); 
};

//Изменить значения полей профиля
function editValuesProfile() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
};

//Сохранение по кнопке или клавишей Enter
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    closePopup(popup);
};

//Добавление карточки
function formSubmitHandlerCard (evt) {
    evt.preventDefault();
        const objCard = {name: popupCardTitle.value, link: popupCardSubtitle.value};
        addCard(objCard);
        popupCardTitle.value = null;
        popupCardSubtitle.value = null;
        closePopup(popupAddCard);
};

//События попапа добавления новой карточки
addCardButton.addEventListener('click', () => {cleanErrorAddcard(); openPopup(popupAddCard); });
exitCardButton.addEventListener('click', () => closePopup(popupAddCard));
formElementCard.addEventListener('submit', formSubmitHandlerCard);

//События попапа профиля
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', () => {editValuesProfile(); cleanErrorEditform(); openPopup(popup)});
exitButton.addEventListener('click', () => closePopup(popup));

//Событие попапа картинки
exitPopupImg.addEventListener('click', () => closePopup(popupImg));

// добавляем карточки из массива при загрузке страницы
initialCards.forEach((item) => {
    addCard(item);
});

const editFormValidator = new FormValidator(popup, parameters);
const addCardFormValidator = new FormValidator(popupAddCard, parameters);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

