var placementFunctions = {
	random: function(gameBoard) {
		return [Math.floor(Math.random() * gameBoard.width), 1 + Math.floor(Math.random() * (window.game.height - 1))];
	},
	bottom: function(gameBoard) {
	}
};
var levels = [
	{name: 'Level One', goldCount: 1, waterCount: 1, width: 40, height: 20, goldPlacementFunction: placementFunctions.random},
	{name: 'Level Two', goldCount: 4, waterCount: 2, width: 40, height: 20, goldPlacementFunction: placementFunctions.random},
	{name: 'Level Three', goldCount: 7, waterCount: 3, width: 40, height: 20, goldPlacementFunction: placementFunctions.random},
	{name: 'Level Four', goldCount: 1, waterCount: 5, width: 10, height: 50, goldPlacementFunction: placementFunctions.random}
];
