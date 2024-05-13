class Graph {
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
}
