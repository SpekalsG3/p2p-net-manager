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

function newElementId() {
  let id;
  do {
    id = guidGenerator();
  } while (elements[id] !== undefined);
  return id;
}

function mouseEventToXY(e) {
  const x = e.clientX - graphSize.x;
  const y = e.clientY - graphSize.y;
  return { x, y }
}
