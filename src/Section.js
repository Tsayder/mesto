export default class Section {
  constructor({ data, renderer }, elements) {
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


