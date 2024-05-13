graph.addEventListener("mousedown", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = getGraphTarget(e);

  if (nodeMenu.isShown && target !== nodeMenu.div) {
    nodeMenu.hide();
    return;
  }
  if (target === nodeMenu.div) {
    // nothing
  } else if (target !== null) {
    // start grabbing
    grabbedElement.el = elements[target.id];
    grabbedElement.el.onGrab(x, y);
  } else if (grabbedElement.el === null) {
    // clicked on empty graph
    const element = new selectedClass({ x, y });

    grabbedElement.isNew = true;
    grabbedElement.el = element;
    grabbedElement.movedTimes = 1;

    newGraphElement(element);
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
});

graph.addEventListener("mouseup", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = getGraphTarget(e);

  if (grabbedElement.el !== null) {
    if (grabbedElement.movedTimes < 5 && !grabbedElement.isNew) {
      // means user just clicked on element, select it
      selectedElement.el = grabbedElement.el;
      nodeMenu.show(x, y, selectedElement.el.actions)
    } else {
      // user was actually grabbing and moving element
      grabbedElement.el.finishGrab({ target });
    }

    grabbedElement.isNew = false;
    grabbedElement.movedTimes = 0;
    grabbedElement.el = null;
  } else if (target === nodeMenu.div) {
    nodeMenu.handleClick(e);
  }
});
