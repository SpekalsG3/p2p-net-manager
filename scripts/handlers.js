// don't want to bloat graph.js
graph.div.addEventListener("mousedown", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = graph.getTarget(e);

  if (nodeMenu.isShown && target !== nodeMenu.div) {
    graph.activeElement.el = null;
    nodeMenu.hide();
    return;
  }
  if (target === nodeMenu.div) {
    // nothing
  } else if (target !== null && !graph.activeElement.isGrabbed) {
    // start grabbing
    graph.activeElement.el = graph.elements[target.id];
    graph.activeElement.isGrabbed = graph.activeElement.el.onGrab(x, y);
  } else if (!graph.activeElement.el) {
    // clicked on empty graph, create selected class
    const element = new selectedClass({ x, y });

    graph.activeElement.isNew = true;
    graph.activeElement.el = element;
    graph.activeElement.movedTimes = 1;
    graph.activeElement.isGrabbed = true;

    graph.newElement(element);
  }
});

graph.div.addEventListener("mousemove", (e) => {
  const {x,y} = mouseEventToXY(e);

  if (graph.activeElement.isGrabbed) {
    graph.activeElement.movedTimes++;
    if (graph.activeElement.movedTimes > 5) {
      graph.activeElement.el.onMouseMove(x, y);
    }
  } else if (graph.activeElement.el) {
    // shouldn't do anything
  }
});

graph.div.addEventListener("mouseup", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = graph.getTarget(e);

  if (target === nodeMenu.div) {
    nodeMenu.handleClick(e);
  } else if (graph.activeElement.el) {
    if (graph.activeElement.movedTimes < 5 && !graph.activeElement.isNew) {
      // means user just clicked on element, select it
      nodeMenu.show(x, y, graph.activeElement.el.actions)
    } else {
      // user was actually grabbing and moving element
      graph.activeElement.el.finishGrab({ target });
      graph.activeElement.el = null;
    }

    graph.activeElement.isGrabbed = false;
    graph.activeElement.isNew = false;
    graph.activeElement.movedTimes = 0;
  }
});
