window.addEventListener('load', function() {
	
	let rechnung = document.getElementById('rechnung');
	let resultat = document.getElementById('resultat');
	let feedback = document.getElementById('feedback');

	let loesung = "";

	let rechnungGenerieren = function() {
		let a = Math.floor(Math.random()*20);
		rechnung.innerText = `${a}+${a} = `;
		loesung = 2*a;
	};

	resultat.addEventListener('change', function() {
		if (loesung == this.value) {
			feedback.innerText = "Super!";
			rechnungGenerieren();
		} else {
			feedback.innerText = ":-(";
		}
		this.value = "";
	});

	rechnungGenerieren();

});
