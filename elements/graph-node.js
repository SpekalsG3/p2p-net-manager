const GraphNodeActions = {
  Connect: "graph_node_action_connect",
}

function handleNodeConnect({ X, Y }) {
  const { x, y } = selectedElement.el;
  const line = new LineElement({
    x,
    y,
    isMovable: false,
    onCursor: false,
  });
  newGraphElement(line);

  line.selectedPart = 2;
  line.onMouseMove(X, Y);

  grabbedElement.el = line;
  selectedElement.el = null;
}

class GraphNode {
  static defaultSize = 20;

  // private
  size = GraphNode.defaultSize;

  // public
  id;
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
  onGrab(X, Y) {
  }
  setOnUnselect() {
  }
  onMouseMove(x, y) {
    this.x = x;
    this.y = y;
    this.updatePos();
  }
  onDelete() {}
  finishGrab({ target }) {}
}
