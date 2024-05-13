const elements = {};
const selectedClass = GraphNode;
const grabbedElement = {
  movedTimes: 0,
  isNew: false,
  el: null,
}
const selectedElement = {
  el: null,
};

const graph = document.getElementById("graph");
const graphSize = graph.getBoundingClientRect();
const nodeMenu = new NodeMenu();
