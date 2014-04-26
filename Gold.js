var Gold = extend(Pawn, function() {
	Pawn.apply(this, arguments);
	this.offsetX = Math.random() * (GRIDSIZE - 2 * this.radius) + this.radius;
	this.offsetY = Math.random() * (GRIDSIZE - 2 * this.radius) + this.radius;
});

Object.defineProperty(Gold.prototype, 'centerX', {
	get: function() {return (this.x) * GRIDSIZE + this.offsetX;},
	set: function() {throw "Trying to assign to read only property";}
});

Object.defineProperty(Gold.prototype, 'centerY', {
	get: function() {return (this.y) * GRIDSIZE + this.offsetY;},
	set: function() {throw "Trying to assign to read only property";}
});

Gold.prototype.radius = 4;

Gold.prototype.collect = function() {
	this.gameBoard.score += 5;
	sounds.get.play();
	this.destroy();
};

Gold.prototype.draw = function(ctx) {
	return;
	ctx.fillStyle = "#FFFF00";

	ctx.beginPath();
	ctx.arc(
		this.centerX,
		this.centerY,
		this.radius,
		0,
		2*Math.PI,
		false
	);

	ctx.fill();
};
