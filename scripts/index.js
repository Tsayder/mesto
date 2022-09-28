const popupOpenButton = document.querySelector('.profile__open-popup');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__content');
let nameInput = popup.querySelector('.popup__content__popup__form-text_name_input');
let jobInput = popup.querySelector('.popup__content__popup__form-text_about_input');
let person = document.querySelector('.profile__title');
let about = document.querySelector('.profile__subtitle');

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

const closePopup = function () {
  popup.classList.toggle('popup_opened');
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
}
popupOpenButton.addEventListener('click', popupToggle);
popupOpenButton.addEventListener('click', formFields);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

