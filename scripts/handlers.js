// don't want to bloat graph.js
window.addEventListener("resize", () => {
  const body = document.body.getBoundingClientRect();
  graph.width = body.width;
  graph.height = body.height;
})
graph.div.addEventListener("mousedown", (e) => {
  const {x, y} = graph.getEventCoordinates(e);
  const target = graph.getTarget(e);

  if (nodeMenu.isShown && target !== nodeMenu.div) {
    graph.activeElement.el = null;
    nodeMenu.hide();
    return;
  }
  if (target !== null) {
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
  const {x, y} = graph.getEventCoordinates(e);

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
  const target = graph.getTarget(e);

  if (graph.activeElement.el) {
    const hasMoved = graph.stopGrabbing(target);
    if (!hasMoved) {
      // element hasn't moved, means user just clicked
      nodeMenu.show(e.clientX, e.clientY, graph.activeElement.el.actions);
    }
  }
});

nodeMenu.div.addEventListener("click", (e) => {
  nodeMenu.handleClick(e);
});
networkMenu.div.addEventListener("click", (e) => {
  networkMenu.handleClick(e);
})

document.body.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (e.ctrlKey) {
    graph.zoom -= graph.zoom * e.deltaY / graph.zoomEase;
  } else {
    graph.x -= e.deltaX / graph.moveEase;
    graph.y -= e.deltaY / graph.moveEase;
  }

  graph.render()
}, { passive: false })
