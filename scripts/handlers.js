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
  } else if (target !== null) {
    if (!graph.activeElement.isGrabbed) {
      // start grabbing
      graph.startGrabbing(target.id, x, y);
    }
  } else if (!graph.activeElement.el) {
    // clicked on empty graph, create selected class
    const element = new selectedClass({ x, y });
    const elementId = graph.newElement(element);

    graph.startGrabbing(elementId, x, y);
    graph.activeElement.isNew = true;
  }
});

graph.div.addEventListener("mousemove", (e) => {
  const {x,y} = mouseEventToXY(e);

  if (graph.activeElement.isGrabbed) {
    graph.activeElement.movedTimes++;
    if (graph.activeElement.movedTimes > Graph.grabbedMovesThreshold) {
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
    graph.stopGrabbing(target, x, y);
  }
});
