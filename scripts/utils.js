function guidGenerator() {
  const S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
function hideElement(div) {
  div.style.display = "none";
}
function showElement(div) {
  div.style.display = "block";
}

function mouseEventToXY(e) {
  const x = e.clientX;
  const y = e.clientY;
  return { x, y }
}

function stressTest() {
  function spawnNode() {
    const x = Math.floor(Math.random() * sizes.width);
    const y = Math.floor(Math.random() * sizes.height);
    const node = new NetworkNode({ x, y });
    graph.newElement(node);
    return node;
  }

  const sizes = graph.div.getBoundingClientRect();

  const nodes = [spawnNode()];
  for (let i = 1; i < 10000; i++) {
    const node = spawnNode();
    for (let n = 0; (n < 15) && (n < nodes.length); n++) {
      const link = new NodeLink({
        x: node.x,
        y: node.y,
      });
      link.connectedFrom = node.div.id;
      graph.newElement(link);
      link.finishGrab({ target: nodes[n].div })
    }
    nodes.push(node);
  }
}
