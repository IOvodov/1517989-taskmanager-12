import {isTaskExpired, isTaskRepeating, localizeDueDate} from "../utils/task.js";
import Abstract from "./abstract.js";

const createTaskTemplate = (task) => {
  const {color, description, dueDate, repeatingDays, isFavorite, isArchive} = task;

  const date = dueDate !== null
    ? localizeDueDate(dueDate)
    : ``;

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isTaskRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  const archiveClassName = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  const favoriteClassName = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  return (
    `<article class="card card--${color} ${deadlineClassName} ${repeatingClassName}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn ${archiveClassName}">
              archive
            </button>
            <button
              type="button"
              class="card__btn ${favoriteClassName}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends Abstract {
  constructor(task) {
    super();
    this._task = task;

    this._favoriteBtn = this.element.querySelector(`.card__btn--favorites`);
    this._archiveBtn = this.element.querySelector(`.card__btn--archive`);

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
    this._archiveBtnClickHandler = this._archiveBtnClickHandler.bind(this);
  }

  get template() {
    return createTaskTemplate(this._task);
  }

  _editClickHandler(event) {
    event.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }

  _favoriteBtnClickHandler(event) {
    event.preventDefault();
    this._callback.favoriteBtnClick();
  }

  setFavoriteBtnClickHandler(callback) {
    this._callback.favoriteBtnClick = callback;
    this._favoriteBtn.addEventListener(`click`, this._favoriteBtnClickHandler);
  }

  _archiveBtnClickHandler(event) {
    event.preventDefault();
    this._callback.archiveBtnClick();
  }

  setArchiveBtnClickHandler(callback) {
    this._callback.archiveBtnClick = callback;
    this._archiveBtn.addEventListener(`click`, this._archiveBtnClickHandler);
  }
}
