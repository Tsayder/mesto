const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__content');
let nameInput = popup.querySelector('.popup__form-text_name_input');
let jobInput = popup.querySelector('.popup__form-text_about_input');
let person = document.querySelector('.profile__title');
let about = document.querySelector('.profile__subtitle');

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

const closePopup = function () {
  popup.classList.remove('popup_opened');
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
popupOpenButton.addEventListener('click', popupToggle, formFields());
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

//упер!
//Есть небольшие замечания по коду, которые бросают в глаз.
//Почисти его немного:
//Названия классов слишком большие и не по БЭМ.Стр. 6 - 7
//у тебя есть неиспользуемый метод на стр. 16
//У тебя 2 листенера на один и тот же ивент повешены, так не делается.Объедени это в один метод.Стр. 31 - 32

