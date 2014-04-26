var Water = extend(Pawn);

Water.prototype.draw = function(ctx) {
	return;
	ctx.fillStyle = "#0069d5";
	ctx.fillRect(this.x * GRIDSIZE, this.y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
};

Water.prototype.tick = function(e) {
	var players = this.gameBoard.getPawnsOfType(Player);
	for(var i = 0; i < players.length; i++) {
		if(Math.round(players[i].x) == this.x && Math.round(players[i].y == this.y)) {
			alert("you lost");
			this.destroy();
		}
	}
};
