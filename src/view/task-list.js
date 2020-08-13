import {createElement} from "../utils.js";

export default class TaskList {
  constructor() {
    this._element = null;
  }

  get Template() {
    return (
      `<div class="board__tasks"></div>`
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
