import { popupImage, popupTitle } from './Constants.js';
export { Popup, PopupWithImage, PopupWithForm };

class Popup {
  constructor(popupselector) {
    this._popup = document.querySelector(popupselector);
    this._closePopup = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleOverlayClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }
  _handleOverlayClose = (evt) => {
    if (evt.target === this._popup) {
      this.close();
    }
  };

  setEventListeners() {
    this._closePopup.addEventListener('click', () => {
      this.close();
    });
  };
}
////////////////////////////////////
class PopupWithImage extends Popup {
  constructor(popupselector) {
    super(popupselector);
  };

  open(link, name) {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleOverlayClose);
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
  };
}

class PopupWithForm extends Popup {
  constructor({ popupselector, buttonSelectorSubmit, buttonSelectorP, handleFormSubmit }) {
    super(popupselector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector(buttonSelectorSubmit);
    this._buttonP = document.querySelector(buttonSelectorP);
    this._inputList = this._popup.querySelectorAll('.popup__form-text');
  };

  setEventListeners() {
    this._closePopup.addEventListener('click', () => {
      this.close();
    });
    this._buttonP.addEventListener('click', () => {
      this.open();
    });
    this._button.addEventListener('submit', (evt) => {
      this._handleFormSubmit(this._getInputValues());
      this._inputList.forEach(input => {
        this._formValues[input.name] = '';
        input.value = '';
      });
    });
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleOverlayClose);
    this._inputList.forEach(input => {
      input.value = '';
    });
  };
}
