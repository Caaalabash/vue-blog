//
//  Line model
//
var Line = function(x, y) {
  this.location = {
    x: x,
    y: y
  };

  this.width = Math.random() * 1 + 0.25;
  this.color = 'hsla(' + (~~(Math.random() * 360)) + ', 100%, 70%, 0.90)';
};

//
// Signalz
//
var Signalz = function(element) {
  this.canvas = null;
  this.ctx = null;
  this.center = { x: null, y: null };
  this.drawNo = 0;

  this.linesNo = 50;
  this.linesSize = 20;
  this.lines = [];

  this.from = '#4b6cb7'
  this.to = '#182848'

  // init
  this.init(element);
};

Signalz.prototype.init = function(element) {
  // setup & attach to canvas
  this.setup(element);

  // create lines
  for (var i = 0; i < this.linesNo; i++)
    this.lines.push(new Line(this.center.x, this.center.y));

  // animate
  this.animate();
};

Signalz.prototype.setup = function(element) {
  var cvs = document.querySelector(element);

  // set canvas to full window size
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;

  // set pointers
  this.canvas = cvs;
  this.ctx = cvs.getContext('2d');

  // calc center of stage/window
  this.center.x = Math.round(this.canvas.width / 2);
  this.center.y = Math.round(this.canvas.height / 2);

  // handle window resize
  window.addEventListener('resize', this.onScreenResize.bind(this));
};

Signalz.prototype.onScreenResize = function() {
  let _this = this
  // reset canvas to full window size
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  // recalc center of stage/window
  this.center.x = Math.round(this.canvas.width / 2);
  this.center.y = Math.round(this.canvas.height / 2);

  // recenter lines
  this.lines.forEach(function(line) {
    line.location.x = _this.center.x;
    line.location.y = _this.center.y;
  });
};

Signalz.prototype.animate = function() {
  // request new frame
  requestAnimationFrame(this.animate.bind(this));
  this.draw();
};

Signalz.prototype.setGradient = function(from, to) {
  const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height)
  gradient.addColorStop(0,from)
  gradient.addColorStop(1,to)
  // clear canvas
  this.ctx.fillStyle = gradient;
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  console.log(1)
}

Signalz.prototype.draw = function() {
  const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height)
  gradient.addColorStop(0, this.from)
  gradient.addColorStop(1, this.to)
  // clear canvas
  this.ctx.fillStyle = gradient;
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  // update draw number
  this.drawNo++;
  if (this.drawNo % 2 == 1) {
    return;
  }

  // draw & update lines
  for (var idx = 0; idx < this.lines.length; idx++) {
    // get line
    var line = this.lines[idx];
    var lineSize = this.linesSize;

    // random direction
    var dir = ~~(Math.random() * 3) * 90;
    if (idx % 4 === dir / 90) { dir = 270; }

    // begin line path
    this.ctx.lineWidth = line.width;
    this.ctx.strokeStyle = line.color;
    this.ctx.beginPath();
    this.ctx.moveTo(line.location.x, line.location.y);

    // switch direction
    switch(dir) {
      case 0:
        line.location.y -= lineSize;
        break;
      case 90:
        line.location.x += lineSize;
        break;
      case 180:
        line.location.y += lineSize;
        break;
      case 270:
        line.location.x -= lineSize;
        break;
      default:
        break;
    }

    // move line to
    this.ctx.lineTo(line.location.x, line.location.y);

    // reset line location if offscreen
    if (line.location.x < 0 || line.location.x > this.canvas.width || line.location.y < 0 || line.location.y > this.canvas.height) {
      line.location.x = this.center.x;
      line.location.y = this.center.y;
    }

    // stroke line
    this.ctx.stroke();
  }
};

export default Signalz