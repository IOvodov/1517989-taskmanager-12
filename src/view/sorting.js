import {createElement} from "../utils.js";

export default class Sort {
  constructor() {
    this._element = null;
  }

  get Template() {
    return (
      `<div class="board__filter-list">
        <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
      </div>`
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
