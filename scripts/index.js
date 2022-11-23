import Card from './Card.js';
import { closePopup, handleKey, closeOverlay } from './utils.js';
import FormValidator from './FormValidator.js';


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

//////////////////////////////////////////////////
const elements = document.querySelector('.elements');

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  elements.append(card);
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
const nameInputCards = popupPlace.querySelector('.popup__form-text_named_input');
const linkInputCards = popupPlace.querySelector('.popup__form-text_link_input');

const validatorAddCard = new FormValidator(config, formElementPlace);
const validatorEditProfile = new FormValidator(config, formProfileElement);
//////////////////////////////////////
function createCard(name, link) {
  const cardу = new Card(name, link);
  const card = cardу.generateCard();
  return card;
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const card = createCard(nameInputCards.value, linkInputCards.value);
  elements.prepend(card);
  nameInputCards.value = '';
  linkInputCards.value = '';
  closePopup(popupPlace);
  validatorAddCard.disableButton();
}

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  addFields();
  validatorEditProfile.enableValidation();
});

popupProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

formProfileElement.addEventListener('submit', submitProfileForm);

popupOpenButtonPlace.addEventListener("click", () => {
  openPopup(popupPlace);
  validatorAddCard.enableValidation();
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



