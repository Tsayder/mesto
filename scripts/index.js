// получить элементы
const popupOpenButton = document.querySelector('.profile__open-popup');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__button')
const popupToggle = function () {
  popup.classList.toggle('popup_opened');
};

function popupOpen() {
  person.classList.remove('popup_opened');
}

let formElement = document.querySelector('.popup__content');
let nameInput = popup.querySelector('.popup__form-text_name');
let jobInput = popup.querySelector('.popup__form-text_profession');
let person = document.querySelector('.profile__title');
let about = document.querySelector('.profile__subtitle');

function formSubmitHandler(evt) {
  evt.preventDefault();
  person.textContent = nameInput.value;
  about.textContent = jobInput.value;
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupSaveButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);
