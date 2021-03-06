var Ring = extend(Particle, function() {
	Pawn.apply(this, arguments);
	this.radius = 0;
});

Ring.prototype.ttl = 15;
Ring.prototype.color = "lime";

Ring.prototype.draw = function(ctx) {
	Pawn.prototype.draw.apply(this, arguments);
	usingState(ctx, function() {
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 1;
		ctx.globalAlpha = Math.sqrt(this.ttl / Object.getPrototypeOf(this).ttl);
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
	}, this);
};
