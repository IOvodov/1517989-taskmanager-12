import SiteMenu from "./view/site-menu.js";
import Filter from "./view/filter.js";
import Board from "./view/board.js";
import Sort from "./view/sorting.js";
import TaskEdit from "./view/task-edit.js";
import Task from "./view/task.js";
import LoadMoreButton from "./view/load-more-button.js";
import {generateRandomTask} from "./mock/task.js";
import {generateTasksFilter} from "./mock/filter.js";
import {renderElement, RenderPosition} from "./utils.js";

const TASKS_COUNT = 25;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateRandomTask);
const tasksFilter = generateTasksFilter(tasks);

const mainElement = document.querySelector(`.main`);
const mainSectionElement = mainElement.querySelector(`.main__control`);

renderElement(mainSectionElement, new SiteMenu().Element, RenderPosition.BEFOREEND);
renderElement(mainElement, new Filter(tasksFilter).Element, RenderPosition.BEFOREEND);
renderElement(mainElement, new Board().Element, RenderPosition.BEFOREEND);

const boardElement = document.querySelector(`.board`);
const taskListElement = document.querySelector(`.board__tasks`);

renderElement(boardElement, new Sort().Element, RenderPosition.AFTERBEGIN);

renderElement(taskListElement, new TaskEdit(tasks[0]).Element, RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  renderElement(taskListElement, new Task(tasks[i]).Element, RenderPosition.BEFOREEND);
}

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTaskCount = TASKS_COUNT_PER_STEP;

  renderElement(boardElement, new LoadMoreButton().Element, RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderElement(taskListElement, new Task(task).Element, RenderPosition.BEFOREEND));

    renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
