const showInputError = (formElement, inputElement, errorMessage, item) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(item.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(item.errorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, item) => {
  if (hasInvalidInput(inputList, item)) {
    buttonElement.classList.add(item.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  } else {

    buttonElement.classList.remove(item.inactiveButtonClass);
    buttonElement.disabled = '';
  }
};

const hideInputError = (formElement, inputElement, item) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(item.inputErrorClass);
  errorElement.classList.remove(item.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, item) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, item);
  } else {
    hideInputError(formElement, inputElement, item);
  }
};

const setEventListeners = (formElement, item) => {
  const inputList = Array.from(formElement.querySelectorAll(item.inputSelector));
  const buttonElement = formElement.querySelector(item.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, item);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, item);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, item);
    });
  });
};

const enableValidation = (item) => {
  const formList = Array.from(document.querySelectorAll(item.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, item);
  });
};



////////////////////
enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__form-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form-text_type_error',
  errorClass: 'popup__error_visible'
});
