import Abstract from "./abstract.js";

export default class LoadMoreButton extends Abstract {
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
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener(`click`, this._clickHandler);
  }
}
