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
}
