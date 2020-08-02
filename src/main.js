import {createMenuTempate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createBoardTemplate} from "./view/board.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createTaskTemplate} from "./view/task.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";

const TASKS_COUNT = 3;

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const mainElement = document.querySelector(`.main`);
const mainSectionElement = mainElement.querySelector(`.main__control`);

render(mainSectionElement, createMenuTempate(), `beforeend`);
render(mainElement, createFilterTemplate(), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = document.querySelector(`.board`);
const taskListElement = document.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);

render(taskListElement, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASKS_COUNT; i++) {
  render(taskListElement, createTaskTemplate(), `beforeend`);
}

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
