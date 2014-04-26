var Gold = extend(Pawn, function() {
	Pawn.apply(this, arguments);
	this.offsetX = Math.random() * (GRIDSIZE - 2 * this.radius) + this.radius;
	this.offsetY = Math.random() * (GRIDSIZE - 2 * this.radius) + this.radius;
});

Gold.prototype.radius = 4;

Gold.prototype.collect = function() {
	//play a sound
	this.gameBoard.score += 5;
	this.destroy();
};

Gold.prototype.draw = function(ctx) {
	ctx.fillStyle = "#FFFF00";

	ctx.beginPath();
	ctx.arc(
		this.x * GRIDSIZE + this.offsetX,
		this.y * GRIDSIZE + this.offsetY,
		this.radius,
		0,
		2*Math.PI,
		false
	);

	ctx.fill();
};
