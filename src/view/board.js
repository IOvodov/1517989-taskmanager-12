import Abstract from "./abstract.js";

export default class Board extends Abstract {
  get template() {
    return (
      `<section class="board container"></section>`
    );
  }
}
