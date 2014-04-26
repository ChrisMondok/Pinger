var Ring = extend(Pawn, function() {
	Pawn.apply(this, arguments);
	this.radius = 0;
});

Ring.prototype.color = "lime";

Ring.prototype.draw = function(ctx) {
	Pawn.prototype.draw.apply(this, arguments);
	ctx.strokeStyle = this.color;
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(
		this.centerX,
		this.centerY,
		this.radius,
		0,
		2*Math.PI,
		false
	);
	ctx.stroke();
};

var Pulse = extend(Ring, function() {
	Ring.apply(this, arguments);
	this.gold = this.gameBoard.getPawnsOfType(Gold);
});

Pulse.prototype.ttl = 2;
Pulse.prototype.speed = 12 * GRIDSIZE;

Pulse.prototype.color = "blue";

Pulse.prototype.tick = function(e) {
	Ring.prototype.tick.apply(this,arguments);
	this.ttl -= e.dt / 1000;
	if(this.ttl <= 0)
		this.destroy();

//	for(var i = 0; i < this.gold.length; i++) {
//		if(pointDistance(this.x, this.y, this.gold[i].x, this.gold[i].y))
//	}
	
	this.radius += this.speed * e.dt / 1000;
};
