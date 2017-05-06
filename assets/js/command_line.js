/* Dex command controller */

"use strict";

// Creates an element for the typewriter effect
function createTemplate( string ) {
	let newTemplate = document.createElement("template");
	newTemplate.innerHTML = string;

	return newTemplate.content.firstChild
}

// Creates an string for output from a command
function createString( string, err=false) {
	let start = '<pre data-target="copy" data-opt="append">';
	let end = '\n</pre>';
	let middle;
	if (err) {
		middle = '<span class="err-highlight">Uncaught TypeError: newPokemon.' + string + '() is not a function</span>';
	}
	else {
        middle = 'newPokemon.<span class="var-highlight">' + string + '</span>();';
	}

	return start + middle + end
}


let $n = null;  // number of the current Pokemon

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
		let $src = "models/" + $n + "-attack" + ".gif";
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if ( this.readyState === 4 && this.status === 200 ) {
				$model.src = $src;

        		let content = createString('attack');
				content = createTemplate(content);
				let typewriter = setupTypewriter(content);
				typewriter.type();		
			}
			else if ( this.readyState === 4 && this.status !== 200) {
				let content = createString('attack', true);
				content = createTemplate(content);
				let typewriter = setupTypewriter(content);
				typewriter.type();
			}
		};

		xhttp.open('GET', $src, true);
		xhttp.send();

		return false
	}

	// Relax command
	else if ( $command === 'relax' ) {
		$model.src = "models/" + $n + ".gif";

		let content = createString('relax');
		content = createTemplate(content);
		let typewriter = setupTypewriter(content);
		typewriter.type();

		return false
	}

	// Shiny command
	else if ( $command === 'shiny' ) {
		let $src = "models/" + $n + "-shiny" + ".gif";
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if ( this.readyState === 4 && this.status === 200 ) {
				$model.src = $src;

				let content = createString('shiny');
				content = createTemplate(content);
				let typewriter = setupTypewriter(content);
				typewriter.type();		
			}
			else if ( this.readyState === 4 && this.status !== 200) {
				let content = createString('shiny', true);
				content = createTemplate(content);
				let typewriter = setupTypewriter(content);
				typewriter.type();
			}
		};

		xhttp.open('GET', $src, true);
		xhttp.send();

		return false
	}

	// Mega command
	else if ( $command === 'mega' ) {
		let $src = "models/" + $n + "-mega" + ".gif";
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if ( this.readyState === 4 && this.status === 200 ) {
				$model.src = $src;

				let content = createString('mega');
				content = createTemplate(content);
				let typewriter = setupTypewriter(content);
				typewriter.type();		
			}
			else if ( this.readyState === 4 && this.status !== 200) {
				let content = createString('mega', true);
				content = createTemplate(content);
				let typewriter = setupTypewriter(content);
				typewriter.type();
			}
		};

		xhttp.open('GET', $src, true);
		xhttp.send();

		return false
	}

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			let $resp = JSON.parse(this.responseText);
			$n = $resp.id;

			if ( !$resp.type2 ) {
				$resp.type2 = "null";
				document.getElementById('poketype2').className = "int-highlight";
			}
			else {
				$resp.type2 = "'" + $resp.type2 + "'";
				document.getElementById('poketype2').className = "string-highlight";

			}

			document.getElementById('model').src = "models/" + $resp.id + ".gif";
			document.getElementById('name').innerHTML = $resp.name;
			document.getElementById('number').innerHTML = '#' + $resp.id;
			document.getElementById('pokename').innerHTML = "'" + $resp.name + "'";
			document.getElementById('pokenum').innerHTML = $resp.id;
			document.getElementById('poketype1').innerHTML = "'" + $resp.type1 + "'";
			document.getElementById('poketype2').innerHTML = $resp.type2;
			document.getElementById('pokespecies').innerHTML = "'" + $resp.species + "'";

			let typewriter = document.getElementById('typewriter');
		    typewriter = setupTypewriter(typewriter);
		    typewriter.type();
		}
	};
	xhttp.open('GET', 'backend/pokefinder.php?name=' + $command, true);
	xhttp.send();
});












































