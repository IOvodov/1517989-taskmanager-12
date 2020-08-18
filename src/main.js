import SiteMenu from "./view/site-menu.js";
import Filter from "./view/filter.js";
import Board from "./view/board.js";
import Sort from "./view/sorting.js";
import TaskEdit from "./view/task-edit.js";
import Task from "./view/task.js";
import TaskList from "./view/task-list.js";
import LoadMoreButton from "./view/load-more-button.js";
import {generateRandomTask} from "./mock/task.js";
import {generateTasksFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

const TASKS_COUNT = 25;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateRandomTask);
const tasksFilter = generateTasksFilter(tasks);

const renderTask = (taskListElement, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  const replaceCardToEditForm = () => {
    taskListElement.replaceChild(taskEditComponent.element, taskComponent.element);
  };

  const replaceEditFormToCard = () => {
    taskListElement.replaceChild(taskComponent.element, taskEditComponent.element);
  };

  taskComponent.element.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToEditForm();
  });

  taskEditComponent.element.querySelector(`.card__form`).addEventListener(`submit`, (event) => {
    event.preventDefault();
    replaceEditFormToCard();
  });

  render(taskListElement, taskComponent.element, RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector(`.main`);
const mainSectionElement = mainElement.querySelector(`.main__control`);

render(mainSectionElement, new SiteMenu().element, RenderPosition.BEFOREEND);
render(mainElement, new Filter(tasksFilter).element, RenderPosition.BEFOREEND);

const boardComponent = new Board();
render(mainElement, boardComponent.element, RenderPosition.BEFOREEND);
render(boardComponent.element, new Sort().element, RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskList();
render(boardComponent.element, taskListComponent.element, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  renderTask(taskListComponent.element, tasks[i]);
}

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTaskCount = TASKS_COUNT_PER_STEP;

  render(boardComponent.element, new LoadMoreButton().element, RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderTask(taskListComponent.element, task));

    renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
