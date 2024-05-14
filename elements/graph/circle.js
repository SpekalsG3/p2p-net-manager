class CircleElement {
  static defaultSize = 40;

  // private
  size = CircleElement.defaultSize;

  // public
  div;
  x;
  y;
  actions = [
  ];

  // private
  updatePos() {
    this.div.style.left = `${this.x - this.size / 2}px`;
    this.div.style.top  = `${this.y - this.size / 2}px`;
  }

  // public
  static generateDiv() {
    const div = document.createElement("div");

    div.style.width = `${CircleElement.defaultSize}px`;
    div.style.height = `${CircleElement.defaultSize}px`;
    div.classList.add("graphNode");

    return div;
  }

  constructor({ x, y }) {
    this.div = CircleElement.generateDiv();
    this.div.style.position = "absolute";

    this.x = x;
    this.y = y;
    this.updatePos();

    return this;
  }

  onGrab({ initiatedElId, x, y }) {
  }

  onMouseMove(x, y) {
    this.x = x;
    this.y = y;
    this.updatePos();
  }

  onDelete() {
  }

  finishGrab({ target }) {}
}
