var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort('/dev/ttyACM0');	// Change port accordingly

app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.get('/', function(req, res){
    res.render('index.html');
});

serialPort.on("open", function(){


	io.sockets.on('connection', function (socket) {

		var buffer = new Buffer(0);
		
		serialPort.on('data', function (data) {

			buffer = Buffer.concat( [buffer, data] );
			
			if( buffer.toString().match(/\n/) ) {
				console.log( "length " + buffer.length );
				socket.broadcast.emit('data', buffer.toString());
				console.log( buffer.toString() );
				buffer = new Buffer(0);
			}
			

		});
		
	});

});

server.listen(8090);

console.log("Listening to port 8090");
