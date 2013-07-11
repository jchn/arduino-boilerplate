window.onload = function () {
	// ip here
	var socket = io.connect('localhost:8090/');

	socket.on('connect', function () {
		console.log('connected!');
		socket.on('data', function (data) {

			console.log("recieved: " + data);

		});
	});

};
