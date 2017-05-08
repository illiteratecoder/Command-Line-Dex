/* global setupTypewriter */

"use strict";

// Creates an element for the typewriter effect

function createTemplate(string) {
	var err = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


	var start = '<pre data-target="copy" data-opt="append">',
	    end = '\n</pre>',
	    middle = void 0;

	if (err === 404) {
		middle = '<span class="err-highlight">404: \'' + string + '\' was not found </span>';
	} else if (err) {
		middle = '<span class="err-highlight">Uncaught TypeError: newPokemon.' + string + '() is not a function</span>';
	} else {
		middle = 'newPokemon.<span class="var-highlight">' + string + '</span>();';
	}

	var element = start + middle + end,
	    newTemplate = document.createElement("template");

	newTemplate.innerHTML = element;

	return newTemplate.content.firstChild;
}

// Sets up the typewriter and starts the type animation
function fixTypewriter(content) {

	var typewriter = setupTypewriter(content);
	typewriter.type();

	return false;
}

var n = null; // number of the current Pokemon displayed

// Run when command line input value changes (hits return or clicks off)
document.querySelector('[name="command"]').addEventListener('change', function () {

	this.setAttribute("disabled", true); // disable input until type animation is finished
	var command = this.value,
	    // the input
	$model = document.getElementById('model'); // the animated model element

	// Outputs appropriate img src for command based on what image is currently displayed
	function cmdCtrl(cmd) {

		// Regex to get suffixs of mega, alola, and shiny
		// >> http://site.com/models/9-mega-shiny.gif
		// >> [models/3-mega-shiny.gif, mega, shiny]
		var re = /(?:models\/)(?:\d{1,3})(?:\-{1}(mega|alola|attack|hat))?(?:\-{1}(shiny))?(?:\.gif)/,
		    regExp = re.exec($model.src),
		    src = "models/" + n;

		if (cmd === 'mega' || cmd === 'alola' || cmd === 'attack' || cmd === 'hat') {
			if (regExp[1] === undefined || regExp[1] !== cmd) {
				src += "-" + cmd;

				if (cmd === 'mega' || cmd === 'alola') {
					if (regExp[2] !== undefined) {
						src += "-" + regExp[2]; // if pokemon is already shiny, keep it shiny
					}
				}
			} else if (regExp[1] === cmd) {
				if (regExp[2] !== undefined) {
					src += "-" + regExp[2]; // if pokemon is already shiny, keep it shiny
				}
			}
		} else if (cmd === 'shiny') {
			if (regExp[1] === undefined) {
				if (regExp[2] === undefined) {
					src += "-" + cmd;
				}
			} else if (regExp[1] === 'attack' || regExp[1] === 'hat') {
				src += "-" + cmd;
			} else if (regExp[1] === 'mega' || regExp[1] === 'alola') {
				src += "-" + regExp[1]; // if pokemon is already mega or alolan, keep it that way

				if (regExp[2] === undefined) {
					src += "-" + cmd;
				}
			}
		}

		src += ".gif";

		if (cmd !== 'relax') {
			var xhttp = new XMLHttpRequest();

			// Check if image file exists
			xhttp.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					$model.src = src;

					var content = createTemplate(cmd);
					fixTypewriter(content);
				} else if (this.readyState === 4 && this.status !== 200) {
					var _content = createTemplate(cmd, true);
					fixTypewriter(_content);
				}
			};

			xhttp.open('GET', src, true);
			xhttp.send();
		} else {
			$model.src = src;

			var content = createTemplate(cmd);
			fixTypewriter(content);
		}
		return false;
	}

	// Prevent function from running again after value is reset
	if (this.value === '') {
		return false;
	}

	// Reset command line
	this.value = '';
	this.blur();

	// Attack command
	if (command === 'attack') {
		cmdCtrl('attack');
	}

	// Shiny command
	else if (command === 'shiny') {
			cmdCtrl('shiny');
		}

		// Mega command
		else if (command === 'mega') {
				cmdCtrl('mega');
			}

			// Alola command
			else if (command === 'alola') {
					cmdCtrl('alola');
				}

				// Hat command (for pikachu)
				else if (command === 'hat') {
						cmdCtrl('hat');
					}

					// Relax command
					else if (command === 'relax') {
							cmdCtrl('relax');
						}

						// Pokemon command
						else {
								var xhttp = new XMLHttpRequest();

								xhttp.onreadystatechange = function () {
									if (this.readyState === 4 && this.status === 200) {
										var res = JSON.parse(this.responseText);

										if (res === null) {
											var content = createTemplate(command, 404);
											fixTypewriter(content);

											return false;
										} else if (res.id === n) {
											document.querySelector('[name="command"]').removeAttribute('disabled');
											document.querySelector('[name="command"]').focus();
											return false;
										}

										$model.src = "images/ball-shake.gif"; // image before pokemon is displayed
										n = res.id;

										if (!res.type2) {
											res.type2 = "null";
											document.getElementById('poketype2').className = "int-highlight";
										} else {
											res.type2 = "'" + res.type2 + "'";
											document.getElementById('poketype2').className = "string-highlight";
										}

										$model.classList.remove("grow");

										setTimeout(function () {
											$model.onload = function () {
												if ($model.src.substr($model.src.length - 14) !== 'ball-shake.gif') {
													if (command !== 'mega' || command !== 'attack' || command !== 'alola' || command !== 'shiny' || command !== 'hat' || command !== 'relax') {
														$model.classList.add("grow");
													}
												}
											};
											$model.src = "models/" + res.id + ".gif";
											// $model.classList.add("grow");
										}, 1600);

										document.getElementById('name').innerHTML = res.name;
										document.getElementById('number').innerHTML = '#' + res.id;
										document.getElementById('pokename').innerHTML = "'" + res.name + "'";
										document.getElementById('pokenum').innerHTML = res.id;
										document.getElementById('poketype1').innerHTML = "'" + res.type1 + "'";
										document.getElementById('poketype2').innerHTML = res.type2;
										document.getElementById('pokespecies').innerHTML = "'" + res.species + "'";

										var typewriter = document.getElementById('typewriter');
										fixTypewriter(typewriter);
									}
								};

								xhttp.open('GET', 'pokefinder.php?name=' + command, true);
								xhttp.send();
							}

	return false;
});

; /* globals skel */

(function () {

	"use strict";

	// Methods/polyfills.

	// addEventsListener

	var addEventsListener = function addEventsListener(o, t, e) {
		var n,
		    i = t.split(" ");for (n in i) {
			o.addEventListener(i[n], e);
		}
	};

	// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
	!function () {
		function t(t) {
			this.el = t;for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++) {
				e.call(this, n[i]);
			}
		}function n(t, n, i) {
			Object.defineProperty ? Object.defineProperty(t, n, { get: i }) : t.__defineGetter__(n, i);
		}if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
			var i = Array.prototype,
			    e = i.push,
			    s = i.splice,
			    o = i.join;t.prototype = { add: function add(t) {
					this.contains(t) || (e.call(this, t), this.el.className = this.toString());
				}, contains: function contains(t) {
					return -1 != this.el.className.indexOf(t);
				}, item: function item(t) {
					return this[t] || null;
				}, remove: function remove(t) {
					if (this.contains(t)) {
						for (var n = 0; n < this.length && this[n] != t; n++) {}s.call(this, n, 1), this.el.className = this.toString();
					}
				}, toString: function toString() {
					return o.call(this, " ");
				}, toggle: function toggle(t) {
					return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t);
				} }, window.DOMTokenList = t, n(Element.prototype, "classList", function () {
				return new t(this);
			});
		}
	}();

	// Vars.
	var $body = document.querySelector('body');

	// Breakpoints.
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	// Disable animations/transitions until everything's loaded.
	$body.classList.add('is-loading');

	window.addEventListener('load', function () {
		$body.classList.remove('is-loading');
	});

	// Nav.
	var $nav = document.querySelector('#nav'),
	    $navToggle = document.querySelector('a[href="#nav"]'),
	    $navClose;

	// Event: Prevent clicks/taps inside the nav from bubbling.
	addEventsListener($nav, 'click touchend', function (event) {
		event.stopPropagation();
	});

	// Event: Hide nav on body click/tap.
	addEventsListener($body, 'click touchend', function () {
		$nav.classList.remove('visible');
	});

	// Toggle.

	// Event: Toggle nav on click.
	$navToggle.addEventListener('click', function (event) {

		event.preventDefault();
		event.stopPropagation();

		$nav.classList.toggle('visible');
	});

	// Close.

	// Create element.
	$navClose = document.createElement('a');
	$navClose.href = '#';
	$navClose.className = 'close';
	$navClose.tabIndex = 0;
	$nav.appendChild($navClose);

	// Event: Hide on ESC.
	window.addEventListener('keydown', function (event) {

		if (event.keyCode == 27) $nav.classList.remove('visible');
	});

	// Event: Hide nav on click.
	$navClose.addEventListener('click', function (event) {

		event.preventDefault();
		event.stopPropagation();

		$nav.classList.remove('visible');
	});
})();

;'use strict';

var img = new Image();
img.src = 'images/ball-shake.gif';; /* exported setupTypewriter, $status */

function setupTypewriter(t) {
	'use strict';

	var location = t.getAttribute('data-target');
	location = document.getElementById(location);
	var HTML = t.innerHTML;
	if (t.getAttribute('data-opt') === "replace") {
		location.innerHTML = "";
	}
	var cursorPosition = 0,
	    tag = "",
	    writingTag = false,
	    tagOpen = false,
	    typeSpeed = 50,
	    tempTypeSpeed = 0;

	var type = function type() {
		if (writingTag === true) {

			tag += HTML[cursorPosition];
		}

		if (HTML[cursorPosition] === "<") {
			tempTypeSpeed = 0;
			if (tagOpen) {
				tagOpen = false;
				writingTag = true;
			} else {
				tag = "";
				tagOpen = true;
				writingTag = true;
				tag += HTML[cursorPosition];
			}
		}

		if (!writingTag && tagOpen) {

			tag.innerHTML += HTML[cursorPosition];
		}
		if (!writingTag && !tagOpen) {
			if (HTML[cursorPosition] === " ") {
				tempTypeSpeed = 0;
			} else {
				tempTypeSpeed = Math.random() * typeSpeed + 25;
			}
			location.innerHTML += HTML[cursorPosition];
		}
		if (writingTag === true && HTML[cursorPosition] === ">") {
			tempTypeSpeed = Math.random() * typeSpeed + 25;
			writingTag = false;
			if (tagOpen) {
				var newTemplate = document.createElement("template");
				newTemplate.innerHTML = tag;
				var newSpan = newTemplate.content.firstChild;
				location.appendChild(newSpan);
				tag = newSpan;
			}
		}
		location.scrollTop = location.scrollHeight;
		cursorPosition += 1;

		if (cursorPosition < HTML.length) {
			setTimeout(type, tempTypeSpeed);
		} else {
			document.querySelector('[name="command"]').removeAttribute('disabled');
			document.querySelector('[name="command"]').focus();
		}
	};

	return { type: type };
}
