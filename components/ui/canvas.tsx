// @ts-ignore
function n(e: any) {
  // @ts-ignore
  this.init(e || {});
}

n.prototype = {
  // @ts-ignore
  init: function (e: any) {
    // @ts-ignore
    this.phase = e.phase || 0;
    // @ts-ignore
    this.offset = e.offset || 0;
    // @ts-ignore
    this.frequency = e.frequency || 0.001;
    // @ts-ignore
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    // @ts-ignore
    (this.phase += this.frequency),
      // @ts-ignore
      (e = this.offset + Math.sin(this.phase) * this.amplitude);
    return e;
  },
  value: function () {
    return e;
  },
};

// @ts-ignore
function Line(e: any) {
  // @ts-ignore
  this.init(e || {});
}

Line.prototype = {
  // @ts-ignore
  init: function (e: any) {
    // @ts-ignore
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    // @ts-ignore
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    // @ts-ignore
    this.nodes = [];
    for (var t, n = 0; n < E.size; n++) {
      t = new Node();
      // @ts-ignore
      t.x = pos.x;
      // @ts-ignore
      t.y = pos.y;
      // @ts-ignore
      this.nodes.push(t);
    }
  },
  update: function () {
    // @ts-ignore
    let e = this.spring,
      // @ts-ignore
      t = this.nodes[0];
    // @ts-ignore
    t.vx += (pos.x - t.x) * e;
    // @ts-ignore
    t.vy += (pos.y - t.y) * e;
    // @ts-ignore
    for (var n, i = 0, a = this.nodes.length; i < a; i++)
      // @ts-ignore
      (t = this.nodes[i]),
        0 < i &&
          // @ts-ignore
          ((n = this.nodes[i - 1]),
          (t.vx += (n.x - t.x) * e),
          (t.vy += (n.y - t.y) * e),
          (t.vx += n.vx * E.dampening),
          (t.vy += n.vy * E.dampening)),
        // @ts-ignore
        (t.vx *= this.friction),
        // @ts-ignore
        (t.vy *= this.friction),
        (t.x += t.vx),
        (t.y += t.vy),
        (e *= E.tension);
  },
  draw: function () {
    let e,
      t,
      // @ts-ignore
      n = this.nodes[0].x,
      // @ts-ignore
      i = this.nodes[0].y;
    // @ts-ignore
    ctx.beginPath();
    // @ts-ignore
    ctx.moveTo(n, i);
    // @ts-ignore
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      // @ts-ignore
      e = this.nodes[a];
      // @ts-ignore
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      // @ts-ignore
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    // @ts-ignore
    e = this.nodes[a];
    // @ts-ignore
    t = this.nodes[a + 1];
    // @ts-ignore
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    // @ts-ignore
    ctx.stroke();
    // @ts-ignore
    ctx.closePath();
  },
};

// @ts-ignore
function onMousemove(e: any) {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }
  // @ts-ignore
  function c(e: any) {
    e.touches
      ? // @ts-ignore
        ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
      : // @ts-ignore
        ((pos.x = e.clientX), (pos.y = e.clientY)),
      e.preventDefault();
  }
  // @ts-ignore
  function l(e: any) {
    // @ts-ignore
    1 == e.touches.length &&
      ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
  }

  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  document.addEventListener("mousemove", c);
  document.addEventListener("touchmove", c);
  document.addEventListener("touchstart", l);
  c(e);
  o();
  render();
}

function render() {
  if (typeof window === 'undefined' || !ctx) {
    return;
  }
  // @ts-ignore
  if (ctx.running) {
    // @ts-ignore
    ctx.globalCompositeOperation = "source-over";
    // @ts-ignore
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // @ts-ignore
    ctx.globalCompositeOperation = "lighter";
    // @ts-ignore
    // Using theme colors: blue (#007FFF) and gold (#daa627) with HSL conversion
    // Blue: hsl(210, 100%, 50%) = #007FFF
    // Gold: hsl(43, 80%, 50%) = #daa627
    // We'll use a range between blue (210) and gold (43)
    // Since gold is at 43 and blue is at 210, we need to handle the wrap-around
    // We'll use a range from 43 to 210 (167 degrees)
    const hueValue = f.update();
    // Clamp hue between 43 (gold) and 210 (blue)
    const hue = Math.round(Math.max(43, Math.min(210, hueValue)));
    // @ts-ignore
    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.025)`;
    // @ts-ignore
    ctx.lineWidth = 10;
    if (lines && lines.length > 0) {
      for (var e, t = 0; t < E.trails; t++) {
        // @ts-ignore
        if (lines[t]) {
          // @ts-ignore
          (e = lines[t]).update();
          e.draw();
        }
      }
    }
    // @ts-ignore
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  if (typeof window === 'undefined' || !ctx || !ctx.canvas) {
    return;
  }
  // @ts-ignore
  ctx.canvas.width = window.innerWidth - 20;
  // @ts-ignore
  ctx.canvas.height = window.innerHeight;
}

// @ts-ignore
var ctx: any,
  // @ts-ignore
  f: any,
  e = 0,
  pos: any = {},
  // @ts-ignore
  lines: any = [],
  E = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };

function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

export const renderCanvas = function () {
  // Only run on client side
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) {
    return;
  }

  // @ts-ignore
  ctx = canvasElement.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.running = true;
  ctx.frame = 1;
  // Adjusted to use blue-gold color range (210-43 hue range)
  // Blue is at 210, Gold is at 43
  // We'll oscillate between these values
  f = new n({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 83.5, // Half the range between 43 and 210: (210-43)/2 = 83.5
    frequency: 0.0015,
    offset: 126.5, // Center point between 43 and 210: (43+210)/2 = 126.5
  });
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    // @ts-ignore
    if (!ctx.running) {
      // @ts-ignore
      ctx.running = true;
      render();
    }
  });
  window.addEventListener("blur", () => {
    // @ts-ignore
    ctx.running = true;
  });
  resizeCanvas();
  // Initialize lines array before first render
  lines = [];
  for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  render();
};

