import {COLORS, DEFAULT_REPEATING_DAYS} from '../const.js';
import {isTaskExpired, isTaskRepeating, localizeDueDate} from "../utils/task.js";
import Abstract from './abstract.js';

const DEFAULT_TASK_BLANK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeatingDays: DEFAULT_REPEATING_DAYS,
  isFavorite: false,
  isArchive: false
};

const createDateTemplate = (dueDate, isDueDate) => {
  return (
    `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${isDueDate ? `yes` : `no`}</span>
    </button>

    ${isDueDate ? `<fieldset class="card__date-deadline">
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

const createRepeatingDaysTemplate = (repeatingDays, isRepeatingDays) => {
  return (
    `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isRepeatingDays ? `yes` : `no`}</span>
    </button>

    ${isRepeatingDays ? `<fieldset class="card__repeat-days">
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

const createTaskEditTemplate = (data) => {
  const {dueDate, repeatingDays, color, description, isDueDate, isRepeating} = data;

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isRepeating
    ? `card-repeat`
    : ``;

  const dateTemplate = createDateTemplate(dueDate, isDueDate);

  const repeatingDaysTemplate = createRepeatingDaysTemplate(repeatingDays, isRepeating);

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
  constructor(task = DEFAULT_TASK_BLANK) {
    super();
    this._data = TaskEdit.parseTaskToData(task);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  get template() {
    return createTaskEditTemplate(this._data);
  }

  updateElement() {
    let prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
    prevElement = null;
  }

  updateData(updatedData) {
    if (!updatedData) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      updatedData
    );

    this.updateElement();
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._callback.submit(TaskEdit.parseDataToTask(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;
    this.element.querySelector(`.card__form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  static parseTaskToData(task) {
    return Object.assign(
      {},
      task,
      {
        isDueDate: !!task.dueDate,
        isRepeating: isTaskRepeating(task.repeatingDays)
      }
    );
  }

  static parseDataToTask(data) {
    data = Object.assign({}, data);

    if (!data.isDueDate) {
      data.dueDate = null;
    }

    if (!data.isRepeating) {
      data.repeating = DEFAULT_REPEATING_DAYS;
    }

    delete data.isDueDate;
    delete data.isRepeating;

    return data;
  }
}
