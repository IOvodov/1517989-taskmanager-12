import Abstract from "./abstract.js";

export default class TaskList extends Abstract {
  get template() {
    return (
      `<div class="board__tasks"></div>`
    );
  }
}
