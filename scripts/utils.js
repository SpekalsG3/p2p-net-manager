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
