import {createElement} from "../utils.js";

export default class Board {
  constructor() {
    this._element = null;
  }

  get template() {
    return (
      `<section class="board container"></section>`
    );
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
