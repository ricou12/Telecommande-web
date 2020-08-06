
const dataSerialPort = document.getElementById('dataSerialPort');

let socket = io.connect('http://localhost:3000');

socket.on('message', function(message) {
    // alert('Le serveur a un message pour vous : ' + message);
    dataSerialPort.innerHTML += message;
});