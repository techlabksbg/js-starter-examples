window.addEventListener('load', function() {
	// HTML-Elemente, überall in dieser Funktion verwendbar.	
	let game= document.getElementById('game');
	let numberpad = document.getElementById('numberpad');

	// HTML-Element der Felder, organisiert als 2D-Array
	// blocks[block][number] wobei die Blöcke und Unterblöcke wie folgt sind:
	// 0 1 2
	// 3 4 5
	// 6 7 8
	let blocks = [];

    // Abfragen und Manipulation der Einträge
	// Rückgabe-/Set-wert als String "1"-"9" oder ""
	let getByBlock = function(block, number) {
		return blocks[block][number].innerText;
	};
	let setByBlock = function(block, number, entry) {
		blocks[block][number].innerText = entry;
	};

	let getByCoord = function(x,y) {
		return getByBlock(Math.floor(x/3)+3*Math.floor(y/3));
	}
	let setByCoord = function(x,y, entry) {
		setByBlock(Math.floor(x/3)+3*Math.floor(y/3), entry)
	};

	// Für welches Feld der Input sein soll
	let activeBlock = -1;
	let activeNumber = -1;

	// Click auf ein Feld im Sudoku
	let feldClick = function(ev) {
		ev.preventDefault();
		numberpad.style.display = "none"; 
		let f = this;
		if (f.classList.contains('fixiert')) {
			return;
		}
		// Daten setzen, Numberpad über Click öffnen
		activeBlock = f.getAttribute('block');
		activeNumber =f.getAttribute('number');
		numberpad.style.display = "flex";
		numberpad.style.left = (ev.pageX-numberpad.offsetWidth/2)+"px";
		numberpad.style.top = (ev.pageY-numberpad.offsetHeight/2)+"px";
	}
	
	// Click auf eine "Taste" im Numberpad
	let padClick = function(ev) {
		numberpad.style.display = "none";
		let s = this.innerText;
		if (s=="X") {
			s = "";
		}
		setByBlock(activeBlock, activeNumber, s);
	}

	// HTML-Elemente generieren, 
	// Click-events registieren
	let generateHTML = function() {
		// Sudoku
		for (let block=0; block<9; block++) {
			blocks.push([]);
			let b = document.createElement('div');
			b.className = "neunerblock";
			for (let number=0; number<9; number++) {
				let f = document.createElement('div');
				f.setAttribute('block', block);
				f.setAttribute('number', number);
				f.className="eintrag";
				f.addEventListener('click', feldClick);
				if (Math.random()<0.2) {
					f.innerText = Math.floor(1+9*Math.random());
					f.classList.add('fixiert');
				} 
				b.appendChild(f);
				blocks[block].push(f);
			}
			game.appendChild(b);
		}
		// Numberpad
		for (let name of [7,8,9,4,5,6,1,2,3,"X"]) {
			let f = document.createElement('div');
			f.innerText = name;
			f.addEventListener('click', padClick);
			numberpad.appendChild(f);
		}

	};

	// Does what it says ;-)
	generateHTML();

});
