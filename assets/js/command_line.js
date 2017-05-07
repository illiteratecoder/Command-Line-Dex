/* Handles input commands for the Dex */

"use strict";

// Creates an element for the typewriter effect
function createTemplate( string, err=false ) {

	let start = '<pre data-target="copy" data-opt="append">',
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


// Sets up the typewriter and starts the type animation
function fixTypewriter( content ){

	let typewriter = setupTypewriter( content );
	typewriter.type();

	return false
}

let n = null;  // number of the current Pokemon displayed

// Run when command line input value changes (hits return or clicks off)
document.querySelector( '[name="command"]' ).addEventListener( 'change', function() {
	
	this.setAttribute( "disabled", true ); 			 // disable input until type animation is finished
	let command = this.value,  						 // the input
		$model  = document.getElementById( 'model' );  // the animated model element

	// Outputs appropriate img src for command based on what image is currently displayed
	function cmdCtrl( cmd ) {

		// Regex to get suffixs of mega, alola, and shiny
		// >> http://site.com/models/9-mega-shiny.gif
		// >> [models/3-mega-shiny.gif, mega, shiny]
		let re     = /(?:models\/)(?:\d{1,3})(?:\-{1}(mega|alola|attack|hat))?(?:\-{1}(shiny))?(?:\.gif)/,
			regExp = re.exec($model.src),
			src    = "models/" + n;

		if ( cmd === 'mega' || cmd === 'alola' || cmd === 'attack' || cmd === 'hat' ) {
			if ( regExp[1] === undefined || regExp[1] !== cmd ) {
				src += "-" + cmd;

				if ( cmd === 'mega' || cmd === 'alola' ) {
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
			else if ( regExp[1] === 'mega' || regExp[1] === 'alola' ) {
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

	// Attack command
		if ( command === 'attack' ) {
			cmdCtrl( 'attack' );
		}

	// Shiny command
		else if ( command === 'shiny' ) {
			cmdCtrl( 'shiny' );
		}

	// Mega command
		else if ( command === 'mega' ) {
			cmdCtrl( 'mega' );
		}

	// Alola command
		else if ( command === 'alola' ) {
			cmdCtrl( 'alola' );
		}

	// Hat command (for pikachu)
		else if (command === 'hat') {
			cmdCtrl( 'hat' );
		}

	// Relax command
		else if ( command === 'relax' ) {
			cmdCtrl( 'relax' );
		}

	// Pokemon command
		else {
			let xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if ( this.readyState === 4 && this.status === 200 ) {
					let res = JSON.parse(this.responseText);

					if ( res === null ) {
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
						document.getElementById('poketype2').className = "int-highlight";
					}
					else {
						res.type2 = "'" + res.type2 + "'";
						document.getElementById('poketype2').className = "string-highlight";
					}

					$model.classList.remove("grow");

					setTimeout(function(){
						$model.onload = function() {
							if ($model.src.substr($model.src.length - 14) !== 'ball-shake.gif'){
								if ( command !== 'mega' || command !== 'attack' || command !== 'alola' || command !== 'shiny' || command !== 'hat' || command !== 'relax' ){
									$model.classList.add("grow"); 
								}
							}
						}
						$model.src = "models/" + res.id + ".gif";
						// $model.classList.add("grow");
					}, 1600);

					document.getElementById( 'name'        ).innerHTML = res.name;
					document.getElementById( 'number'      ).innerHTML = '#' + res.id;
					document.getElementById( 'pokename'    ).innerHTML = "'" + res.name + "'";
					document.getElementById( 'pokenum'     ).innerHTML = res.id;
					document.getElementById( 'poketype1'   ).innerHTML = "'" + res.type1 + "'";
					document.getElementById( 'poketype2'   ).innerHTML = res.type2;
					document.getElementById( 'pokespecies' ).innerHTML = "'" + res.species + "'";

					let typewriter = document.getElementById('typewriter');
				    fixTypewriter(typewriter);
				}
			};

			xhttp.open( 'GET', 'pokefinder.php?name=' + command, true );
			xhttp.send();
		}

	return false
});



