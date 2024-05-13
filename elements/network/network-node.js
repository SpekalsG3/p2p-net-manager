const GraphNodeActions = {
  Connect: "graph_node_action_connect",
}

function handleNodeConnect({ X, Y }) {
  const { x, y } = graph.activeElement.el;
  const line = new NodeLink({
    x,
    y,
    isMovable: false,
    onCursor: false,
  });
  const elementId = graph.newElement(line);

  graph.startGrabbing({
    x: X, y: Y,
    initiatedElId: graph.activeElement.el.div.id,
    elementId,
  });
  graph.activeElement.isNew = true;

  line.selectedPart = 2;
  line.onMouseMove(X, Y);
}

class NetworkNode extends CircleElement {
  // public
  actions = [
    [GraphNodeActions.Connect, "Connect", handleNodeConnect],
  ]

  // public
  constructor({ x, y }) {
    super({ x, y });
  }

  onDelete() {
    const connections = network.getConnections(this.div.id);
    for (const connection of connections) {
      graph.deleteElement(connection);
    }
  }

  onGrab({ initiatedElId, x, y }) {
    super.onGrab({ initiatedElId, x, y });

    const connections = network.getConnections(this.div.id);
    for (const connection of connections) {
      const { from, to } = network.connectionsToNodes[connection];
      const el = graph.elements[connection];

      if (this.div.id === from) {
        el.switchOrigin();
        el.updatePos();
        network.connectionsToNodes[connection] = {
          from: to,
          to: from,
        }
      }
      el.selectedPart = 2;
    }
  }

  onMouseMove(x, y) {
    super.onMouseMove(x, y);

    const connections = network.getConnections(this.div.id);
    for (const connection of connections) {
      graph.elements[connection].onMouseMove(x, y);
    }
  }

  finishGrab({ target }) {
    const connections = network.getConnections(this.div.id);
    for (const connection of connections) {
      const el = graph.elements[connection];
      el.selectedPart = null;
    }
  }
}
