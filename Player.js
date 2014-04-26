var Player = extend(Pawn, function() {
	Pawn.apply(this, arguments);
	this.targetX = this.x;
	this.targetY = this.y;

	this.div = document.createElement('div');

	var pingButton = document.createElement('button');
	pingButton.innerHTML = 'Ping';
	pingButton.addEventListener('click', this.ping.bind(this));

	var clearButton = document.createElement('button');
	clearButton.innerHTML = 'Clear';
	clearButton.addEventListener('click', this.clear.bind(this));

	this.div.appendChild(pingButton);
	this.div.appendChild(clearButton);
	this.gameBoard.div.appendChild(this.div);
});

Player.prototype.maxSpeed = 4;

Player.prototype.draw = function(ctx) {
	Pawn.prototype.draw.apply(this,ctx);

	ctx.fillStyle = "lime";
	ctx.beginPath();
	ctx.arc(
		this.centerX,
		this.centerY,
		GRIDSIZE/2 - 3,
		0,
		2*Math.PI,
		false
	);
	ctx.fill();

	if(this.x != this.targetX || this.y != this.targetY) {
		ctx.strokeStyle = "#000";
		var w = 3;
		ctx.lineWidth = w;
		ctx.beginPath();


		ctx.moveTo(this.targetX * GRIDSIZE + w/2, (this.targetY + 1/3) * GRIDSIZE);
		ctx.lineTo(this.targetX * GRIDSIZE + w/2, this.targetY * GRIDSIZE + w/2);
		ctx.lineTo((this.targetX + 1/3) * GRIDSIZE, this.targetY * GRIDSIZE + w/2);

		ctx.moveTo((this.targetX + 2/3) * GRIDSIZE, this.targetY * GRIDSIZE + w/2);
		ctx.lineTo((this.targetX + 1) * GRIDSIZE - w/2, this.targetY * GRIDSIZE + w/2);
		ctx.lineTo((this.targetX + 1) * GRIDSIZE - w/2, (this.targetY + 1/3) * GRIDSIZE);

		ctx.moveTo(this.targetX * GRIDSIZE + w/2, (this.targetY + 2/3) * GRIDSIZE);
		ctx.lineTo(this.targetX * GRIDSIZE + w/2, (this.targetY + 1) * GRIDSIZE - w/2);
		ctx.lineTo((this.targetX + 1/3) * GRIDSIZE, (this.targetY + 1) * GRIDSIZE - w/2);

		ctx.moveTo((this.targetX + 2/3) * GRIDSIZE, (this.targetY + 1)* GRIDSIZE - w/2);
		ctx.lineTo((this.targetX + 1) * GRIDSIZE - w/2, (this.targetY + 1)* GRIDSIZE - w/2);
		ctx.lineTo((this.targetX + 1) * GRIDSIZE - w/2, (this.targetY + 2/3) * GRIDSIZE);

		ctx.stroke();
	}
};

Player.prototype.tick = function(e) {
	this.move(e);
};

Player.prototype.move = function(e) {
	var i;

	if(this.x == this.targetX && this.y == this.targetY)
		return;

	var s = this.maxSpeed * e.dt/1000;

	var oldX = Math.round(this.x);
	var oldY = Math.round(this.y);
	this.x = Math.max(this.x - s, Math.min(this.x + s, this.targetX));
	this.y = Math.max(this.y - s, Math.min(this.y + s, this.targetY));

	if(this.x != oldX) {
		for(i = Math.min(Math.round(this.x), oldX); i <= Math.max(Math.round(this.x), oldX); i++) {
			this.gameBoard.dig(this, i, Math.round(this.y));
		}
	}
	if(this.y != oldY) {
		for(i = Math.min(Math.round(this.y), oldY); i <= Math.max(Math.round(this.y), oldY); i++) {
			this.gameBoard.dig(this, Math.round(this.x), i);
		}
	}
};

Player.prototype.moveTo = function(x, y) {
	this.targetX = x;
	this.targetY = y;
};

Player.prototype.clickHandler = function(e, x, y) {
	if(this.x != this.targetX || this.y != this.targetY)
		return;

	if(Math.floor(x) == this.x || Math.floor(y) == this.y)
		this.moveTo(Math.floor(x), Math.floor(y));
};

Player.prototype.keyHandler = function(e) {
	if(this.x != this.targetX || this.y != this.targetY)
		return;

	if(e.key == 'Spacebar' || e.which == 32)
		this.ping();

	if(e.key == 'c' || e.which == 99)
		this.clear();
};

Player.prototype.ping = function() {
	this.gameBoard.spawn(Pulse, this.x, this.y);
};

Player.prototype.clear = function() {
	this.gameBoard.getPawnsOfType(Ring).forEach(function(r) {r.destroy();});
};

Player.prototype.destroy = function() {
	Pawn.prototype.destroy.apply(this, arguments);
	this.div.parentNode.removeChild(this.div);
};
