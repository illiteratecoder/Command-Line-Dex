/* Dex command controller */

"use strict";

let $n = null;  // number of current Pokemon

// Bind functions to the input command line and run when value changes
document.querySelector( '[name="command"]' ).addEventListener( 'change', function() {
	
	this.setAttribute( "disabled", true );
	let $command = this.value;  // the input
	let $model   = document.getElementById('model')  // the animated model element

	// Prevent function from running again after value is reset
	if ( this.value === '' ) {
		return false
	}

	// Reset command line
	this.value = '';
	this.blur();

	// Attack command
	if ( $command === 'attack' ) {
		$model.src = "models/" + $n + "-attack" + ".gif";

        let newTemplate = document.createElement("template");
        newTemplate.innerHTML = 'newPokemon.attack();';

		let typewriter = setupTypewriter(newTemplate);
		typewriter.type();
		return false
	}

	// Relax command
	else if ( $command === 'relax' ) {
		if ( $model.src !== "models/" + $n + ".gif"){
			$model.src = "models/" + $n + ".gif";
		}

		return false
	}

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			let $re = JSON.parse(this.responseText);
			$n = $re.id;
			document.getElementById('model').src = "models/" + $re.id + ".gif";
			document.getElementById('name').innerHTML = $re.name;
			document.getElementById('number').innerHTML = '#' + $re.id;
		}
	};
	xhttp.open('GET', 'backend/names.php?name=' + $command, true);
	xhttp.send();

    var typewriter = document.getElementById('typewriter');
    typewriter = setupTypewriter(typewriter);
    typewriter.type();
});




























