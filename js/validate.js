const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);// Выбираем элемент ошибки на основе id 
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {errorClass}) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_error');
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
 // Функция, которая проверяет валидность поля
 const isValid = (formElement, inputElement, newData) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, newData);
  } else {
    // hideInputError теперь получает в параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, newData); 
  }
};
//обход инпутов
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, {activeButtonClass}) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(activeButtonClass);
    buttonElement.setAttribute("disabled", "disabled"); 
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(activeButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  }
};


const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...newData}) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, newData); 

  // Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, newData);
      toggleButtonState(inputList, buttonElement, newData); 
    });
  });
};
const enableValidation = ({formSelector, ...data}) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
     formElement.addEventListener('submit', (evt) => {
  // У каждой формы отменим стандартное поведение
      evt.preventDefault();
            });
      // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, data);
  });
};

// Вызовем функцию
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__button-save',
  activeButtonClass: 'popup__button-save_disactive'
});