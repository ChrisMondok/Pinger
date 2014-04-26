var Player = extend(Pawn, function() {
	Pawn.apply(this, arguments);
	this.targetX = this.x;
	this.targetY = this.y;
});

Player.prototype.maxSpeed = 4;

Player.prototype.draw = function(ctx) {
	Pawn.prototype.draw.apply(this,ctx);

	ctx.fillStyle = "lime";
	ctx.beginPath();
	ctx.arc(
		(0.5+this.x)*GRIDSIZE,
		(0.5+this.y)*GRIDSIZE,
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
	if(this.x == this.targetX && this.y == this.targetY)
		return;

	var s = this.maxSpeed * e.dt/1000;

	this.x = Math.max(this.x - s, Math.min(this.x + s, this.targetX));
	this.y = Math.max(this.y - s, Math.min(this.y + s, this.targetY));

	this.gameBoard.dig(Math.round(this.x), Math.round(this.y));
}

Player.prototype.moveTo = function(x, y) {
	console.log("Move to "+x+", "+y);
	this.targetX = x;
	this.targetY = y;
};

Player.prototype.clickHandler = function(e, x, y) {
	if(this.x != this.targetX || this.y != this.targetY)
		return;

	if(Math.floor(x) == this.x || Math.floor(y) == this.y)
		this.moveTo(Math.floor(x), Math.floor(y));
};
