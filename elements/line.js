class LineElement {
  static defaultWidth = 3;
  static defaultLength = 100;

  // private
  width = LineElement.defaultWidth;
  length = LineElement.defaultLength;
  wrapperPad = 6;
  lineEndSize = 10;
  angle = 45;
  selectedPart = null; // 1 - middle, 2 - one of the ends
  isOriginBegin = false;
  midOffset = { x: 0, y: 0 }
  isMovable;

  // public
  id;
  div;
  x;
  y;
  actions = [];

  // private
  adjustXY(X, Y) {
    const shift = (this.wrapperPad + this.width) / 2;
    return {
      x: X,
      y: Y - shift,
    };
  }
  updatePos() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top  = `${this.y - this.width / 2}px`; // todo: adjust for LinkElement padding
    this.div.firstChild.style.width = `${this.length}px`;
    this.div.firstChild.style.height = `${this.width}px`;
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
    const {x,y} = this.adjustXY(X - this.x, Y - this.y);
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

  // interface
  constructor({
    x,
    y,
    isMovable = true,
    onCursor = true,
  }) {
    this.div = document.createElement("div");

    this.div.classList.add("linkElement");
    this.div.style.padding = `${this.wrapperPad}px 0`

    {
      const line = document.createElement("div");
      line.classList.add("linkLine");
      this.div.appendChild(line);
    }

    if (isMovable) {
      const lineEndPad = (this.wrapperPad * 2 + this.lineEndSize) / 2;
      {
        const wrap = document.createElement("div");
        wrap.classList.add("linkLineBeginWrap");
        wrap.style.left = `-${lineEndPad}px`;
        wrap.style.padding = `${this.wrapperPad}px`;
        wrap.style.top = `calc(50% - ${lineEndPad}px)`;
        const begin = document.createElement("div");
        begin.classList.add("linkLineBall");
        begin.style.width = `${this.lineEndSize}px`;
        begin.style.height = `${this.lineEndSize}px`;
        wrap.appendChild(begin);
        this.div.appendChild(wrap);
      }

      {
        const wrap = document.createElement("div");
        wrap.classList.add("linkLineEndWrap");
        wrap.style.right = `-${lineEndPad}px`
        wrap.style.padding = `${this.wrapperPad}px`;
        wrap.style.top = `calc(50% - ${lineEndPad}px)`;
        const end = document.createElement("div");
        end.classList.add("linkLineBall");
        end.style.width = `${this.lineEndSize}px`;
        end.style.height = `${this.lineEndSize}px`;
        wrap.appendChild(end);
        this.div.appendChild(wrap);
      }
    }

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
    this.isMovable = isMovable;
    this.updatePos();

    return this;
  }

  onGrab(X, Y) {
    this.div.style.pointerEvents = "none";

    if (!this.isMovable) {
      return false;
    }

    const length = this.calculateLength(X, Y);
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

    return true;
  }

  setOnUnselect() {
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

  onDelete() {}

  finishGrab({ target }) {
    this.div.style.pointerEvents = "unset";
    this.selectedPart = null;

    const el = elements[target?.id];
    if (target === null || el instanceof LineElement) {
      deleteGraphElement(this);
      return;
    }

    this.length = this.calculateLength(el.x, el.y);
    this.angle = this.calculateAngle(el.x, el.y);
    this.updatePos();
  }
}
