var Player = extend(Pawn);

Player.prototype.targetX = Player.prototype.x = 5;
Player.prototype.targetY = Player.prototype.y = 0;

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
};

Player.prototype.tick = function(e) {
	if(this.x != this.targetX || this.y != this.targetY) {
		var s = this.maxSpeed * e.dt/1000;

		this.x = Math.max(this.x - s, Math.min(this.x + s, this.targetX));
		this.y = Math.max(this.y - s, Math.min(this.y + s, this.targetY));
	}
};

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
