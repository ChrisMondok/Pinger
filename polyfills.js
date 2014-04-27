(function () {
	try
	{
		new CustomEvent('testevent');

		window.makeCustomEvent = function(e) {
			return new CustomEvent(e);
		};
	}
	catch (e) {
		console.warn("Using customEvent polyfill");
		window.makeCustomEvent = function(e) {
			var evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(e, true, false, null);
			return evt;
		};
	}
})();
