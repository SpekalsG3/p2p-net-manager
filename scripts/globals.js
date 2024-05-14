const selectedClass = NetworkNode;

const body = document.body.getBoundingClientRect();
const graph = new Graph({
  height: body.height,
  width: body.width,
});
document.body.appendChild(graph.div);

const nodeMenu = new NodeMenu();
document.body.appendChild(nodeMenu.div);

const network = new Network();
const networkMenu = new NetworkMenu();
document.body.appendChild(networkMenu.div);
