var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


// connect to database
var dbUrl = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : 'mongodb://localhost:27017/anotode'
mongoose.Promise = global.Promise
mongoose.connect(dbUrl)
  .then(() => console.log('Connection successful'))
.catch((err) => console.log(err))

//var routes = require('./app/routes/index');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));



app.use(express.static(__dirname + '/public'));

//var api = require('./app/routes/api')(app, express, io);
//app.use('/api', api);
//app.use('/', routes);

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/app/index.html');
});

http.listen(config.port, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("Listening on port 3000");
	}
});
