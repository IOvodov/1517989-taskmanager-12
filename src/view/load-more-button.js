import {createElement} from "../utils.js";

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  get Template() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }

  get Element() {
    if (!this._element) {
      this._element = createElement(this.Template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
