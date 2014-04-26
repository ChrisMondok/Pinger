var Water = extend(Pawn);

Water.prototype.draw = function(ctx) {
	if(this.gameBoard.dirt[this.x][this.y])
		return;
	ctx.fillStyle = "#0069d5";
	ctx.fillRect(this.x * GRIDSIZE, this.y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
};
