import {openPopup} from './utilits.js';
import {popupImg} from './constants.js';
//Класс Card
export class Card{
    constructor(data){
        this._image = data.link;
        this._text = data.name;
    }
    _getTemplate() {
        const cardElement = document.querySelector('#card').content.querySelector('.place').cloneNode(true);
        return cardElement;
    }
    
    //Приватный метод добавление слушателей
    _setEventListeners(){
        
        this._element.querySelector('.place__like').addEventListener('click', () => {this._likeButtonToggle();}); //переключение лайка
        this._element.querySelector('.place__remove').addEventListener('click', () => {this._removeCard();}); //удаление карточки
        this._element.querySelector('.place__photo').addEventListener('click', () => {this._openPopupImg();}); //открытие попапа
    }
    // Приватный метод добавить-убрать лайк
    _likeButtonToggle() {
        this._element.querySelector('.place__like').classList.toggle('place__like_active');
    }
    //Приватный метод удаление карточки и слушателей
    _removeCard() {
        this._element.remove(); 
        this._element = null;
    }
    
    //Открытие попапа карточки 
    _openPopupImg() {
        const bigImage = document.querySelector('.popup__big-image');
        bigImage.src = this._image;
        bigImage.alt = this._text;
    document.querySelector('.popup__img-name').textContent = this._text;
    openPopup(popupImg);
    
     };
             
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const placePhoto = this._element.querySelector('.place__photo');
        placePhoto.src = this._image;
        placePhoto.alt = this._text;
        this._element.querySelector('.place__title').textContent = this._text;      

        return this._element;
    }

}
