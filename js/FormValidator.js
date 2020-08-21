export class FormValidator{
  constructor(formElement, parameters){
  this._formElement = formElement;
  this._formSelector = parameters.formSelector;
  this._inputSelector = parameters.inputSelector;
  this._inputErrorClass = parameters.inputErrorClass;
  this._errorClass = parameters.errorClass;
  this._submitButtonSelector = parameters.submitButtonSelector;
  this._activeButtonClass = parameters.activeButtonClass;
  }

  //Показать ошибку
_showInputError(inputElement, errorMessage){
   // Находим элемент ошибки
   const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);// Выбираем элемент ошибки на основе id 
   inputElement.classList.add(this._inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(this._errorClass);
};

//Убрать ошибку
_hideInputError(inputElement) {
  // Находим элемент ошибки
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

//обход инпутов
_hasInvalidInput() {
  // проходим по этому массиву методом some
  return this._inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

_toggleButtonState() {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput()) {
    // сделай кнопку неактивной
    this._buttonElement.classList.add(this._activeButtonClass);
    this._buttonElement.setAttribute('disabled', true); 
  } 
  else {
    // иначе сделай кнопку активной
    this._buttonElement.classList.remove(this._activeButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
};

// Функция, которая проверяет валидность поля
_isValid(inputElement) {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает в параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this._hideInputError(inputElement);
  }
};

_setEventListeners() {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState(); 

  // Обойдем все элементы полученной коллекции
  this._inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      this._isValid(inputElement);
      this._toggleButtonState(); 
    });
  });
};

enableValidation(){
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(this._formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
     formElement.addEventListener('submit', (evt) => {
  // У каждой формы отменим стандартное поведение
      evt.preventDefault();
            });
      // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    this._setEventListeners();
  });
};

resetValidationErrors() {
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
    this._toggleButtonState();
  })
  };

}




