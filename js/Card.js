import { escClose, overlayClose} from './Utils.js';

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
        this._element.querySelector('.place__like').removeEventListener('click', () => {this._likeButtonToggle();});
        this._element.querySelector('.place__remove').removeEventListener('click', () =>{this._removeCard();});
        this._element.querySelector('.place__photo').removeEventListener('click', () => {this._openPopupImg();});
        this._element.remove(); 
    }
    
    //Открытие попапа карточки 
    _openPopupImg() {
    document.querySelector('.popup__big-image').src = this._image;
    document.querySelector('.popup__big-image').alt = this._text;
    document.querySelector('.popup__img-name').textContent = this._text;
    document.addEventListener('keydown', escClose);
    document.addEventListener('mousedown', overlayClose);
    document.querySelector('.popup_img').classList.toggle('popup_opened');
     };
             
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.place__photo').src = this._image;
        this._element.querySelector('.place__photo').alt = this._text;
        this._element.querySelector('.place__title').textContent = this._text;      

        return this._element;
    }

}
