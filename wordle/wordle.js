window.addEventListener('load', function() {
	
	// Die Buchstabenfelder sollten generiert werden
	let letters = [...document.querySelectorAll("#gametable td")];

	let animation = function() {
		let cycle = {'normal':'gelb', 'gelb':'gruen', 'gruen':'normal'};
		// Klassen wechseln
		for (const letter of letters) {
			for (const zustand of Object.keys(cycle)) {
				if (letter.classList.contains(zustand)) {
					letter.classList.toggle(zustand);
					letter.classList.toggle(cycle[zustand]);
					break;
				}
			}
		}
		// Buchstaben wechseln
		let b = letters[1].innerText.codePointAt(0);
		let a = "A".codePointAt(0);
		b = String.fromCodePoint((((b-a)+1)%26)+a);
		letters[1].innerText = b;
		setTimeout(animation, 1000);
	}

	animation();


});
