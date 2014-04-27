var Dirt = extend(Particle);

Dirt.prototype.image = null; // YOU NEED TO SET THIS.
Dirt.prototype.ttl = 0.5;

Dirt.prototype.draw = function(ctx) {
	var pct = Math.pow(this.ttl / Object.getPrototypeOf(this).ttl, 2);
	usingState(ctx, function() {
		ctx.beginPath();
		ctx.rect(this.x * GRIDSIZE, (this.y + (1-pct)) * GRIDSIZE , GRIDSIZE, GRIDSIZE * pct);
		ctx.clip();
		ctx.drawImage(this.image, this.x * GRIDSIZE, this.y* GRIDSIZE);
	}, this);
};
