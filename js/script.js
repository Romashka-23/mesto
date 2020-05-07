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

//шаблон для добавления
const elementTemplate = document.querySelector('#card').content;  
const elements = document.querySelector('.place-list'); 

//Попап  картинки
const popupImg = document.querySelector('.popup_img')
const imgPopup = document.querySelector('.popup__big-image');
const imgName = document.querySelector('.popup__img-name');
const exitPopupImg = document.querySelector('.popup__button-exit_img');

// Функция добавить-убрать лайк
function likeButtonToggle(evt) {
    evt.target.classList.toggle('place__like_active');
};
// Функция удаления карточки
function removeCard(evt) {
    evt.target.closest('.place').querySelector('.place__like').removeEventListener('click', likeButtonToggle);
    evt.target.closest('.place').querySelector('.place__remove').removeEventListener('click', removeCard);
    evt.target.closest('.place').querySelector('.place__photo').removeEventListener('click', openPopupImg);
    evt.target.closest('.place').remove(); 
};

//Открытие попапа карточки 
function openPopupImg(evt) {
    imgPopup.src = evt.target.src;
    imgPopup.alt = evt.target.alt;
    imgName.textContent = evt.target.alt;
    togglePopup(popupImg); 
  }

// Функция создания карточек
function makeCard(item) {
    const element = elementTemplate.cloneNode(true); //создаем элемент
    const imagePopupButton = element.querySelector('.place__photo'); //находим картинку
    imagePopupButton.src = item.link;
    imagePopupButton.alt = item.name;
    element.querySelector('.place__title').textContent = item.name;

    const likeButton = element.querySelector('.place__like');
    likeButton.addEventListener('click', likeButtonToggle); //переключение лайка
    
    const removeButton = element.querySelector('.place__remove');
    removeButton.addEventListener('click', removeCard); //удаление карточки
        
    imagePopupButton.addEventListener('click', openPopupImg); //открытие попапа

    return element;
};

//Функция добавления карточки
function addCard(item) {
    const newCard = makeCard(item);
    elements.prepend(newCard); 
}

// Открыть/закрыть попап
function togglePopup(item) {
        item.classList.toggle('popup_opened');
}

//Изменить значения полей профиля
function editValuesProfile() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
};

//Сохранение по кнопке и ли клавишей Enter
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    togglePopup(popup);
}

//Добавление карточки
function formSubmitHandlerCard (evt) {
    evt.preventDefault();
        const objCard = {name: popupCardTitle.value, link: popupCardSubtitle.value};
        addCard(objCard);
        popupCardTitle.value = null;
        popupCardSubtitle.value = null;
        togglePopup(popupAddCard);
}

//События попапа добавления новой карточки
addCardButton.addEventListener('click', () => togglePopup(popupAddCard));
exitCardButton.addEventListener('click', () => togglePopup(popupAddCard));
formElementCard.addEventListener('submit', formSubmitHandlerCard);

//События попапа профиля
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', () => {editValuesProfile(), togglePopup(popup)});
exitButton.addEventListener('click', () => togglePopup(popup));

//Событие попапа картинки
exitPopupImg.addEventListener('click', () => togglePopup(popupImg));

// добавляем карточки из массива при загрузке страницы
initialCards.forEach(addCard);

