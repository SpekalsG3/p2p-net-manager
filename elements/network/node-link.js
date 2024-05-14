class NodeLink extends LineElement {
  // private
  connectedFrom;

  // public
  static generateDiv() {
    return LineElement.generateDiv({
      wrapperPad: LineElement.defaultLength,
      lineEndSize: LineElement.defaultLength,
    });
  }

  constructor({ x, y }) {
    super({
      x,
      y,
      onCursor: false,
    });
  }

  onGrab({ initiatedElId, x, y }) {
    // super.onGrab(initiatedElId);
    this.connectedFrom = initiatedElId;
  }

  onMouseMove(X, Y) {
    super.onMouseMove(X, Y);
  }

  onDelete() {
    // super.onDelete();
    network.removeConnection(this.div.id);
  }

  finishGrab({ target }) {
    super.finishGrab({target});

    const el = graph.elements[target?.id];
    if (target === null || el instanceof LineElement) {
      if (graph.activeElement.isNew) {
        graph.deleteElement(this.div.id);
      }
      return;
    }

    network.addConnection(this.div.id, this.connectedFrom, el.div.id);

    this.div.style.zIndex = "0";
    this.length = this.calculateLength(el.x, el.y);
    this.angle = this.calculateAngle(el.x, el.y);
    this.updatePos();
  }
}
