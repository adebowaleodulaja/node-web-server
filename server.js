const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');//Setting up Partials whic allow us to have reusable template across our website.
app.set('view engine', 'hbs');//Setting up the view engine we want to use. Could be .html, hbs etc
//Using a midleware .use to serve static pages
app.use(express.static(__dirname + '/public'));

//Custom middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', `${log}` + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log!')
		}
	});

	console.log(log);
	next();//If this is not called, the app will never proceed with execution.
});

// app.use((req, res, next) => {
// 		res.render('maintenance.hbs');
// });

//Handlebars helpers is a function used for dynamically creating output.
//First argument is name of the argument and the second is the function to run.
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('loundIt', (text) => {
	return text.toUpperCase();
});

//app.get() Takes two arguments, 1. URL and callback function of request & response
app.get('/', (req, res) => {
	//res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name: 'Adebowale',
	// 	likes: [
	// 		'Swiming', 'Reading', 'Football'
	// 	]
	// });

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Home page'
	});
});

app.get('/aboutPage', (req, res) => {
	//res.send('<h2>About Page</h2>')
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to process your request /bad'
	});
});

var portNumber = 3000;

app.listen(portNumber, () => {
	console.log('Server is listening on port ' +portNumber);
});