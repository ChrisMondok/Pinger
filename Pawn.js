function Pawn(gameBoard, x, y) {
	this.gameBoard = gameBoard;
	this.x = x;
	this.y = y;
}

Object.defineProperty(Pawn.prototype, 'centerX', {
	get: function() {return (this.x + 0.5) * GRIDSIZE;},
	set: function() {throw "Trying to assign to read only property";}
});

Object.defineProperty(Pawn.prototype, 'centerY', {
	get: function() {return (this.y + 0.5) * GRIDSIZE;},
	set: function() {throw "Trying to assign to read only property";}
});

Pawn.prototype.pixelDistanceTo = function(otherPawn) {
	return pointDistance(this.centerX, this.centerY, otherPawn.centerX, otherPawn.centerY);
};

Pawn.prototype.distanceTo = function(otherPawn) {
	return pointDistance(this.x, this.y, otherPawn.x, otherPawn.y);
};

Pawn.prototype.draw = function(ctx) {
};

Pawn.prototype.tick = function(e) {
};

Pawn.prototype.destroy = function() {
	this.gameBoard.removePawn(this);
};
