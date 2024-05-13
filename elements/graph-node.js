const GraphNodeActions = {
  Connect: "graph_node_action_connect",
}

function handleNodeConnect(e) {}

class GraphNode {
  static defaultSize = 20;

  // private
  size = GraphNode.defaultSize;

  // public
  id;
  div;
  actions = [
    [GraphNodeActions.Connect, "Connect", handleNodeConnect],
  ];

  // private
  setPos(x, y) {
    this.div.style.left = `${x - this.size / 2}px`;
    this.div.style.top  = `${y - this.size / 2}px`;
  }

  // interface
  constructor(x, y) {
    this.div = document.createElement("div");
    this.id = newElementId();

    this.div.id = this.id;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.classList.add("graphNode");

    this.setPos(x, y);
    return this;
  }
  onGrab(X, Y) {
  }
  setOnUnselect() {
  }
  onMouseMove(x, y) {
    this.setPos(x, y);
  }
  onDelete() {}
}
