import Card from './Card.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import { Popup, PopupWithImage, PopupWithForm } from './Popup.js';

import './pages/index.css'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const formElementPlace = document.querySelector('.popup__content_theme_place');
const nameInput = document.querySelector('.popup__form-text_name_input');
const jobInput = document.querySelector('.popup__form-text_about_input');


const validatorAddCard = new FormValidator(config, formElementPlace);
const validatorEditProfile = new FormValidator(config, formProfileElement);

const popupWithImage = new PopupWithImage('.popup_theme_card');
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const CardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
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

function addFields() {
  nameInput.value = userInfo.getUserInfo().name.textContent;
  jobInput.value = userInfo.getUserInfo().about.textContent;
  console.log(userInfo.getUserInfo().name.textContent);
}

const popupProfileWithForm = new PopupWithForm({
  popupselector: '.popup_theme_profile',
  buttonSelectorSubmit: '.popup__content_theme_profile',
  buttonSelectorP: '.profile__edit-button',
  handleFormSubmit: (formValues) => {
    userInfo.setUserInfo(formValues.name, formValues.about);
    validatorEditProfile.disableButton();
    popupProfileWithForm.close();
  }
});

addFields();

popupProfileWithForm.setEventListeners();
validatorEditProfile.enableValidation();

///////////////////////////////////////////
const popupPlaceWithForm = new PopupWithForm({
  popupselector: '.popup_theme_place',
  buttonSelectorSubmit: '.popup__content_theme_place',
  buttonSelectorP: '.profile__add-button',
  handleFormSubmit: (formValues) => {
    const card = new Card({
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
