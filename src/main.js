import SiteMenu from "./view/site-menu.js";
import Filter from "./view/filter.js";
import BoardPresenter from "./presenter/board.js";
import {generateRandomTask} from "./mock/task.js";
import {generateTasksFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const TASKS_COUNT = 25;

const tasks = new Array(TASKS_COUNT).fill().map(generateRandomTask);
const tasksFilter = generateTasksFilter(tasks);

const mainElement = document.querySelector(`.main`);
const mainSectionElement = mainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(mainElement);

render(mainSectionElement, new SiteMenu(), RenderPosition.BEFOREEND);
render(mainElement, new Filter(tasksFilter), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
