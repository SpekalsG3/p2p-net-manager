class Graph {
  static grabbedMovesThreshold = 3;

  // private
  elements = {};

  // public
  div;
  activeElement = {
    isGrabbed: false,
    movedTimes: 0,
    isNew: false,
    el: null,
  };

  constructor() {
    this.div = document.createElement("div");
    this.div.id = "graph";
    return this;
  }

  newElement(element) {
    let id;
    do {
      id = guidGenerator();
    } while (this.elements[id] !== undefined);

    element.div.setAttribute("data-type", "graph_element");
    element.div.id = id;
    this.elements[id] = element;

    this.div.appendChild(element.div);

    return id;
  }

  deleteElement(element) {
    this.div.removeChild(element.div);
    delete this.elements[element.id];
  }

  getTarget(e) {
    let target = e.target;
    while (true) {
      if (target.getAttribute("data-type") === "graph_element") {
        break;
      } else if (target === nodeMenu.div) {
        break;
      } else if (target === this.div) {
        target = null;
        break;
      }
      target = target.parentElement;
    }
    return target;
  }

  startGrabbing(elementId, x, y) {
    this.activeElement.el = this.elements[elementId];

    this.activeElement.el.onGrab(x, y);
    this.activeElement.el.div.style.pointerEvents = "none";

    this.activeElement.isGrabbed = true;
    this.activeElement.movedTimes = 1;
  }

  stopGrabbing(target, x, y) {
    this.activeElement.el.div.style.pointerEvents = "unset";

    if (this.activeElement.isNew || this.activeElement.movedTimes > Graph.grabbedMovesThreshold) {
      // user was moving an element
      this.activeElement.el.finishGrab({ target });
      this.activeElement.el = null;
    } else {
      // user clicked on existing element, select it
      nodeMenu.show(x, y, this.activeElement.el.actions);
    }

    this.activeElement.isGrabbed = false;
    this.activeElement.isNew = false;
    this.activeElement.movedTimes = 0;
  }
}
