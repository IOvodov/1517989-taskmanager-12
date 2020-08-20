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
import {render, RenderPosition, replace, remove} from "./utils/render.js";

const TASKS_COUNT = 25;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateRandomTask);
const tasksFilter = generateTasksFilter(tasks);

const renderTask = (taskListComponent, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  const replaceCardToEditForm = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditFormToCard = () => {
    replace(taskComponent, taskEditComponent);
  };

  taskComponent.setEditClickHandler(() => {
    replaceCardToEditForm();
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceEditFormToCard();
  });

  render(taskListComponent, taskComponent, RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector(`.main`);
const mainSectionElement = mainElement.querySelector(`.main__control`);

render(mainSectionElement, new SiteMenu(), RenderPosition.BEFOREEND);
render(mainElement, new Filter(tasksFilter), RenderPosition.BEFOREEND);

const boardComponent = new Board();
render(mainElement, boardComponent, RenderPosition.BEFOREEND);
render(boardComponent, new Sort(), RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskList();
render(boardComponent, taskListComponent, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  renderTask(taskListComponent, tasks[i]);
}

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTaskCount = TASKS_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButton();

  render(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

  loadMoreButtonComponent.setClickHandler(() => {
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderTask(taskListComponent, task));

    renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      remove(loadMoreButtonComponent);
    }
  });
}
