"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Section {
  constructor(_ref, elements) {
    let {
      data,
      renderer
    } = _ref;
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(elements);
  }
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
  setItem(element) {
    this._container.prepend(element);
  }
}
exports.default = Section;