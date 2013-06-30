var users = [];
users[1086250591] = "John";

var sessionActive = false;
var isRegistering = false;
var timeOut;
var registerTimeout;
var lastReadId = 0;
var currentUser = "";

window.onload = function () {
	// ip here
	var socket = io.connect('http://192.168.192.7:8090/');

	//var currentUser = 0;

	socket.on('connect', function () {
		console.log('connected!');
		socket.on('data', function (data) {
			var id = parseFloat(data);
			lastReadId = id;
			//console.log(id);

			//New user logged in, check if he's already a user
			//console.log( users[id] !== undefined );

			if(isRegistering) {
				clearTimeout(registerTimeout);
				registerTimeout = setTimeout(function(){
					console.log("cancel register");
					$("#myModal").modal('hide');
					isRegistering = false;
				}, 1500);
			}

			if(!isRegistering) {
				if( users[id] !== undefined && !sessionActive ) {
					//User already exists
					console.log("users is present");
					sessionActive = true;

					console.log("start session");

					currentUser = users[id];

					login();

					timeOut = setTimeout(function(){
						console.log("logout user");
						sessionActive = false;
						logout();
					}, 1500);
				}

				if( users[id] == undefined ) {
					//New user
					isRegistering = true;

					$("#myModal").modal('show');

					registerTimeout = setTimeout(function(){
						console.log("cancel register");
						$("#myModal").modal('hide');
						isRegistering = false;
					}, 1500);
				}

				if( users[id] !== undefined && sessionActive  ) {
					console.log("session active and user known");
					clearTimeout( timeOut );

					timeOut = setTimeout(function(){
						logout();
						//sessionActive = false;
					}, 1500);
				}
			}

		});
	});

};

function addUser() {
	users[lastReadId] = $('input.username').val();
	$('input.username').val('');
	isRegistering = false;
}

function logout() {
	console.log("logout");
	sessionActive = false;

	$('span.name').text('');
	$('textarea.comment').text('');

	currentUser = "";
}

function login() {
	sessionActive = true;
	console.log($('span.name'));
	$('span.name').text(currentUser);
}

function addComment() {
	if(!sessionActive) return false;

	var comment = $('<div class="span12"><h3>' + currentUser + '</h3><p>' + $('textarea.comment').val() + '</p></div>');
	$('textarea.comment').val('');

	$('.comments').append(comment);
}

$('.btn.add').click(addComment);

$('.btn.user').click(addUser);

$('div').on('test', function( e, id ){

	var userId = id.toString();


	console.log( "hi" + userId );
	console.log( users );
});
