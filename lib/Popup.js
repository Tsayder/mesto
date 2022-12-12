"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupWithImage = exports.PopupWithForm = exports.Popup = void 0;
require("core-js/modules/es.symbol.description.js");
var _Constants = require("./Constants.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Popup {
  constructor(popupselector) {
    _defineProperty(this, "_handleEscClose", evt => {
      if (evt.key === 'Escape') {
        this.close();
      }
      ;
    });
    _defineProperty(this, "_handleOverlayClose", evt => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
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
  setEventListeners() {
    this._closePopup.addEventListener('click', () => {
      this.close();
    });
  }
}
////////////////////////////////////
exports.Popup = Popup;
class PopupWithImage extends Popup {
  constructor(popupselector) {
    super(popupselector);
  }
  open(link, name) {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleOverlayClose);
    _Constants.popupImage.src = link;
    _Constants.popupImage.alt = name;
    _Constants.popupTitle.textContent = name;
  }
}
exports.PopupWithImage = PopupWithImage;
class PopupWithForm extends Popup {
  constructor(_ref) {
    let {
      popupselector,
      buttonSelectorSubmit,
      buttonSelectorP,
      handleFormSubmit
    } = _ref;
    super(popupselector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector(buttonSelectorSubmit);
    this._buttonP = document.querySelector(buttonSelectorP);
    this._inputList = this._popup.querySelectorAll('.popup__form-text');
  }
  setEventListeners() {
    this._closePopup.addEventListener('click', () => {
      this.close();
    });
    this._buttonP.addEventListener('click', () => {
      this.open();
    });
    this._button.addEventListener('submit', evt => {
      this._handleFormSubmit(this._getInputValues());
      this._inputList.forEach(input => {
        this._formValues[input.name] = '';
        input.value = '';
      });
    });
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleOverlayClose);
    this._inputList.forEach(input => {
      input.value = '';
    });
  }
}
exports.PopupWithForm = PopupWithForm;