function GameBoard(width, height) {
	
	this.tickEventListener = this.tick.bind(this);

	document.addEventListener('gametick', this.tickEventListener);

	this.width = width || 40;
	this.height = height || 20;

	this.viewportX = 0;
	this.viewportY = 0;

	this.canvas = document.createElement('canvas');	
	this.canvas.setAttribute('width', viewportWidth);
	this.canvas.setAttribute('height', viewportHeight);
	this.canvas.addEventListener('click', this.clickHandler.bind(this));
	this.ctx = this.canvas.getContext('2d');

	document.body.appendChild(this.canvas);

	this.pawns = [];

	this.dirt = [];
	for(var x = 0; x < this.width; x++) {
		var column = this.dirt[x] = [];
		for (var y = 0; y < this.height; y++) {
			column[y] = y > 0;
		}
	}
}

GameBoard.prototype.dig = function(x, y) {
	this.dirt[x][y] = false;
};

GameBoard.prototype.clickHandler = function(e) {
	var x = (e.clientX - this.canvas.offsetLeft) / GRIDSIZE;
	var y = (e.clientY - this.canvas.offsetTop) / GRIDSIZE;

	for(var i = 0; i < this.pawns.length; i++) {
		if('clickHandler' in this.pawns[i])
			this.pawns[i].clickHandler(e, x, y);
	}
};

GameBoard.prototype.spawn = function(cls) {
	var pawn = new cls(this);
	this.pawns.push(pawn);
	return pawn;
};

GameBoard.prototype.removePawn = function(pawn) {
	this.pawns.splice(this.pawns.indexOf(pawn), 1);
};

GameBoard.prototype.tick = function(tickEvent) {
	for(var i = 0; i < this.pawns.length; i++)
		this.pawns[i].tick(tickEvent);

	if(true) {
		this.draw(this.ctx);
	}
};

GameBoard.prototype.draw = function(ctx) {
	usingState(ctx, function() {
		ctx.clearRect(0, 0, viewportWidth, viewportHeight);

		ctx.translate(-this.viewportX, -this.viewportY);

		this.drawGround(ctx);

		this.drawGrid(ctx);

		for(var i = 0; i < this.pawns.length; i++)
			this.pawns[i].draw(ctx);
	}, this);
};

GameBoard.prototype.drawGrid = function(ctx) {
	ctx.strokeStyle = "rgba(0,0,0,0.25)";
	ctx.beginPath();
	for(var x = 0; x < this.width; x += 1) {
		ctx.moveTo(x * GRIDSIZE, 0);
		ctx.lineTo(x * GRIDSIZE, this.height * GRIDSIZE);
	}
	for(var y = 0; y < this.width; y += 1) {
		ctx.moveTo(0, y * GRIDSIZE);
		ctx.lineTo(this.width * GRIDSIZE, y * GRIDSIZE);
	}
	ctx.stroke();
	return;
};

GameBoard.prototype.drawGround = function(ctx) {
	ctx.fillStyle = "#6c513c";

	//ctx.fillRect(0, 1*GRIDSIZE, this.width * GRIDSIZE, (this.height - 1) * GRIDSIZE);
	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			if(this.dirt[x][y])
				ctx.fillRect(x * GRIDSIZE, y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
		}
	}
};

GameBoard.prototype.destroy = function() {
	this.canvas.parentNode.removeChild(this.canvas);
	document.removeEventListener('gametick', this.tickEventListener);
};
