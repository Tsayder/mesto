export { Card, closePopup, handleKey, closeOverlay };

const popupElement = document.querySelector('.popup_theme_card');

const handleKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupCloseTotal = document.querySelector('.popup_opened');
    closePopup(popupCloseTotal);
    console.log('handlekey');

  };
}

const closeOverlay = (evt) => {
  const popupCloseTotal = document.querySelector('.popup_opened');
  if (evt.target === popupCloseTotal) {
    closePopup(popupCloseTotal);
  }
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKey);
  document.removeEventListener('mousedown', closeOverlay);
}


class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.template')
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__element').src = this._link;
    this._element.querySelector('.card__element').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  _handleLike() {
    this._element.querySelector('.card__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-button_active');
    });
  }

  _handleDelete() {
    const deleteButton = this._element.querySelector('.card__icon');
    deleteButton.addEventListener('click', function (evt) {
      const cardBlock = evt.target.closest('.card');
      cardBlock.remove();
    });

  }

  _setEventListeners() {
    this._element.querySelector('.card__element').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    this._handleLike();
    this._handleDelete();
  }


  _handleOpenPopup() {
    const popupImage = document.querySelector('.popup__img');
    popupImage.src = this._link;
    popupImage.alt = this._name;
    const popupTitle = document.querySelector('.popup__title');
    popupTitle.textContent = this._name;
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', closeOverlay);


  }
}

