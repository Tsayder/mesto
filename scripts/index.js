import { Card, closePopup, handleKey, closeOverlay } from './Card.js';
import { FormValidator } from './FormValidator.js';


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

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(config, formElement);
  form.enableValidation();
});


initialCards.forEach((item) => {
  const cardy = new Card(item.name, item.link);
  const cardElement = cardy.generateCard();
  document.querySelector('.elements').append(cardElement);

});



const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_theme_profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const formProfileElement = document.querySelector('.popup__content_theme_profile');
const nameInput = popupProfile.querySelector('.popup__form-text_name_input');
const jobInput = popupProfile.querySelector('.popup__form-text_about_input');
const person = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const popupOpenButtonPlace = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_theme_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close_theme_place');
const formElementPlace = document.querySelector('.popup__content_theme_place')
const popupActual = document.querySelector('.popup_theme_card');
const popupActualClose = document.querySelector('.popup__close_theme_card');
const popupCreate = popupPlace.querySelector('.popup__button_theme_place');
const nameInputCards = popupPlace.querySelector('.popup__form-text_named_input');
const linkInputCards = popupPlace.querySelector('.popup__form-text_link_input');
const popupButtonSaveProfile = document.querySelector('.popup__button_theme_profile');
const popupButtonPlace = document.querySelector('.popup__button_theme_place');

// //////////////////////////////////////
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardу = new Card(nameInputCards.value, linkInputCards.value);
  const cardElement = cardу.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  nameInputCards.value = '';
  linkInputCards.value = '';
  closePopup(popupPlace);
  disableButton();
}
// ///////////////////////////

function enableButton() {
  popupButtonSaveProfile.classList.remove('popup__button_disabled');
  popupButtonSaveProfile.disabled = false;
}

function disableButton() {
  popupButtonPlace.classList.add('popup__button_disabled');
  popupButtonPlace.disabled = true;
}

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  addFields();
  enableButton();
});

popupProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

formProfileElement.addEventListener('submit', submitProfileForm);

popupOpenButtonPlace.addEventListener("click", () => {
  openPopup(popupPlace);
});

popupPlaceCloseButton.addEventListener('click', () => {
  closePopup(popupPlace);
  nameInputCards.value = '';
  linkInputCards.value = '';
});

formElementPlace.addEventListener('submit', submitAddCardForm);

function addFields() {
  nameInput.value = person.textContent;
  jobInput.value = about.textContent;
}

function submitProfileForm(evt) {
  evt.preventDefault();
  person.textContent = nameInput.value;
  about.textContent = jobInput.value;
  closePopup(popupProfile);

}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKey);
  document.addEventListener('mousedown', closeOverlay);
}

popupActualClose.addEventListener('click', () => {
  closePopup(popupActual);
});



