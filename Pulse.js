var Pulse = extend(Ring, function() {
	Ring.apply(this, arguments);
	sounds.ping.play();
	this.undetected = this.gameBoard.getPawnsOfType(Gold).concat(this.gameBoard.getPawnsOfType(Water));
});

Pulse.prototype.ttl = 2;
Pulse.prototype.speed = 12 * GRIDSIZE;

Pulse.prototype.color = "white";

Pulse.prototype.tick = function(e) {
	var i;
	Ring.prototype.tick.apply(this,arguments);

	var toRemove = [];
	for(i = 0; i < this.undetected.length; i++) {
		var item = this.undetected[i];
		if(this.pixelDistanceTo(item) < this.radius) {
			var ring = this.gameBoard.spawn(Ring, this.x, this.y);
			ring.radius = this.pixelDistanceTo(item);
			if(item instanceof Gold)
				ring.color = "gold";
			else if(item instanceof Water)
				ring.color = "blue";
			toRemove.push(item);
			sounds.found.play();
		}
	}

	for(i = 0; i < toRemove.length; i++)
		this.undetected.splice(this.undetected.indexOf(toRemove[i]), 1);

	
	this.radius += this.speed * e.dt / 1000;
};
