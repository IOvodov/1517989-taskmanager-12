import TaskEdit from "../view/task-edit.js";
import Task from "../view/task.js";
import { RenderPosition, render, replace, remove } from "../utils/render.js";


export default class TaskPresenter {
  constructor(taskListContainer, changeData) {
    this._taskListContainer = taskListContainer;
    this._taskChangeData = changeData;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleArchiveClick = this._handleArchiveClick.bind(this);
  }

  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new Task(this._task);
    this._taskEditComponent = new TaskEdit(this._task);

    this._taskComponent.setEditClickHandler(this._handleEditClick);
    this._taskComponent.setFavoriteBtnClickHandler(this._handleFavoriteClick);
    this._taskComponent.setArchiveBtnClickHandler(this._handleArchiveClick);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmitClick);

    if (!prevTaskComponent && !prevTaskEditComponent) {
      render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._taskListContainer.element.contains(prevTaskComponent.element)) {
      replace(this._taskComponent, prevTaskComponent);
    }

    if (this._taskListContainer.element.contains(prevTaskEditComponent.element)) {
      replace(this._taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  _replaceCardToEditForm() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _replaceEditFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _handleEditClick() {
    this._replaceCardToEditForm();
  }

  _handleFormSubmitClick(task) {
    this._taskChangeData(task)
    this._replaceEditFormToCard();
  }

  _handleFavoriteClick() {
    this._taskChangeData(
      Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite
        }
      )
    );
  }

  _handleArchiveClick() {
    this._taskChangeData(
      Object.assign(
        {},
        this._task,
        {
          isArchive: !this._task.isArchive
        }
      )
    );
  }
}
