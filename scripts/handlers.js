graph.addEventListener("mousedown", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = getGraphTarget(e);

  if (nodeMenu.isShown && target !== nodeMenu.div) {
    activeElement.el = null;
    nodeMenu.hide();
    return;
  }
  if (target === nodeMenu.div) {
    // nothing
  } else if (target !== null && !activeElement.isGrabbed) {
    // start grabbing
    activeElement.el = elements[target.id];
    activeElement.isGrabbed = activeElement.el.onGrab(x, y);
  } else if (!activeElement.el) {
    // clicked on empty graph, create selected class
    const element = new selectedClass({ x, y });

    activeElement.isNew = true;
    activeElement.el = element;
    activeElement.movedTimes = 1;
    activeElement.isGrabbed = true;

    newGraphElement(element);
  }
});

graph.addEventListener("mousemove", (e) => {
  const {x,y} = mouseEventToXY(e);

  if (activeElement.isGrabbed) {
    activeElement.movedTimes++;
    if (activeElement.movedTimes > 5) {
      activeElement.el.onMouseMove(x, y);
    }
  } else if (activeElement.el) {
    // shouldn't do anything
  }
});

graph.addEventListener("mouseup", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = getGraphTarget(e);

  if (target === nodeMenu.div) {
    nodeMenu.handleClick(e);
  } else if (activeElement.el) {
    if (activeElement.movedTimes < 5 && !activeElement.isNew) {
      // means user just clicked on element, select it
      nodeMenu.show(x, y, activeElement.el.actions)
    } else {
      // user was actually grabbing and moving element
      activeElement.el.finishGrab({ target });
      activeElement.el = null;
    }

    activeElement.isGrabbed = false;
    activeElement.isNew = false;
    activeElement.movedTimes = 0;
  }
});
