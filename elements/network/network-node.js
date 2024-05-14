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

  graph.activeElement.influence = {
    [line.div.id]: GrabIntent.Resize,
  }
  line.onResize(X, Y);
}

class NetworkNode extends CircleElement {
  // public
  actions = [
    [GraphNodeActions.Connect, "Connect", handleNodeConnect],
  ]

  // public
  static generateDiv() {
    return CircleElement.generateDiv();
  }

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
    const influence = super.onGrab({ initiatedElId, x, y });

    const connections = network.getConnections(this.div.id);
    for (const connection of connections) {
      const { from, to } = network.connectionsToNodes[connection];
      const link = graph.elements[connection];

      if (this.div.id === from) {
        link.switchOrigin();
        link.updatePos();
        network.connectionsToNodes[connection] = {
          from: to,
          to: from,
        }
      }

      influence[link.div.id] = GrabIntent.Resize;
    }

    return influence;
  }

  onMove(x, y) {
    super.onMove(x, y);
  }

  onResize(x, y) {
    super.onResize(x, y);
  }

  finishGrab({ target }) {
    const connections = network.getConnections(this.div.id);
    for (const connection of connections) {
      const el = graph.elements[connection];
      el.selectedPart = null;
    }
  }
}
