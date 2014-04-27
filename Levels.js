var placementFunctions = {
	random: function(gameBoard) {
		return [
			Math.floor(Math.random() * gameBoard.width),
			1 + Math.floor(Math.random() * (gameBoard.height - 1))
		];
	},
	top: function(gameBoard) {
		var r = Math.random() * Math.random();
		console.log(r);
		return [
			Math.floor(Math.random() * gameBoard.width),
			1 + Math.floor(r * (gameBoard.height - 1))
		];
	},
	bottom: function(gameBoard) {
		var r = 1 - Math.random() * Math.random();
		return [
			Math.floor(Math.random() * gameBoard.width),
			1 + Math.floor(r * (gameBoard.height - 1))
		];
	}
};
var levels = [
	{
		name: 'One gold piece',
		goldCount: 1,
		waterCount: 0,
		width: 20,
		height: 20,
		goldPlacementFunction: placementFunctions.random,
		waterPlacementFunction: placementFunctions.random
	},
	{
		name: 'Multiple gold pieces',
		goldCount: 3,
		waterCount: 0,
		width: 40,
		height: 20,
		goldPlacementFunction: placementFunctions.random,
		waterPlacementFunction: placementFunctions.random
	},
	{
		name: 'Sink or Swim',
		goldCount: 1,
		waterCount: 3,
		width: 40,
		height: 20,
		goldPlacementFunction: placementFunctions.random,
		waterPlacementFunction: placementFunctions.random
	},
	{
		name: 'Level Four',
		goldCount: 4,
		waterCount: 2,
		width: 40,
		height: 40,
		goldPlacementFunction: placementFunctions.random,
		waterPlacementFunction: placementFunctions.random
	},
	{
		name: 'Lots of Gold',
		goldCount: 7,
		waterCount: 3,
		width: 40,
		height: 20,
		goldPlacementFunction: placementFunctions.random,
		waterPlacementFunction: placementFunctions.random
	},
	{
		name: 'We Need To Go Deeper',
		goldCount: 1,
		waterCount: 5,
		width: 10,
		height: 50,
		goldPlacementFunction: placementFunctions.bottom,
		waterPlacementFunction: placementFunctions.random
	},
	{
		name: '10 by 10',
		goldCount: 3,
		waterCount: 5,
		width: 10,
		height: 11,
		goldPlacementFunction: placementFunctions.random,
		waterPlacementFunction: placementFunctions.random
	},
	{
		name: 'High water table',
		goldCount: 5,
		waterCount: 8,
		width: 40,
		height: 10,
		goldPlacementFunction: placementFunctions.bottom,
		waterPlacementFunction: placementFunctions.top
	}
];
