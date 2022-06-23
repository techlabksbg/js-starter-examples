window.addEventListener('load', function() {
	
	let gamecontainer = document.getElementById('gamecontainer');

	// Object definieren und gleich instanzieren
	let spielfeld = new function() {
		this.colors = ['#333', '#ff0', '#f00'];
		this.n = 16;
		this.init = function() {
			gamecontainer.innerHTML = '';  // Clear table (if any)
			this.tds = [];
			this.values = []
			let table = document.createElement('table');
			for (let y=0; y<this.n; y++) {
				let tr = document.createElement('tr');
				this.values.push([]);
				this.tds.push([]);
				for (let x=0; x<this.n; x++) {
					let td = document.createElement('td')
					this.values[y].push(0);
					this.tds[y].push(td);
					tr.append(td);
				}
				table.append(tr);
			}
			gamecontainer.append(table);
		};
		this.set = function(x,y,v) {
			this.values[y][x] = v;
			this.tds[y][x].style.backgroundColor = this.colors[v];
		};
		this.init();
	}();

	let snake = new function() {
		// Position
		this.x = Math.floor(spielfeld.n/2);
		this.y = this.x;
		// Richtung
		this.vx = 1;
		this.vy = 0;

		// Schlange vorrücken und weitere Dinge
		this.step = function() {
			this.x+=this.vx;
			this.y+=this.vy;
			if (this.x>=spielfeld.n) {
				this.x = 0;
				this.y += 1;
			}
			spielfeld.set(this.x, this.y,1);
		};
	}();

	let gameLoop = function() {
		snake.step();
		setTimeout(gameLoop, 500);
	}
	
	// Tastatur
	document.addEventListener('keydown', function(ev) {
		console.log(ev.code);
		if (ev.code=="ArrowDown") {
			snake.vx = 0;
			snake.vy = 1;
		}
	});

	// Game starten
	gameLoop();

});
