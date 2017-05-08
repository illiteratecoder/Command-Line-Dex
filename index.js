var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();

// Change path for php so it works on heroku and locally.
var phpPath = 'php';
if (process.env.PWD === '/app') {
	phpPath = '.heroku/php/bin/php';
}
var phpExpress = require('php-express')({
	binPath: phpPath
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

// Set public folders.
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
app.use('/models', express.static(path.join(__dirname, 'dist/images/models')));
app.use('/images', express.static(path.join(__dirname, 'dist/images')));

// views is directory for all template files
// app.set('views', path.join(__dirname, '/views'));
// app.engine('php', phpExpress.engine);
// app.set('view engine', 'php');

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

//Home Page Route
router.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/', router);

// Route for handling PDF generation!
// router.get('/b', function(req, res, next){
// 	var name = req.param('name');
// 	res.render('pokefinder', {name: name});
// });
// router.get('/b', function(req, res) {
//     res.send(path.join(__dirname, '/backend/pokefinder.php'));
// });

// pdfGen.start_count();

//Route for calling PDF Count!
// app.get('/pdfcount', function(request, response){
//   response.sendFile(path.join(__dirname, '/backend/count.txt'));
// });


//If no other express route captures path, return a 404 page
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});






















