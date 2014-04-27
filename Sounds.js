function Sound(urls){
	this.loaded = 0;
	this.urls = urls;
	this.urls.forEach(function(u) {
		new Audio(u).addEventListener('canplaythrough', function() {
			this.loaded += 1/urls.length;
		});
	});
}

Sound.prototype.play = function(volume) {
	var i = Math.floor(Math.random() * this.urls.length);
	var audio = new Audio(this.urls[i])
	audio.volume = volume || 1;
	audio.play();
};

window.sounds = {
	get: new Sound(["sounds/get.wav"]),
	ping: new Sound(["sounds/ping.wav"]),
	found: new Sound(["sounds/found.wav"]),
	win: new Sound(["sounds/win.wav"]),
	lose: new Sound(["sounds/lose.wav"]),
	nope: new Sound(["sounds/nope.wav"]),
	dirt: new Sound([
		"sounds/dirt0.wav",
		"sounds/dirt1.wav",
		"sounds/dirt2.wav",
		"sounds/dirt3.wav",
		"sounds/dirt4.wav"
	])
};
