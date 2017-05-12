/* global setupTypewriter */

"use strict";

// Preload pokeball image.
let img = new Image();
img.src = 'images/ball-shake.gif';

// Creates an element for the typewriter effect.
function createTemplate( string, err=false ) {

	let start = '<pre data-target="target" data-opt="append">',
		end   = '\n</pre>',
		middle;

	if ( err === 404 ) {
		middle = '<span class="err-highlight">404: \'' + string + '\' was not found </span>';
	}
	else if ( err ) {
		middle = '<span class="err-highlight">Uncaught TypeError: newPokemon.' + string + '() is not a function</span>';
	}
	else {
        middle = 'newPokemon.<span class="var-highlight">' + string + '</span>();';
	}

	let element     = start + middle + end,
		newTemplate = document.createElement( "template" );
		
	newTemplate.innerHTML = element;

	return newTemplate.content.firstChild
}


// Sets up the typewriter and starts the type animation.
function fixTypewriter( content ){

	let typewriter = setupTypewriter( content );
	typewriter.type();

	return false
}

let n = null;  // number of the current Pokemon displayed

// Run when command line input value changes (hits return or clicks off).
document.querySelector( '[name="command"]' ).addEventListener( 'change', function() {
	
	this.setAttribute( "disabled", true ); 			   // disable input until type animation is finished
	let command = this.value.trim().toLowerCase(),  				   // the input
		$model  = document.getElementById( 'model' );  // the animated model element

	// Outputs appropriate img src for command based on what image is currently displayed
	function cmdCtrl( cmd ) {

		$model.onload = null;
		// Regex to get suffixs of mega, alola, and shiny
		// >> http://site.com/models/9-mega-shiny.gif
		// >> [models/3-mega-shiny.gif, mega, shiny]
		let re     = /(?:models\/)(?:\d{1,3})(?:\-{1}(megax|megay|mega|alola|attack|hat))?(?:\-{1}(shiny))?(?:\.gif)/,
			regExp = re.exec($model.src),
			src    = "models/" + n;

		if ( cmd === 'mega' || cmd === 'megax' || cmd === 'megay' || cmd === 'alola' || cmd === 'attack' || cmd === 'hat' ) {
			if ( regExp[1] === undefined || regExp[1] !== cmd ) {
				src += "-" + cmd;

				if ( cmd === 'mega' || cmd === 'megax' || cmd === 'megay' || cmd === 'alola' ) {
					if ( regExp[2] !== undefined ) {
						src += "-" + regExp[2];  // if pokemon is already shiny, keep it shiny
					}
				}
			}
			else if ( regExp[1] === cmd ) {
				if ( regExp[2] !== undefined ){
					src += "-" + regExp[2];  // if pokemon is already shiny, keep it shiny
				}
			}
		}
		else if ( cmd === 'shiny' ) {
			if ( regExp[1] === undefined ) {
				if ( regExp[2] === undefined ){
					src += "-" + cmd;
				}
			}
			else if ( regExp[1] === 'attack' || regExp[1] === 'hat' ) {
				src += "-" + cmd;
			}
			else if ( regExp[1] === 'mega' || regExp[1] === 'megax' || regExp[1] === 'megay' || regExp[1] === 'alola' ) {
				src += "-" + regExp[1];  // if pokemon is already mega or alolan, keep it that way

				if ( regExp[2] === undefined ) {
					src += "-" + cmd;
				}
			}
		}

		src += ".gif";

		if ( cmd !== 'relax' ) {
			let xhttp = new XMLHttpRequest();

			// Check if image file exists
			xhttp.onreadystatechange = function() {
				if ( this.readyState === 4 && this.status === 200 ) {
					$model.src = src;

					let content = createTemplate( cmd );
					fixTypewriter( content );		
				}
				else if ( this.readyState === 4 && this.status !== 200 ) {
					let content = createTemplate( cmd, true );
					fixTypewriter( content );
				}
			};

			xhttp.open( 'GET', src, true );
			xhttp.send();
		}
		else {
			$model.src = src;

			let content = createTemplate( cmd );
			fixTypewriter( content );	
		}
		return false
	}

	// Prevent function from running again after value is reset
	if ( this.value === '' ) {
		return false
	}

	// Reset command line
	this.value = '';
	this.blur();

	// Process command if not a pokemon name or not a real command.
		if ( command === 'mega' || command === 'megax' || command === 'megay' || command === 'alola' || command === 'attack' || command === 'hat' || command === 'shiny' || command === 'relax'  ) {
			cmdCtrl( command );
		}
	// Pokemon command
		else {
			let xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if ( this.readyState === 4 && this.status === 200 ) {
					let res = JSON.parse(this.responseText);

					if ( res === null || res === '404') {
						let content = createTemplate(command, 404);
						fixTypewriter(content);

						return false
					}
					else if ( res.id === n ){
						document.querySelector( '[name="command"]' ).removeAttribute('disabled'); 
						document.querySelector( '[name="command"]' ).focus();
						return false
					}

					$model.src = "images/ball-shake.gif";  // image before pokemon is displayed
					n = res.id;

					if ( !res.type2 ) {
						res.type2 = "null";
						document.querySelector( '#typewriter .poketype2' ).classList.remove("string-highlight");
						document.querySelector( '#typewriter .poketype2' ).classList.add("int-highlight");
					}
					else {
						res.type2 = "'" + res.type2 + "'";
						document.querySelector( '#typewriter .poketype2' ).classList.remove("int-highlight");
						document.querySelector( '#typewriter .poketype2' ).classList.add("string-highlight");
					}
					const onLoad = function(){
						if ($model.src.substr($model.src.length - 14) !== 'ball-shake.gif'){
							if ( command !== 'megax' || command !== 'megay' || command !== 'mega' || command !== 'attack' || command !== 'alola' || command !== 'shiny' || command !== 'hat' || command !== 'relax' ){
								$model.classList.add("grow"); 
								setTimeout(function(){
									$model.classList.remove("grow");
								}, 600)
							}
						}
					}
					setTimeout(function(){
						$model.onload = onLoad;
						$model.src = "models/" + res.id + ".gif";
					}, 1600);

					document.querySelector( '#name' ).innerHTML = res.name;
					document.querySelector( '#number' ).innerHTML = '#' + res.id;
					document.querySelector( '#typewriter .pokename' ).innerHTML = "'" + res.name + "'";
					document.querySelector( '#typewriter .pokenum' ).innerHTML = res.id;
					document.querySelector( '#typewriter .poketype1' ).innerHTML = "'" + res.type1 + "'";
					document.querySelector( '#typewriter .poketype2' ).innerHTML = res.type2;
					document.querySelector( '#typewriter .pokespecies' ).innerHTML = "'" + res.species + "'";

					let typewriter = document.getElementById('typewriter');
				    fixTypewriter(typewriter);
				}
			};

			xhttp.open( 'GET', 'pokefinder.php?name=' + command, true );
			xhttp.send();
		}

	return false
});
