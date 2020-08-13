import {createElement} from "../utils.js";

export default class Board {
  constructor() {
    this._element = null;
  }

  get Template() {
    return (
      `<section class="board container">
        <div class="board__tasks"></div>
      </section>`
    );
  }

  get Element() {
    if (!this._element)
      this._element = createElement(this.Template);

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
