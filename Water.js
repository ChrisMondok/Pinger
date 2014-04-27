var Water = extend(Pawn);

Water.prototype.draw = function(ctx) {
	if(this.gameBoard.dirt[this.x][this.y] !== false)
		return;
	ctx.fillStyle = "rgba(0, 105, 213, 0.5)";
	ctx.fillRect(this.x * GRIDSIZE, this.y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
};
