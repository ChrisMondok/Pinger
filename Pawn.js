function Pawn(gameBoard, x, y) {
	this.gameBoard = gameBoard;
	this.handlers = [];
	this.x = x;
	this.y = y;
}

Pawn.prototype.draw = function(ctx) {
};

Pawn.prototype.tick = function(e) {
};

Pawn.prototype.destroy = function() {
	this.gameBoard.removePawn(this);
};
