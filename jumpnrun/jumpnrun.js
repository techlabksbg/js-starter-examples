window.addEventListener('load', function() {
	
	let obstacles = document.getElementsByClassName("obstacle");
	// Positionen der Hindernisse
	let positionen = [[50,20], [80,40]];
	// Position des Hintergrunds
	let bgpos = 0;
	let bg = document.getElementById('bg');

	let positionieren = function() {
		// Position der Hindernisse 
		for (let i=0; i<obstacles.length; i++) {
			obstacles[i].style.left = positionen[i][0]+"vw";
			obstacles[i].style.top = positionen[i][1]+"vw";
		}
		// Hintergrund Position
		bg.style.backgroundPosition = bgpos+"vw 0";
	};

	let move = function() {
		// Hindernisse
		for (let i=0; i<obstacles.length; i++) {
			positionen[i][0]-=0.2+i*0.3;
			if (positionen[i][0]<-5) {
				positionen[i][0]=100;
			}
		}
		// Hintergrund
		bgpos-=0.05;
	};

	let gameLoop = function() {
		move();
		positionieren();
		window.requestAnimationFrame(gameLoop);
	}

	let gameAction = function(what) {
		if (what=="up") {
			positionen[0][1]-=5;
			if (positionen[0][1]<0) {
				positionen[0][1]+=50;
			}
		}
	};


	document.body.addEventListener('keydown', function(ev) {
		console.log(ev.code);
		gameAction("up");
	});

	// start Game
	gameLoop();


});
