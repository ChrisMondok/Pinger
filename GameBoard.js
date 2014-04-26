(function(namespace) {
	var makeDOM = function() {
		this.div = document.createElement('div');
		this.canvas = document.createElement('canvas');	
		this.canvas.setAttribute('width', viewportWidth);
		this.canvas.setAttribute('height', viewportHeight);
		this.canvas.addEventListener('click', this.clickHandler.bind(this));
		this.ctx = this.canvas.getContext('2d');

		this.scoreboard = document.createElement('div');

		this.div.appendChild(this.scoreboard);
		this.div.appendChild(this.canvas);
		document.body.appendChild(this.div);
	}

	namespace.GameBoard = function(width, height) {
		this.tickEventListener = this.tick.bind(this);
		this.keypressListener = this.keyHandler.bind(this);

		document.addEventListener('gametick', this.tickEventListener);

		document.addEventListener('keypress', this.keypressListener);

		this.width = width || 40;
		this.height = height || 20;

		this.viewportX = 0;
		this.viewportY = 0;

		makeDOM.apply(this);

		this.pawns = [];

		this.dirt = [];
		for(var x = 0; x < this.width; x++) {
			var column = this.dirt[x] = [];
			for (var y = 0; y < this.height; y++) {
				column[y] = y > 0;
			}
		}

		var score = 0;

		Object.defineProperty(this, 'score', {
			get: function() {return score;},
			set: function(value) {
				var oldScore = score;
				score = value;
				this.scoreChanged(oldScore);
			}
		});

		this.scoreChanged(0);
	};
})(window);

GameBoard.prototype.scoreChanged = function(oldScore) {
	this.scoreboard.innerHTML = ["Score:",this.score,"points"].join(' ');
};

GameBoard.prototype.dig = function(x, y) {
	this.dirt[x][y] = false;

	this.getPawnsOfType(Gold).filter(function(gold) {
		return gold.x == Math.round(x) && gold.y == Math.round(y);
	}).forEach(function(gold) {
		gold.collect();
	});
};

GameBoard.prototype.clickHandler = function(e) {
	//these are grid coordinates, not pixel coordinates
	var x = (e.clientX - this.canvas.offsetLeft + this.viewportX) / GRIDSIZE;
	var y = (e.clientY - this.canvas.offsetTop + this.viewportY) / GRIDSIZE;

	for(var i = 0; i < this.pawns.length; i++) {
		if('clickHandler' in this.pawns[i])
			this.pawns[i].clickHandler(e, x, y);
	}
};

GameBoard.prototype.keyHandler = function(e) {
	for(var i = 0; i < this.pawns.length; i++) {
		if('keyHandler' in this.pawns[i])
			this.pawns[i].keyHandler(e);
	}

	e.preventDefault();
	e.stopPropagation();
};

GameBoard.prototype.getPawnsOfType = function(type) {
	return this.pawns.filter(function(p) {
		return p instanceof type;
	});
};

GameBoard.prototype.spawn = function(cls, x, y) {
	var pawn = new cls(this, x, y);
	this.pawns.push(pawn);
	return pawn;
};

GameBoard.prototype.removePawn = function(pawn) {
	this.pawns.splice(this.pawns.indexOf(pawn), 1);
};

GameBoard.prototype.tick = function(tickEvent) {
	this.adjustViewport();
	for(var i = 0; i < this.pawns.length; i++)
		this.pawns[i].tick(tickEvent);

	if(true) {
		this.draw(this.ctx);
	}
};

GameBoard.prototype.adjustViewport = function() {
	var x = 0;
	var y = 0;
	var playerCount = 0;

	for(var i = 0; i < this.pawns.length; i++) {
		if(this.pawns[i] instanceof Player) {
			x += this.pawns[i].x;
			y += this.pawns[i].y;
			playerCount++;
		}
	}

	x = (x / playerCount + 0.5) * GRIDSIZE - viewportWidth / 2;
	y = (y / playerCount + 0.5) * GRIDSIZE - viewportHeight / 2;


	this.viewportX = Math.min(Math.max(0, x), this.width * GRIDSIZE - viewportWidth);
	this.viewportY = Math.min(Math.max(0, y), this.height * GRIDSIZE - viewportHeight);
};

GameBoard.prototype.draw = function(ctx) {
	usingState(ctx, function() {
		ctx.clearRect(0, 0, viewportWidth, viewportHeight);

		ctx.translate(-this.viewportX, -this.viewportY);

		this.drawGround(ctx);

		this.drawGrid(ctx);

		for(var i = 0; i < this.pawns.length; i++)
			this.pawns[i].draw(ctx);
	}, this);
};

GameBoard.prototype.drawGrid = function(ctx) {
	ctx.strokeStyle = "rgba(0,0,0,0.25)";
	ctx.beginPath();
	for(var x = 0; x < this.width; x += 1) {
		ctx.moveTo(x * GRIDSIZE, 0);
		ctx.lineTo(x * GRIDSIZE, this.height * GRIDSIZE);
	}
	for(var y = 0; y < this.width; y += 1) {
		ctx.moveTo(0, y * GRIDSIZE);
		ctx.lineTo(this.width * GRIDSIZE, y * GRIDSIZE);
	}
	ctx.stroke();
	return;
};

GameBoard.prototype.drawGround = function(ctx) {
	ctx.fillStyle = "#6c513c";

	//ctx.fillRect(0, 1*GRIDSIZE, this.width * GRIDSIZE, (this.height - 1) * GRIDSIZE);
	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			if(this.dirt[x][y])
				ctx.fillRect(x * GRIDSIZE, y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
		}
	}
};

GameBoard.prototype.destroy = function() {
	this.canvas.parentNode.removeChild(this.div);
	document.removeEventListener('gametick', this.tickEventListener);
	document.removeEventListener('keypress', this.keypressListener);
};
