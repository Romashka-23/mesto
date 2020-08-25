import {initialCards, parameters, popup, editButton, profileTitle, profileSubtitle,
    popupTitle, popupSubtitle, exitButton, formElement, popupAddCard,
    addCardButton, popupCardTitle, popupCardSubtitle, exitCardButton,
    formElementCard, elements, popupImg, exitPopupImg} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { closePopup, openPopup} from './utils.js';

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
addCardButton.addEventListener('click', () => {cleanErrorAddcard(); cleanPopupInputs(popupAddCard); openPopup(popupAddCard); });
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

