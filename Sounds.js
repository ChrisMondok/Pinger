function Sound(url){
	this.url = url;
	new Audio(url).addEventListener('canplaythrough', function() {
		console.log(url+" loaded");
	});
}

Sound.prototype.play = function() {
	new Audio(this.url).play();
};

window.sounds = {
	get: new Sound("sounds/get.wav"),
	ping: new Sound("sounds/ping.wav"),
	found: new Sound("sounds/found.wav")
};
