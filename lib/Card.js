"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Card {
  constructor(_ref) {
    let {
      name,
      link,
      template,
      handleCardClick
    } = _ref;
    this._name = name;
    this._link = link;
    this._template = template;
    this._element = this._getTemplate();
    this._cardElement = this._element.querySelector('.card__element');
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document.querySelector('.template').content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._cardElement.src = this._link;
    this._cardElement.alt = this._name;
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
    this._cardElement.addEventListener('click', () => {
      //this._handleOpenPopup();
      this._handleCardClick(this._link, this._name);
    });
    this._handleLike();
    this._handleDelete();
  }
}
exports.default = Card;