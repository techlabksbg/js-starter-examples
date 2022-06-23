window.addEventListener('load', function() {
	
	let gamediv = document.getElementById('game');


	// Die Karten sollten generiert werden
	let carddivs = gamediv.children;
	

	let meinKlick = function(ev) {
		let card = this;  // Karte, die den Event ausgelöst hat.
		if (card.classList.contains('verdeckt')) {
			card.classList.toggle('verdeckt');
			card.classList.toggle('offen');
			card.children[0].style.display="block";
		} else  {
			card.classList.toggle('verdeckt');
			card.classList.toggle('offen');
			card.children[0].style.display="none";
		}
	}

	let eventsEintragen = function() {
		for (const cdiv of carddivs) {
			cdiv.addEventListener('click', meinKlick);
		}
	}

	eventsEintragen();

});
