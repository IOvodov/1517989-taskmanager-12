import Abstract from "./abstract.js";

export default class Filter extends Abstract {
  constructor(filterItems) {
    super();
    this._filterItems = filterItems;
  }

  get template() {
    const filterItemsTemplate = this._filterItems
      .map((filterItem, index) => this.createFilterItemTemplate(filterItem, index === 0))
      .join(``);

    return (
      `<section class="main__filter filter container">
        ${filterItemsTemplate}
      </section>`
    );
  }

  createFilterItemTemplate(item, isChecked) {
    const {title, count} = item;

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
  }
}
