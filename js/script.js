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
// Функция добавления карточек
function makeCard(item) {
    const elementTemplate = document.querySelector('#card').content;
    const elements = document.querySelector('.elements');
    const element = elementTemplate.cloneNode(true);
    element.querySelector('.element__photo').src = item.link;
    element.querySelector('.element__photo').alt = item.name;
    element.querySelector('.element__title').textContent = item.name;

    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('element__like_active');
    });

    const removeButton = element.querySelector('.element__remove');
    removeButton.addEventListener('click', function(){
    removeButton.parentElement.remove();
    });

    const imagePopupButton = element.querySelector('.element__photo');
    imagePopupButton.addEventListener('click', function(){
        let popupImg = document.querySelector('.popup_img')
        let imgPopup = document.querySelector('.popup__big-image');
        imgPopup.src = item.link;
        imgPopup.alt = item.name;
        let imgName = document.querySelector('.popup__img-name');
        imgName.textContent = item.name;
        popupImg.classList.add('popup_opened');
        const exitPopupImg = document.querySelector('.popup__button-exit_img');
        exitPopupImg.addEventListener('click', function(){
            popupImg.classList.remove('popup_opened');
        });
        });    

    elements.prepend(element);
    return element;
}
// добавляем карточки из массива при загрузке страницы
initialCards.forEach(makeCard);

//Константы и переменные попапа профиля
const popup = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupTitle = document.querySelector('.popup__text_title');
let popupSubtitle = document.querySelector('.popup__text_subtitle');
const exitButton = document.querySelector('.popup__button-exit');
const formElement = document.querySelector('.popup__container');


// открыть попап редактирования профиля
function popupShow() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

//закрыть попап редактирования профиля
function popupExit() {
    popup.classList.remove('popup_opened');
}

//Сохранение по кнопке и ли клавишей Enter
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    popupExit();
}

//События попапа профиля
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupShow);
exitButton.addEventListener('click', popupExit);


//Попап добавления карточки
const popupAddCard = document.querySelector('.popup_cards');
const addCardButton = document.querySelector('.profile__add-button');
let popupCardTitle = popupAddCard.querySelector('.popup__text_title');
let popupCardSubtitle = popupAddCard.querySelector('.popup__text_subtitle');
const exitCardButton = popupAddCard.querySelector('.popup__button-exit');
const formElementCard = popupAddCard.querySelector('.popup__container');

//Открытие попапа добавления каточки
function popupCardShow() {
    popupAddCard.classList.add('popup_opened');
}

//закрыть попап редактирования карточки
function popupCardExit() {
    popupAddCard.classList.remove('popup_opened');
}

//Добавление карточки
function formSubmitHandlerCard (evt) {
    evt.preventDefault();
    if (popupCardTitle.value !== "" && popupCardSubtitle.value !== "")
    {
        let objCard = {name: popupCardTitle.value, link: popupCardSubtitle.value};
        initialCards.unshift(objCard);
        makeCard(objCard);
        popupCardTitle.value = null;
        popupCardSubtitle.value = null;
        popupCardExit();
    }
    else {
        popupCardTitle.value = null;
        popupCardSubtitle.value = null;
        popupCardExit();
    };

}
addCardButton.addEventListener('click', popupCardShow);
exitCardButton.addEventListener('click', popupCardExit);
formElementCard.addEventListener('submit', formSubmitHandlerCard);


