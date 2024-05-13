graph.addEventListener("mousedown", (e) => {
  let isElement = false
  let target = e.target;
  while (target !== graph) {
    if (target.getAttribute("data-type") === "graph_element") {
      isElement = true;
      break;
    }
    if (target === nodeMenu.div) {
      return;
    }
    target = target.parentElement;
  }

  const unselect = selectedElement.el !== null;
  if (unselect) {
    // something was selected, remove selection
    selectedElement.el = null;
    nodeMenu.hide();
  }

  const {x,y} = mouseEventToXY(e);

  // nothing was selected, continue
  if (isElement) {
    // start grabbing
    grabbedElement.el = elements[target.id];
    grabbedElement.el.onGrab(x, y);
  } else if (!unselect) {
    // graph action
    const element = new selectedClass(x, y);
    element.div.setAttribute("data-type", "graph_element");
    elements[element.id] = element;

    grabbedElement.isNew = true;
    grabbedElement.el = element;
    grabbedElement.movedTimes = 1;

    graph.appendChild(element.div);
  }
});
graph.addEventListener("mousemove", (e) => {
  const {x,y} = mouseEventToXY(e);

  if (grabbedElement.el !== null) {
    grabbedElement.movedTimes++;
    if (grabbedElement.movedTimes > 5) {
      grabbedElement.el.onMouseMove(x, y);
    }
  } else if (selectedElement.el !== null) {
    // shouldn't do anything
  }
})
graph.addEventListener("mouseup", (e) => {
  const {x,y} = mouseEventToXY(e);

  if (grabbedElement.el !== null) {
    if (grabbedElement.movedTimes < 5 && !grabbedElement.isNew) {
      selectedElement.el = grabbedElement.el;
      nodeMenu.show(x, y, selectedElement.el.actions)
    }
    grabbedElement.isNew = false;
    grabbedElement.movedTimes = 0;
    grabbedElement.el = null;
  }
});
