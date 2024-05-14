const GrabIntent = {
  None: 0,
  Move: 1,
  Resize: 2,
};

class Graph {
  static grabbedMovesThreshold = 3;

  // private
  elements = {};
  originalHeight;
  originalWidth;

  // public
  moveEase = 1.2;
  x = 0;
  y = 0;
  zoomEase = 100;
  zoom = 1;
  height
  width

  div;
  activeElement = {
    influence: {},
    isGrabbed: false,
    movedTimes: 0,
    isNew: false,
    el: null,
  };

  constructor({ width, height }) {
    this.div = document.createElement("div");
    this.div.id = "graph";
    this.height = height;
    this.width = width;

    this.originalHeight = this.height;
    this.originalWidth = this.width;

    this.render();

    return this;
  }

  render() {
    this.div.style.height = `${this.height}px`;
    this.div.style.width = `${this.width}px`;
    this.div.style.top = `${this.y}px`;
    this.div.style.left = `${this.x}px`;
    this.div.style.transform = `scale(${this.zoom})`
  }

  newElement(element) {
    let id;
    do {
      id = guidGenerator();
    } while (this.elements[id] !== undefined);

    element.div.classList.add("graphElement")
    element.div.id = id;
    this.elements[id] = element;

    this.div.appendChild(element.div);

    return id;
  }

  deleteElement(elementId) {
    const element = this.elements[elementId];
    element.onDelete();
    this.div.removeChild(element.div);
    delete this.elements[element.div.id];
  }

  getEventCoordinates(e) {
    const dx = this.width * (1 - this.zoom) / 2;
    const x = (e.clientX - dx - this.x) / (this.zoom);

    const dy = this.height * (1 - this.zoom) / 2;
    const y = (e.clientY - dy - this.y) / (this.zoom);

    return { x, y }
  }

  getTarget(e) {
    let target = e.target;
    while (true) {
      if (
        target.classList.contains("graphElement")
      ) {
        break;
      } else if (target === this.div) {
        target = null;
        break;
      }
      target = target.parentElement;
    }
    return target;
  }

  startGrabbing({ initiatedElId, x, y, elementId }) {
    this.activeElement.el = this.elements[elementId];

    this.activeElement.influence = this.activeElement.el.onGrab({ initiatedElId, x, y });
    this.activeElement.el.div.style.pointerEvents = "none";

    this.activeElement.isGrabbed = true;
    this.activeElement.movedTimes = 1;
  }

  stopGrabbing(target) {
    this.activeElement.el.div.style.pointerEvents = "unset";

    let hasMoved
    if (this.activeElement.isNew || this.activeElement.movedTimes > Graph.grabbedMovesThreshold) {
      // user was moving an element
      this.activeElement.el.finishGrab({ target });
      this.activeElement.el = null;
      hasMoved = true;
    } else {
      // user clicked on existing element, no grab happened
      hasMoved = false
    }

    // cleanup
    this.activeElement.influence = {};
    this.activeElement.isGrabbed = false;
    this.activeElement.isNew = false;
    this.activeElement.movedTimes = 0;

    return hasMoved;
  }
}
