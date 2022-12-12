"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popupTitle = exports.popupImage = exports.popupElement = exports.popupActualClose = exports.popupActual = void 0;
const popupElement = document.querySelector('.popup_theme_card');
exports.popupElement = popupElement;
const popupImage = popupElement.querySelector('.popup__img');
exports.popupImage = popupImage;
const popupTitle = popupElement.querySelector('.popup__title');
exports.popupTitle = popupTitle;
const popupActual = document.querySelector('.popup_theme_card');
exports.popupActual = popupActual;
const popupActualClose = document.querySelector('.popup__close_theme_card');
exports.popupActualClose = popupActualClose;