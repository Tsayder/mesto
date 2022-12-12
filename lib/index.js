"use strict";

var _Card = _interopRequireDefault(require("./Card.js"));
var _UserInfo = _interopRequireDefault(require("./UserInfo.js"));
var _FormValidator = _interopRequireDefault(require("./FormValidator.js"));
var _Section = _interopRequireDefault(require("./Section.js"));
var _Popup = require("./Popup.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers); // 4, 6, 10
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];
const config = {
  formSelector: '.popup__content',
  inputSelector: '.popup__form-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form-text_type_error',
  errorClass: 'popup__error_visible',
  buttonElementSelector: '.popup__button'
};
const elementSelector = '.elements';
const formProfileElement = document.querySelector('.popup__content_theme_profile');
const person = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const formElementPlace = document.querySelector('.popup__content_theme_place');
const validatorAddCard = new _FormValidator.default(config, formElementPlace);
const validatorEditProfile = new _FormValidator.default(config, formProfileElement);
const popupWithImage = new _Popup.PopupWithImage('.popup_theme_card');
const userInfo = new _UserInfo.default('.profile__title', '.profile__subtitle');
const CardList = new _Section.default({
  data: initialCards,
  renderer: item => {
    const card = new _Card.default({
      name: item.name,
      link: item.link,
      template: '.template',
      handleCardClick: (link, name) => {
        popupWithImage.open(link, name);
        popupWithImage.setEventListeners();
      }
    });
    const cardElement = card.generateCard();
    CardList.setItem(cardElement);
  }
}, elementSelector);
CardList.renderItems();
const popupProfileWithForm = new _Popup.PopupWithForm({
  popupselector: '.popup_theme_profile',
  buttonSelectorSubmit: '.popup__content_theme_profile',
  buttonSelectorP: '.profile__edit-button',
  handleFormSubmit: formValues => {
    person.textContent = formValues.name;
    about.textContent = formValues.about;
    popupProfileWithForm.close();
  }
});
popupProfileWithForm.setEventListeners();
validatorEditProfile.enableValidation();

///////////////////////////////////////////
const popupPlaceWithForm = new _Popup.PopupWithForm({
  popupselector: '.popup_theme_place',
  buttonSelectorSubmit: '.popup__content_theme_place',
  buttonSelectorP: '.profile__add-button',
  handleFormSubmit: formValues => {
    const card = new _Card.default({
      name: formValues.named,
      link: formValues.link,
      template: '.template',
      handleCardClick: (link, name) => {
        popupWithImage.open(link, name);
        popupWithImage.setEventListeners();
        validatorAddCard.disableButton();
      }
    });
    const cardElement = card.generateCard();
    CardList.setItem(cardElement);
    popupPlaceWithForm.close();
  }
});
popupPlaceWithForm.setEventListeners();
validatorAddCard.enableValidation();