window.onload = function () {
	// ip here
	var socket = io.connect('http://192.168.192.7:8090/');

	socket.on('connect', function () {
		console.log('connected!');
		socket.on('data', function (data) {

			console.log("recieved: " + data);

		});
	});

};
