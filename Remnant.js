var Remnant = extend(Pawn, function() {
	Pawn.apply(this, arguments);
	this.offsetX = 0;
	this.offsetY = 0;
});

Object.defineProperty(Remnant.prototype, 'centerX', {
	get: function() {return (this.x) * GRIDSIZE + this.offsetX;},
	set: function() {throw "Trying to assign to read only property";}
});

Object.defineProperty(Remnant.prototype, 'centerY', {
	get: function() {return (this.y) * GRIDSIZE + this.offsetY;},
	set: function() {throw "Trying to assign to read only property";}
});

Remnant.prototype.draw = function(ctx) {
	ctx.fillStyle = "rgba(255,255,0,0.5)";

	ctx.beginPath();
	ctx.arc(
		this.centerX,
		this.centerY,
		4,
		0,
		2*Math.PI,
		false
	);

	ctx.fill();
};
