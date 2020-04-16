const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupTitle = document.querySelector('.popup__text_title');
let popupSubtitle = document.querySelector('.popup__text_subtitle');
const exitButton = document.querySelector('.popup__button-exit');
const formElement = document.querySelector('.popup__container');

function popupShow() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

function popupExit() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    popupExit();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupShow);
exitButton.addEventListener('click', popupExit);


