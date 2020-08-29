import Abstract from "./abstract.js";

export default class SmartView extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateElement() {
    let prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  updateData(updatedData, onlyUpdateData) {
    if (!updatedData) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      updatedData
    );

    if (onlyUpdateData) {
      return;
    }

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
