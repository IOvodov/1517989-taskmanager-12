import TaskEdit from "../view/task-edit.js";
import Task from "../view/task.js";
import {RenderPosition, render, replace, remove} from "../utils/render.js";


export default class TaskPresenter {
  constructor(taskListContainer) {
    this._taskListContainer = taskListContainer;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
  }

  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new Task(this._task);
    this._taskEditComponent = new TaskEdit(this._task);

    this._taskComponent.setEditClickHandler(this._handleEditClick);
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

  _handleFormSubmitClick() {
    this._replaceEditFormToCard();
  }
}
