import Sort from "../view/sorting";
import Board from "../view/board.js";
import TaskList from "../view/task-list";
import LoadMoreButton from "../view/load-more-button";
import {render, RenderPosition, remove} from "../utils/render.js";
import TaskPresenter from "./task";

const TASKS_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedTaskCount = TASKS_COUNT_PER_STEP;

    this._boardComponent = new Board();
    this._sortComponent = new Sort();
    this._taskListComponent = new TaskList();
    this._loadMoreButtonComponent = new LoadMoreButton();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderBoard() {
    this._renderSort();

    this._renderTasks(0, Math.min(this._boardTasks.length, TASKS_COUNT_PER_STEP));

    if (this._boardTasks.length > TASKS_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTask(task) {
    const taskPresenter = new TaskPresenter(this._taskListComponent);
    taskPresenter.init(task);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((task) => this._renderTask(task));
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASKS_COUNT_PER_STEP);

    this._renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._boardComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }
}
