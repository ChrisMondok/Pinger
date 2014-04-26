var Pulse = extend(Ring, function() {
	Ring.apply(this, arguments);
	this.gold = this.gameBoard.getPawnsOfType(Gold);
});

Pulse.prototype.ttl = 2;
Pulse.prototype.speed = 12 * GRIDSIZE;

Pulse.prototype.color = "blue";

Pulse.prototype.tick = function(e) {
	var i;
	Ring.prototype.tick.apply(this,arguments);

	var toRemove = [];
	for(i = 0; i < this.gold.length; i++) {
		var g = this.gold[i];
		if(this.pixelDistanceTo(g) < this.radius) {
			var ring = this.gameBoard.spawn(Ring, this.x, this.y);
			ring.radius = this.pixelDistanceTo(g);
			ring.color = "gold";
			toRemove.push(g);
		}
	}

	for(i = 0; i < toRemove.length; i++)
		this.gold.splice(this.gold.indexOf(toRemove[i]), 1);

	
	this.radius += this.speed * e.dt / 1000;
};
