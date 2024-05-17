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

function stressTest() {
  const size = document.body.getBoundingClientRect();

  function spawnNode() {
    const x = Math.floor(Math.random() * size.width - size.width / 2);
    const y = Math.floor(Math.random() * size.height - size.height / 2);
    const node = new NetworkNode({ x, y });
    graph.newElement(node);
    return node;
  }

  const nodes = [spawnNode()];
  for (let i = 1; i < 1000; i++) {
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

function createGrid() {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "0";
  div.style.left = "0";
  div.style.display = "flex";
  div.style.flexWrap = "wrap";
  div.style.alignContent = "start";
  div.style.pointerEvents = "none";
  document.body.appendChild(div);
  for (let i = 0; i < 150; i++) {
    const measure = document.createElement("div");
    measure.style.width = "100px";
    measure.style.height = "100px";
    measure.style.outline = "1px dashed red";
    div.appendChild(measure);
  }
}
