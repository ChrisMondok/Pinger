function Pawn(gameBoard) {
	this.gameBoard = gameBoard;
	this.handlers = [];
}

Pawn.prototype.draw = function(ctx) {
};

Pawn.prototype.tick = function(e) {
};

Pawn.prototype.destroy = function() {
	this.gameBoard.removePawn(this);
};
