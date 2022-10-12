const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__content');
const nameInput = popup.querySelector('.popup__form-text_name_input');
const jobInput = popup.querySelector('.popup__form-text_about_input');
const person = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const popupOpenButtonPlace = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_theme_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close_theme_place');
const formElementPlace = document.querySelector('.popup__content_theme_place')

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

const popupPlaceToggle = function () {
  popupPlace.classList.toggle('popup_opened');
}

const closePopup = function () {
  popup.classList.remove('popup_opened');
}

const closePopupPlace = function () {
  popupPlace.classList.remove('popup_opened');
}

function formFields() {
  nameInput.value = person.textContent;
  jobInput.value = about.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  person.textContent = nameInput.value;
  about.textContent = jobInput.value;
  closePopup();
  closePopupPlace();
}
popupOpenButton.addEventListener('click', popupToggle, formFields());
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

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

const tarjetas = document.querySelector('.elements');
const template = document.querySelector('.template');

const popupCreate = popupPlace.querySelector('.popup__button_theme_place');
const nameInputCards = popupPlace.querySelector('.popup__form-text_named_input');
const linkInputCards = popupPlace.querySelector('.popup__form-text_link_input');

const render = () => {
  initialCards.forEach((card) => {
    const currentCard = createCardNode(card.name, card.link);
    tarjetas.append(currentCard);
  });
  popupCreate.addEventListener('click', handleAddCard);
};

const deleteCard = (evt) => {
  const cardBlock = evt.target.closest('.card');
  cardBlock.remove();
};


function createCardNode(name, link) {
  const currentCard = template.content.cloneNode(true);
  const currentName = currentCard.querySelector('.card__title');
  currentName.textContent = name;
  const currentLink = currentCard.querySelector('.card__element');
  currentLink.src = link;

  const deleteButton = currentCard.querySelector('.card__icon');
  deleteButton.addEventListener('click', deleteCard);
  //кнопка like
  currentCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  //попап-картинка
  currentCard.querySelector('.card__element').addEventListener('click', function (evt) {
    popupActual = document.querySelector('.popup-card');
    popupActualImg = popupActual.querySelector('.popup-card__img');
    popupActualImg.src = currentLink.src;
    popupActualTitle = popupActual.querySelector('.popup-card__title');
    popupActualTitle.textContent = name;
    popupActual.classList.toggle('popup-card_opened');
    const removePopupActual = function () {
      popupActual.classList.remove('popup-card_opened');
    }
    popupActualClose = popupActual.querySelector('.popup-card__close').addEventListener('click', removePopupActual);
  });

  return currentCard;
}

const handleAddCard = () => {
  const card = createCardNode(nameInputCards.value, linkInputCards.value);
  tarjetas.prepend(card);
  nameInputCards.value = '';
  linkInputCards.value = '';
};

popupOpenButtonPlace.addEventListener('click', popupPlaceToggle);
popupPlaceCloseButton.addEventListener('click', popupPlaceToggle);
formElementPlace.addEventListener('submit', formSubmitHandler);

render();

