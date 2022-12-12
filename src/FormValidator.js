export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElementSelector = config.buttonElementSelector;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._buttonElement = formElement.querySelector(this._buttonElementSelector);
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._popupButtonSave = formElement.querySelector(this._config.buttonElementSelector);
  }

  enableButton() {
    this._popupButtonSave.classList.remove(this._inactiveButtonClass);
    this._popupButtonSave.disabled = false;
  }

  disableButton() {
    this._popupButtonSave.classList.add(this._inactiveButtonClass);
    this._popupButtonSave.disabled = true;
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = '';
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

