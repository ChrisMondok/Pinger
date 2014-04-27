var Nope = extend(Particle, function() {
	Particle.apply(this, arguments);
	sounds.nope.play(0.5);
});

Nope.prototype.ttl = 1;

Nope.prototype.draw = function(ctx) {
	var a = 0.85 * Math.max(0, (this.ttl / Object.getPrototypeOf(this).ttl));
	ctx.fillStyle = "rgba(90,0,0,"+a+");";
	ctx.fillRect(this.x * GRIDSIZE - viewportWidth, (this.y) * GRIDSIZE - viewportHeight, viewportWidth, viewportHeight);
	ctx.fillRect(this.x * GRIDSIZE - viewportWidth, (this.y + 1) * GRIDSIZE, viewportWidth, viewportHeight);
	ctx.fillRect((this.x + 1) * GRIDSIZE, (this.y) * GRIDSIZE - viewportHeight, viewportWidth, viewportHeight);
	ctx.fillRect((this.x + 1) * GRIDSIZE, (this.y + 1) * GRIDSIZE, viewportWidth, viewportHeight);}
