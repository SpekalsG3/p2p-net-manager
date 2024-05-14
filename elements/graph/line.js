class LineElement {
  static defaultWidth = 5;
  static defaultLength = 100;
  static defaultWrapperPad = 6;
  static defaultLineEndSize = 10;
  static defaultAngle = 0;

  // private
  width = LineElement.defaultWidth;
  length = LineElement.defaultLength;
  wrapperPad = LineElement.defaultWrapperPad;
  lineEndSize = LineElement.defaultLineEndSize;
  angle = LineElement.defaultAngle;
  selectedPart = null; // 1 - middle, 2 - one of the ends
  isOriginBegin = false;
  midOffset = { x: 0, y: 0 }

  // public
  div;
  x;
  y;
  actions = [];

  // private
  adjustXY(X, Y) {
    const shift = this.wrapperPad + this.width / 2;
    return {
      x: X,
      y: Y - shift,
    };
  }
  updatePos() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top  = `${this.y}px`; // todo: adjust for LinkElement padding
    this.div.firstElementChild.style.width = `${this.length}px`;
    this.div.firstElementChild.style.height = `${this.width}px`;
    this.div.style.transform = `rotate(${-this.angle}deg)`;
  }
  switchOrigin() {
    const rad = this.angle * Math.PI / 180;
    this.x += Math.cos(rad) * this.length;
    this.y -= Math.sin(rad) * this.length;
    this.angle = (this.angle + 270) % 360 - 90;
    this.div.style.transformOrigin = `transform-origin: center ${this.isOriginBegin ? 'right' : 'left'}`;
    this.isOriginBegin = !this.isOriginBegin;
  }
  calculateAngle(X, Y) {
    const { x, y } = this.adjustXY(X - this.x, Y - this.y);
    let pad = 0;
    if (x < 0) {
      pad = 180;
    }
    return pad + -(Math.atan(y / x) * 180 / Math.PI); // degree in range [-90; 270]
  }
  calculateLength(X, Y) {
    const {x,y} = this.adjustXY(X - this.x, Y - this.y);
    return Math.sqrt(x * x + y * y);
  }

  // public
  static generateDiv() {
    const div = document.createElement("div");

    div.classList.add("linkElement");
    div.style.padding = `${LineElement.defaultWrapperPad}px 0`

    {
      const line = document.createElement("div");
      line.classList.add("linkLine");
      div.appendChild(line);
    }

    const lineEndPad = (LineElement.defaultWrapperPad * 2 + LineElement.defaultLineEndSize) / 2;
    {
      const wrap = document.createElement("div");
      wrap.classList.add("linkLineBeginWrap");
      wrap.style.left = `-${lineEndPad}px`;
      wrap.style.padding = `${LineElement.defaultWrapperPad}px`;
      wrap.style.top = `calc(50% - ${lineEndPad}px)`;
      const begin = document.createElement("div");
      begin.classList.add("linkLineBall");
      begin.style.width = `${LineElement.defaultLineEndSize}px`;
      begin.style.height = `${LineElement.defaultLineEndSize}px`;
      wrap.appendChild(begin);
      div.appendChild(wrap);
    }

    {
      const wrap = document.createElement("div");
      wrap.classList.add("linkLineEndWrap");
      wrap.style.right = `-${lineEndPad}px`
      wrap.style.padding = `${LineElement.defaultWrapperPad}px`;
      wrap.style.top = `calc(50% - ${lineEndPad}px)`;
      const end = document.createElement("div");
      end.classList.add("linkLineBall");
      end.style.width = `${LineElement.defaultLineEndSize}px`;
      end.style.height = `${LineElement.defaultLineEndSize}px`;
      wrap.appendChild(end);
      div.appendChild(wrap);
    }

    div.firstElementChild.style.width = `${LineElement.defaultLength}px`;
    div.firstElementChild.style.height = `${LineElement.defaultWidth}px`;
    div.style.transform = `rotate(${-LineElement.defaultAngle}deg)`;

    return div;
  }

  constructor({
    x,
    y,
    onCursor = true,
  }) {
    this.div = LineElement.generateDiv();
    this.div.style.position = "absolute";

    let shift = 0;
    if (onCursor) {
      const size = Math.sqrt((this.length ** 2) / 2);
      shift = size / 2;
    }
    const { x: newX, y: newY } = this.adjustXY(
      x - shift,
      y + shift,
    );
    this.x = newX;
    this.y = newY;
    this.updatePos();

    return this;
  }

  onGrab({ initiatedElId, x, y }) {
    const length = this.calculateLength(x, y);
    if (length < 15) { // origin end
      this.switchOrigin();
      this.updatePos();
      this.selectedPart = 2;
    } else if (length > (this.length - 15)) { // opposite end
      this.selectedPart = 2;
    } else {
      {
        const rad = this.angle * Math.PI / 180;
        this.midOffset.x = Math.cos(rad) * this.length / 2;
        this.midOffset.y = Math.sin(rad) * this.length / 2;
      }

      this.selectedPart = 1; // middle
    }
  }

  onMouseMove(X, Y) {
    switch (this.selectedPart) {
      case 1: {
        const {x,y} = this.adjustXY(
          X - this.midOffset.x,
          Y + this.midOffset.y,
        );
        this.x = x;
        this.y = y;
        break;
      }
      case 2: {
        this.length = this.calculateLength(X, Y);
        this.angle = this.calculateAngle(X, Y);
        break;
      }
    }
    this.updatePos();
  }

  onDelete() {
  }

  finishGrab({ target }) {
    this.selectedPart = null;
  }
}
