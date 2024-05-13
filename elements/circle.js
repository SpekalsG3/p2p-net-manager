const GraphNodeActions = {
  Connect: "graph_node_action_connect",
}

function handleNodeConnect({ X, Y }) {
  const { x, y } = graph.activeElement.el;
  const line = new LineElement({
    x,
    y,
    isMovable: false,
    onCursor: false,
  });
  const elementId = graph.newElement(line);

  line.selectedPart = 2;
  line.onMouseMove(X, Y);

  graph.startGrabbing(graph.activeElement.el.div.id, elementId);
  graph.activeElement.isNew = true;
}

class CircleElement {
  static defaultSize = 20;

  // private
  size = CircleElement.defaultSize;

  // public
  div;
  x;
  y;
  actions = [
    [GraphNodeActions.Connect, "Connect", handleNodeConnect],
  ];

  // private
  updatePos() {
    this.div.style.left = `${this.x - this.size / 2}px`;
    this.div.style.top  = `${this.y - this.size / 2}px`;
  }

  // interface
  constructor({ x, y }) {
    this.div = document.createElement("div");

    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.classList.add("graphNode");

    this.x = x;
    this.y = y;
    this.updatePos();

    return this;
  }

  onGrab(initiatedElId) {
  }

  onMouseMove(x, y) {
    this.x = x;
    this.y = y;
    this.updatePos();
  }

  onDelete() {
    console.log(`connections for ${this.div.id}`);
    const connections = network.getConnections(this.div.id);
    for (const connection of connections) {
      graph.deleteElement(connection);
    }
  }

  finishGrab({ target }) {}
}
