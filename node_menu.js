const GlobalActions = {
  Delete: "node_menu_delete",
}

class NodeMenu {
  // private
  globalActions = [[GlobalActions.Delete, "Delete", () => {
    selectedElement.el.onDelete();
    graph.removeChild(selectedElement.el.div);
    delete elements[selectedElement.el.id];
  }]];
  addedActions = [];

  // private
  deleteElement() {}
  createMenuAction(dataAction, label) {
    const div = document.createElement("div");
    div.innerHTML = label;
    div.classList.add("nodeMenuAction");
    div.setAttribute("data-action", dataAction);
    return div;
  }
  handleClick(e) {
    if (e.target.classList.contains("nodeMenuAction")) {
      const action = e.target.getAttribute("data-action");
      const firedAction = [...this.globalActions, ...this.addedActions]
        .find(([dataAction, _0, _1]) => dataAction === action);
      if (!firedAction) {
        throw new Error(`Unknown data-action "${action}"`);
      }
      firedAction[2](action);
      hideElement(nodeMenu.div)
    }
  }

  // public
  constructor() {
    this.div = document.createElement("div");
    this.div.id = "nodeMenu";
    this.div.addEventListener("click", this.handleClick.bind(this));

    graph.appendChild(this.div);
  }
  show(x, y, actions) {
    this.div.style.left = `${x + 5}px`;
    this.div.style.top = `${y - 5}px`;

    this.div.innerHTML = "";
    this.addedActions = actions;
    for (const [dataAction, label] of [...this.globalActions, ...this.addedActions]) {
      this.div.appendChild(this.createMenuAction(dataAction, label));
    }

    showElement(this.div);
  }
  hide() {
    hideElement(this.div);
  }
}
