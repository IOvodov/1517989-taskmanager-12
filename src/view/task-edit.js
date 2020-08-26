import {COLORS, DEFAULT_REPEATING_DAYS} from '../const.js';
import {isTaskExpired, isTaskRepeating, localizeDueDate} from "../utils/task.js";
import Abstract from './abstract.js';

const DEFAULT_TASK_BLANK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeatingDays: DEFAULT_REPEATING_DAYS
};

const createDateTemplate = (dueDate) => {
  return (
    `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dueDate === null ? `no` : `yes`}</span>
    </button>

    ${dueDate !== null ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${localizeDueDate(dueDate)}"
        />
      </label>
    </fieldset>` : ``}
    `
  );
};

const createRepeatingDaysTemplate = (repeatingDays) => {
  return (
    `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isTaskRepeating(repeatingDays) ? `yes` : `no`}</span>
    </button>

    ${isTaskRepeating(repeatingDays) ? `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${Object.entries(repeatingDays).map(([day, repeat]) => `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}"
          name="repeat"
          value="${day}"
          ${repeat ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}"
        >${day}</label
        >`).join(``)}
      </div>
    </fieldset>` : ``}
    `
  );
};

const createColorsTemplate = (currentColor) => {
  return COLORS.map((color) => `<input
      type="radio"
      id="color-${color}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${currentColor === color ? `checked` : ``}
    />
    <label
      for="color-${color}"
      class="card__color card__color--${color}"
    >${color}</label
  >`).join(``);
};

const createTaskEditTemplate = (task) => {
  const {dueDate, repeatingDays, color, description} = task;

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isTaskRepeating(repeatingDays)
    ? `card-repeat`
    : ``;

  const dateTemplate = createDateTemplate(dueDate);

  const repeatingDaysTemplate = createRepeatingDaysTemplate(repeatingDays);

  const colorsTemplate = createColorsTemplate(color);

  return (
    `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">

            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

        <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${dateTemplate}
                ${repeatingDaysTemplate}
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsTemplate}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};


export default class TaskEdit extends Abstract {
  constructor(task) {
    super();
    this._task = task || DEFAULT_TASK_BLANK;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  get template() {
    return createTaskEditTemplate(this._task);
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._callback.submit(this._task);
  }

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;
    this.element.querySelector(`.card__form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
