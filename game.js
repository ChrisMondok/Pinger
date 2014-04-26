var GRIDSIZE = 32;
var viewportWidth = 640;
var viewportHeight = 480;

function init() {
	setInterval(function() {
		var e = new CustomEvent('gametick');
		document.dispatchEvent(e);
	}, 1000/30);

	window.g = new GameBoard();
}

function usingState(ctx, fn, scope) {
	ctx.save();
	fn.apply(scope);
	ctx.restore();
}
window.addEventListener('load', init);
