var Particle = extend(Pawn);

Particle.prototype.ttl = 1;

Particle.prototype.tick = function(e) {
	Pawn.prototype.tick.apply(this, arguments);
	this.ttl -= e.dt / 1000;
	if(this.ttl <= 0)
		this.destroy();
}
