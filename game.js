var GRIDSIZE = 32;
var viewportWidth = 640;
var viewportHeight = 480;

function init() {
	var i;

	var frames = 0;
	var last = new Date().getTime();
	setInterval(function() {
		var now = new Date().getTime();
	
		var tickEvent = new CustomEvent('gametick');
		tickEvent.dt = (now - last);

		document.dispatchEvent(tickEvent);

		last = now;
		frames++;
	}, 1000/60);

	setInterval(function() {
		document.getElementById('frameRate').innerHTML = frames;
		frames = 0;
	}, 1000);

	makeLevelTable();

	document.getElementById('quitButton').addEventListener('click', endLevel.bind(window, false));
}

function startLevel(level) {

	document.body.className = "playing";

	var game = window.game = new GameBoard(level);

	window.player = game.spawn(Player, Math.round(window.game.width/2), 0);

	for(i = 0; i < level.goldCount; i++) {
		var coords = level.goldPlacementFunction(game);
		game.spawn(Gold, coords[0], coords[1]);
	}

	for(i = 0; i < level.waterCount; i++)
		game.spawn(Water, Math.floor(Math.random() * window.game.width), 1 + Math.floor(Math.random() * (window.game.height - 1)));
}

function endLevel(won) {
	if(won) {
		var scores = JSON.parse(localStorage.getItem('scores')) || {};
		var score = scores[game.level.name] || Infinity;
		if(game.dug < score) {
			scores[game.level.name] = game.dug;
			localStorage.setItem('scores', JSON.stringify(scores));
			makeLevelTable();
		}
	}

	window.game.destroy();

	document.body.className = "";
}

function usingState(ctx, fn, scope) {
	ctx.save();
	fn.apply(scope);
	ctx.restore();
}

function extend(base, ctor) {
	var cls = ctor || function(){base.apply(this, arguments);};
	cls.prototype = Object.create(base.prototype);
	if(ctor) cls.prototype.constructor = ctor;
	return cls;
}

function pointDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

window.addEventListener('load', init);
