/* eslint-env node */
/* eslint no-console: "off" */

var path = require('path'),
	express = require('express'),
	app = express(),
	router = express.Router(),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon');

// Change path for php so it works on heroku and locally.
var phpPath = 'php';
if (process.env.PWD === '/app') {
	phpPath = '.heroku/php/bin/php';
}
var phpExpress = require('php-express')({
	binPath: phpPath
});

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

// Set public folders.
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/models', express.static(path.join(__dirname, 'images/models')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(favicon(path.join(__dirname, 'images/favicon.ico')));

// Views is the directory for all template files.
app.set('views', path.join(__dirname, 'php'));
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// Route all .php files to php-express.
app.all(/.+\.php$/, phpExpress.router);

// Set home page.
router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Send all requests to router.
app.use('/', router);


// If no other express route captures a path, return a 404 page.
app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, '404.html'))
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});