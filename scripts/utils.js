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

function newGraphElement(element) {
  function newElementId() {
    let id;
    do {
      id = guidGenerator();
    } while (elements[id] !== undefined);
    return id;
  }
  element.div.setAttribute("data-type", "graph_element");

  element.div.id = newElementId();
  elements[element.div.id] = element;

  graph.appendChild(element.div);
}

function mouseEventToXY(e) {
  const x = e.clientX - graphSize.x;
  const y = e.clientY - graphSize.y;
  return { x, y }
}

function getGraphTarget(e) {
  let target = e.target;
  while (true) {
    if (target.getAttribute("data-type") === "graph_element") {
      break;
    }
    if (target === nodeMenu.div) {
      break;
    }
    if (target === graph) {
      target = null;
      break;
    }
    target = target.parentElement;
  }
  return target;
}
