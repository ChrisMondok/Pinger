var placementFunctions = {
	random: function(gameBoard) {
		return [
			Math.floor(Math.random() * gameBoard.width),
			1 + Math.floor(Math.random() * (gameBoard.height - 1))
		];
	},
	bottom: function(gameBoard) {
		var r = 1 - Math.random() * Math.random();
			console.log(1 + Math.floor(r * (gameBoard.height - 1)))
		return [
			Math.floor(Math.random() * gameBoard.width),
			1 + Math.floor(r * (gameBoard.height - 1))
		];
	}
};
var levels = [
	{name: 'Level One', goldCount: 1, waterCount: 1, width: 40, height: 20, goldPlacementFunction: placementFunctions.random},
	{name: 'Level Two', goldCount: 4, waterCount: 2, width: 40, height: 20, goldPlacementFunction: placementFunctions.random},
	{name: 'Level Three', goldCount: 7, waterCount: 3, width: 40, height: 20, goldPlacementFunction: placementFunctions.random},
	{name: 'Level Four', goldCount: 1, waterCount: 5, width: 10, height: 50, goldPlacementFunction: placementFunctions.bottom}
];
