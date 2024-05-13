const selectedClass = NetworkNode;

const graph = new Graph();
document.body.appendChild(graph.div);

const nodeMenu = new NodeMenu();
graph.div.appendChild(nodeMenu.div);

const network = new Network();
