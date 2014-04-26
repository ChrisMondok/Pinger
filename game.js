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

	window.game = new GameBoard();

	window.player = game.spawn(Player, Math.round(window.game.width/2), 0);

	for(i = 0; i < 7; i++)
		window.game.spawn(Gold, Math.floor(Math.random() * window.game.width), 1 + Math.floor(Math.random() * (window.game.height - 1)));

	for(i = 0; i < 3; i++)
		window.game.spawn(Water, Math.floor(Math.random() * window.game.width), 1 + Math.floor(Math.random() * (window.game.height - 1)));
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
