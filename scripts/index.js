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
const popupActualImg = popupActual.querySelector('.popup__img');
const popupActualTitle = popupActual.querySelector('.popup__title');
const popupActualClose = document.querySelector('.popup__close_theme_card');
const cardsContainer = document.querySelector('.elements');
const template = document.querySelector('.template');
const popupCreate = popupPlace.querySelector('.popup__button_theme_place');
const nameInputCards = popupPlace.querySelector('.popup__form-text_named_input');
const linkInputCards = popupPlace.querySelector('.popup__form-text_link_input');
const popupButtonSaveProfile = document.querySelector('.popup__button_theme_profile');
const popupButtonPlace = document.querySelector('.popup__button_theme_place');

//////////////////////////////////////

const handleKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupCloseTotal = document.querySelector('.popup_opened');
    closePopup(popupCloseTotal);
  };
}

const closeOverlay = (evt) => {
  const popupCloseTotal = document.querySelector('.popup_opened');
  if (evt.target === popupCloseTotal) {
    closePopup(popupCloseTotal);
  }
};

///////////////////////////

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKey);
  document.addEventListener('mousedown', closeOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKey);
  document.removeEventListener('mousedown', closeOverlay);
}

///////////////////////////

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

function submitAddCardForm(evt) {
  evt.preventDefault();
  const card = createCardNode(nameInputCards.value, linkInputCards.value);
  cardsContainer.prepend(card);
  nameInputCards.value = '';
  linkInputCards.value = '';
  closePopup(popupPlace);
  disableButton();
}


const render = () => {
  initialCards.forEach((card) => {
    const currentCard = createCardNode(card.name, card.link);
    cardsContainer.append(currentCard);
  });
}


const deleteCard = (evt) => {
  const cardBlock = evt.target.closest('.card');
  cardBlock.remove();
}

function createCardNode(name, link) {
  const currentCard = template.content.cloneNode(true);
  const currentName = currentCard.querySelector('.card__title');
  currentName.textContent = name;
  const currentLink = currentCard.querySelector('.card__element');
  currentLink.src = link;
  currentLink.alt = name;

  const deleteButton = currentCard.querySelector('.card__icon');
  deleteButton.addEventListener('click', deleteCard);
  //кнопка like
  currentCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  //попап-картинка
  currentLink.addEventListener('click', function (evt) {
    popupActualImg.src = currentLink.src;
    popupActualImg.alt = name;
    popupActualTitle.textContent = name;
    openPopup(popupActual);
  });

  return currentCard;
}

popupCreate.addEventListener('click', submitAddCardForm);
popupActualClose.addEventListener('click', () => {
  closePopup(popupActual);
});

render();

