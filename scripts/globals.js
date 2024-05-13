const elements = {};
const selectedClass = GraphNode;
const activeElement = {
  isGrabbed: false,
  movedTimes: 0,
  isNew: false,
  el: null,
};

const graph = document.getElementById("graph");
const graphSize = graph.getBoundingClientRect();
const nodeMenu = new NodeMenu();
graph.appendChild(nodeMenu.div);
