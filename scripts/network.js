class Network {
  // public
  connectionsToNodes = {};
  nodesToConnections = {};

  // public
  addConnection(
    link,
    from,
    to,
  ) {
    console.log(`${link}\nfrom: ${from}\nto  : ${to}`);
    if (this.connectionsToNodes[link]) {
      throw new Error(`Link with id "${link}" already exists`);
    }
    this.connectionsToNodes[link] = { from, to }

    if (!this.nodesToConnections[from]) {
      this.nodesToConnections[from] = [];
    }
    this.nodesToConnections[from][link] = true;

    if (!this.nodesToConnections[to]) {
      this.nodesToConnections[to] = [];
    }
    this.nodesToConnections[to][link] = true;
  }

  removeConnection(link) {
    const { from, to } = this.connectionsToNodes[link];
    delete this.connectionsToNodes[link];
    delete this.nodesToConnections[from][link];
    delete this.nodesToConnections[to][link];
  }

  getConnections(node) {
    return Object.keys(this.nodesToConnections[node] ?? {})
  }
}
