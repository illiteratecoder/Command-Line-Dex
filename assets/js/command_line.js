/* Dex command controller */

"use strict";

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    let list = preloadImages.list;
    for (let i = 0; i < array.length; i++) {
        let img = new Image();
        img.onload = function() {
            let index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

let $imgArray = [];

for (let i = 1; i<16; i++){
	$imgArray.push("models/" + i + ".gif")
}

preloadImages($imgArray);

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
        newTemplate.innerHTML = '<pre data-target="copy" data-opt="append">newPokemon.<span class="var-highlight">attack</span>();\n</pre>';
		let typewriter = setupTypewriter(newTemplate.content.firstChild);
		typewriter.type();
		return false
	}

	// Relax command
	else if ( $command === 'relax' ) {
		$model.src = "models/" + $n + ".gif";

		let newTemplate = document.createElement("template");
        newTemplate.innerHTML = '<pre data-target="copy" data-opt="append">newPokemon.<span class="var-highlight">relax</span>();\n</pre>';
		let typewriter = setupTypewriter(newTemplate.content.firstChild);
		typewriter.type();
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




























