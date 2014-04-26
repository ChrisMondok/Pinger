var GRIDSIZE = 32;
var viewportWidth = 640;
var viewportHeight = 480;

function init() {

	var frames = 0;
	var last = new Date().getTime();
	setInterval(function() {
		var now = new Date().getTime();
	
		var tickEvent = new CustomEvent('gametick');
		tickEvent.dt = (now - last);

		document.dispatchEvent(tickEvent);

		last = now;
		frames++;
	}, 1000/30);

	setInterval(function() {
		document.getElementById('frameRate').innerHTML = frames;
		frames = 0;
	}, 1000);

	window.game = new GameBoard();

	window.player = game.spawn(Player, 5, 0);
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

window.addEventListener('load', init);
