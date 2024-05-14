// don't want to bloat graph.js
graph.div.addEventListener("mousedown", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = graph.getTarget(e);

  if (nodeMenu.isShown && target !== nodeMenu.div) {
    graph.activeElement.el = null;
    nodeMenu.hide();
    return;
  }
  if (
    target === nodeMenu.div
    || target === networkMenu.div
  ) {
    // nothing
  } else if (target !== null) {
    if (!graph.activeElement.isGrabbed) {
      // start grabbing
      graph.startGrabbing({
        x,y,
        initiatedElId: null,
        elementId: target.id,
      });
    }
  } else if (!graph.activeElement.el) {
    // clicked on empty graph, create selected class
    const element = new selectedClass({ x, y });
    const elementId = graph.newElement(element);

    graph.startGrabbing({
      x,y,
      initiatedElId: null,
      elementId,
    });
    graph.activeElement.isNew = true;
  }
});

graph.div.addEventListener("mousemove", (e) => {
  const {x,y} = mouseEventToXY(e);

  if (graph.activeElement.isGrabbed) {
    graph.activeElement.movedTimes++;
    if (graph.activeElement.movedTimes > Graph.grabbedMovesThreshold) {
      for (const influencedId in graph.activeElement.influence) {
        const intent = graph.activeElement.influence[influencedId];
        switch (intent) {
          case GrabIntent.None: break;
          case GrabIntent.Move: graph.elements[influencedId].onMove(x, y); break;
          case GrabIntent.Resize: graph.elements[influencedId].onResize(x, y); break;
        }
      }
    }
  } else if (graph.activeElement.el) {
    // shouldn't do anything
  }
});

graph.div.addEventListener("mouseup", (e) => {
  const {x,y} = mouseEventToXY(e);
  const target = graph.getTarget(e);

  if (
    target === nodeMenu.div
  ) {
    nodeMenu.handleClick(e);
  } else if (target === networkMenu.div) {
    networkMenu.handleClick(e);
  } else if (graph.activeElement.el) {
    graph.stopGrabbing(target, x, y);
  }
});

// graph.div.addEventListener("wheel", (e) => {
//   for (const elementId in graph.elements) {
//     graph.elements[elementId]
//   }
//   console.log(e.wheelDeltaX, e.wheelDeltaY);
// })
