var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');
var port = process.env.PORT || 3000;

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/notifications', (req, res) => {
    const datetime = new Date();
    fs.writeFileSync('./data/notifications/' + datetime.toISOString() + '.json', JSON.stringify(req.body || 'Body vacío'));
    res.status(201);
});

app.listen(port);