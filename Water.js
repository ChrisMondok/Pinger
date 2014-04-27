var Water = extend(Pawn);

Water.prototype.draw = function(ctx) {
	if(!this.gameBoard.reveal)
		return;

	ctx.fillStyle = "rgba(0, 105, 213, 0.5)";
	ctx.fillRect(this.x * GRIDSIZE, this.y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
};
