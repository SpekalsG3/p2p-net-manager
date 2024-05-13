const GlobalActions = {
  Delete: "node_menu_delete",
}

class NodeMenu {
  // private
  globalActions = [[GlobalActions.Delete, "Delete", () => {
    graph.activeElement.el.onDelete();
    graph.deleteElement(graph.activeElement.el);
    graph.activeElement.el = null;
  }]];
  addedActions = [];

  // public
  isShown = false;

  // private
  createMenuAction(dataAction, label) {
    const div = document.createElement("div");
    div.innerHTML = label;
    div.classList.add("nodeMenuAction");
    div.setAttribute("data-action", dataAction);
    return div;
  }

  // public
  constructor() {
    this.div = document.createElement("div");
    this.div.id = "nodeMenu";

    return this;
  }
  handleClick(e) {
    const {x,y} = mouseEventToXY(e);

    if (e.target.classList.contains("nodeMenuAction")) {
      const action = e.target.getAttribute("data-action");
      const firedAction = [...this.globalActions, ...this.addedActions]
        .find(([dataAction, _0, _1]) => dataAction === action);
      if (!firedAction) {
        throw new Error(`Unknown data-action "${action}"`);
      }
      firedAction[2]({ X: x, Y: y });
      this.hide();
    }
  }
  show(x, y, actions) {
    this.div.style.left = `${x + 5}px`;
    this.div.style.top = `${y - 5}px`;

    this.div.innerHTML = "";
    this.addedActions = actions;
    for (const [dataAction, label] of [...this.globalActions, ...this.addedActions]) {
      this.div.appendChild(this.createMenuAction(dataAction, label));
    }

    this.isShown = true;
    showElement(this.div);
  }
  hide() {
    this.isShown = false;
    hideElement(this.div);
  }
}
