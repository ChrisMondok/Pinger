function GameBoard(width, height) {
	
	this.tickEventListener = this.tick.bind(this);

	document.addEventListener('gametick', this.tickEventListener);

	this.width = width || 20;
	this.height = height || 20;

	this.viewportX = 0;
	this.viewportY = 0;

	this.canvas = document.createElement('canvas');	
	this.canvas.setAttribute('width', viewportWidth);
	this.canvas.setAttribute('height', viewportHeight);
	this.ctx = this.canvas.getContext('2d');

	document.body.appendChild(this.canvas);
}

GameBoard.prototype.tick = function() {
	usingState(this.ctx, function() {
		this.ctx.clearRect(0, 0, viewportWidth, viewportHeight);

		this.ctx.translate(-this.viewportX, -this.viewportY);

		this.drawGround();

		this.drawGrid();

		//draw all of the things
	}, this);
};

GameBoard.prototype.drawGrid = function() {
	this.ctx.strokeStyle = "rgba(0,0,0,0.25)";
	this.ctx.beginPath();
	for(var x = 0; x < this.width; x += 1) {
		this.ctx.moveTo(x * GRIDSIZE, 0);
		this.ctx.lineTo(x * GRIDSIZE, this.height * GRIDSIZE);
	}
	for(var y = 0; y < this.width; y += 1) {
		this.ctx.moveTo(0, y * GRIDSIZE);
		this.ctx.lineTo(this.width * GRIDSIZE, y * GRIDSIZE);
	}
	this.ctx.stroke();
	return;
};

GameBoard.prototype.drawGround = function() {
	this.ctx.fillStyle = "#6c513c";

	this.ctx.fillRect(0, 1*GRIDSIZE, this.width * GRIDSIZE, (this.height - 1) * GRIDSIZE);
};

GameBoard.prototype.destroy = function() {
	this.canvas.parentNode.removeChild(this.canvas);
	document.removeEventListener('gametick', this.tickEventListener);
};
