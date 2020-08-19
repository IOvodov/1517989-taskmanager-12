import Abstract from "./abstract.js";

export default class LoadMoreButton extends Abstract {
  get template() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}
