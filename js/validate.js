//Деактивируем кнопку
const disactiveButtonSave = (formElement) => {
    const editButton = formElement.querySelector('.popup__button-save');
    editButton.classList.add('popup__button-save_disactive');
    editButton.setAttribute("disabled", "disabled");   
}

//Активируем кнопку если все инпуты валидны
const activeButtonSave = (formElement) => {
    const formInputs = Array.from(formElement.querySelectorAll('.popup__text'));
    if (!(formInputs.some(elem => elem.classList.contains('popup__text_error'))) && !(formInputs.some(elem => elem.value == "")))
    {
        const editButton = formElement.querySelector('.popup__button-save');
        editButton.classList.remove('popup__button-save_disactive');
        editButton.removeAttribute("disabled", "disabled");    
    }
}

const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);// Выбираем элемент ошибки на основе id 
    inputElement.classList.add('popup__text_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
    disactiveButtonSave(formElement);
  };
  
  const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__text_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
    activeButtonSave(formElement);
  };
   // Функция, которая проверяет валидность поля
   const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает в параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement);
    }
  };

  const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  
    // Обойдем все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement)
      });
    });
  };
  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__container'));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
       formElement.addEventListener('submit', (evt) => {
    // У каждой формы отменим стандартное поведение
        evt.preventDefault();
              });
        // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation();