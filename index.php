<!DOCTYPE HTML>
<!-- skel-baseline v3.0.1 | (c) n33 | skel.io | MIT licensed -->
<html>
	<head>
		<title>Baseline</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="assets/css/main.css" />
	</head>
	<body id="top" style="">

		<!-- Header -->
			<header id="header">
				<h1><a href="#">Baseline</a></h1>
				<a href="#">Login</a>
				<a href="#nav">Menu</a>
			</header>

		<!-- Nav -->
			<nav id="nav">
				<ul class="links">
					<li><a href="#top">Top</a></li>
					<li><a href="#content">Content</a></li>
					<li><a href="#elements">Elements</a></li>
					<li><a href="#grid">Grid System</a></li>
				</ul>
				<ul class="actions vertical">
					<li><a href="http://skel.io" class="button special fit">Download</a></li>
					<li><a href="http://skel.io" class="button fit">Documentation</a></li>
				</ul>
			</nav>

		<!-- Main -->
			<div id="main" class="container">
				<div id="dex" class="row uniform">
					<div id="me" class="6u">
						<pre id="typewriter" data-target="copy" data-opt="append" style="display: none;">
<span class="var-highlight">var</span> newPokemon = {
    name: <span id="pokename" class="string-highlight">'Bulbasaur'</span>,
    number: <span class="int-highlight">1</span>,
    type: [<span class="string-highlight">'Grass'</span>, <span class="string-highlight">'Poison'</span>],
    species: <span class="string-highlight">'Seed Pokemon'</span>
};
</pre>
						<pre id="copy" class='target' style="height: 150px; overflow: auto;"></pre>
					</div>
					<div class="6u$ row uniform">
						<div class="3u 2u(xsmall) -2u(xsmall)">
							<label for="command">Command: </label>
						</div>
						<div class="9u$ 5u$(xsmall)">
							<input type="text" name="command" />
						</div>

						<div class="12u$">
							<span id="name" class="float-left">Bulbasaur</span>
							<span id="number" class="float-right">#1</span>
						</div>
						<div class="12u$ align-center">
							<div id="model-wrapper">
								<img id="model" src="models/1.gif" />
							</div>
						</div>
					</div>
				</div>
			</div>

		<!-- Scripts -->
			<script src="assets/js/skel.min.js"></script>
			<script src="assets/js/main.js"></script>
			<script src="assets/js/typewriter.js"></script>
			<script src="assets/js/command_line.js"></script>


	</body>
</html>