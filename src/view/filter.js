import {createElement} from "../utils.js";

const createFilterItemTemplate = (item, isChecked) => {
  const { title, count } = item;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >`
  );
};

export default class Filter {
  constructor(filterItems) {
    this._element = null;
    this._filterItems = filterItems;
  }

  get Template() {
    const filterItemsTemplate = this._filterItems
      .map((filterItem, index) => createFilterItemTemplate(filterItem, index === 0))
      .join(``);

    return (
      `<section class="main__filter filter container">
      ${filterItemsTemplate}
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
