import AbstractView from "./abstract.js";

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  get template() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }

  _clickHandler(event) {
    event.preventDefault();
    this._handlers.click();
  }

  setClickHandler(callback) {
    this._handlers.click = callback;
    this.element.addEventListener(`click`, this._clickHandler);
  }

  removeElement() {
    this.element.removeEventListener(`click`, this._clickHandler);

    super.removeElement();
  }
}
