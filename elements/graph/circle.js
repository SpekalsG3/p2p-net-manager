class CircleElement {
  static defaultSize = 20;

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

  // interface
  constructor({ x, y }) {
    this.div = document.createElement("div");

    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.classList.add("graphNode");

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
