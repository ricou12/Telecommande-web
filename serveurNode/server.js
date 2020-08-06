// Tester le serveur HTTP
// node server.js

/* *******************************************************************
  FRAMEWORK STANDARD POUR LE DEVELOPPEMENT DE SERVEUR EN NODE.JS
******************************************************************* */
// https://www.npmjs.com/package/express || http://expressjs.com/
const express = require('express');
const app = express();
var port = 3000;

/* *******************************************************************
                            SOCKET.IO
******************************************************************* */
// Chargement de socket.io
// let io = require('socket.io').listen(app);

// Quand un client se connecte, on le note dans la console
// io.sockets.on('connection', function (socket) {
//     console.log('Un client est connecté !');

// });

// io.sockets.on('connection', function (socket) {
//     socket.emit('message', 'Vous êtes bien connecté !');
// });


/* *******************************************************************
                            SERIAL PORT
******************************************************************* */
// LIBRAIRIE POUR COMMUNIQUER PORT SERIE (Node SerialPort)
// https://serialport.io/
let SerialPort = require("serialport");
const arduinoCOMPort = "COM5";
let infoSerailPort = "";

// INITIALISE LA COMMUNICATION 
let arduinoSerialPort = new SerialPort(arduinoCOMPort, {
    baudRate: 9600,
});

// PARAMETRAGE DES DONNEES RECUES VIA LE PORT SERIE (delimiter :Longueur de la chaine \n saut de ligne, \r retour chariot)  
const Readline = require('@serialport/parser-readline');
const parser = arduinoSerialPort.pipe(new Readline({
    delimiter: '\n'
}));

// AFFICHE LES DONNEES RECU VIA LE PORT SERIE
parser.on('data', data => {
    infoSerailPort = data;
    console.log('Arduino émission de données : ', data);
    // socket.emit('Arduino émission de données : ', data); //
});


// OUVERTURE DU PORT SERIE  
arduinoSerialPort.on('open', function () {
    infoSerailPort = 'Le port serie ' + arduinoCOMPort + ' est ouvert.';
    console.log(infoSerailPort);
});

/* *******************************************************************
                            SERVER
******************************************************************* */
// DESACTIVATION DU PROTOCOLE CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.listen(port, function () {
    console.log('ROBOT POWER,URL pour l\'interface de commande http://localhost:' + port + ' !');
});

// REQUETE 
app.get('/', function (req, res) {
    return res.send('<h2>Bienvenue !</h2>');
    // return res.sendFile(__dirname +'/index.html');
})

// DEFINIT L'ACTION A REALISER ET ENVOIE DE LA COMMANDE VIA LE PORT SERIE (WRITE)
app.get('/:action', function (req, res) {
    // Caméra : CamUp, CamDown, CamLeft, CamCenter, CamRight, CamScanX, CamScanY
    // Déplacement du véhicule : MotorsStop, MotorsForward, MotorsBackward, MotorsLeft, MotorsFrontLeft, MotorsBackLeft, MotorsRight, MotorsFrontRight, MotorsBackRight
    message = '';
    var action = req.params.action || req.param('action');

    switch (action) {
        case 'camera_Haut':
            arduinoSerialPort.write("CamUp");
            message = "Regarde en haut";
            break;

        case 'camera_Bas':
            arduinoSerialPort.write("CamDown");
            message = "Regarde en bas";
            break;

        case 'camera_Gauche':
            arduinoSerialPort.write("CamLeft");
            message = "Regarde à gauche";
            break;

        case 'camera_Centre':
            arduinoSerialPort.write("CamCenter");
            message = "Centrage de la caméra";
            break;

        case 'camera_Droite':
            arduinoSerialPort.write("CamRight");
            message = "Regarde à droite";
            break;

        case 'camera_Scan-X':
            arduinoSerialPort.write("CamScanX");
            message = "Regarde de gauche à droite";
            break;

        case 'camera_Scan-Y':
            arduinoSerialPort.write("CamScanY");
            message = "Regarde de haut en bas";
            break;

        case 'moteur_Stop':
            arduinoSerialPort.write("MotorsStop");
            message = "Arrêt du véhicule";
            break;

        case 'moteur_Avancer':
            arduinoSerialPort.write("MotorsForward");
            message = "Déplacement vers l'avant";
            break;

        case 'moteur_Reculer':
            arduinoSerialPort.write("MotorsBackward");
            message = "Déplacement marche arrière";
            break;

        case 'moteur_Gauche':
            arduinoSerialPort.write("MotorsLeft");
            message = "Déplacement à gauche";
            break;

        case 'moteur_AvGauche':
            arduinoSerialPort.write("MotorsFrontLeft");
            message = "Déplacement avant gauche";
            break;

        case 'moteur_Droite':
            arduinoSerialPort.write("MotorsRight");
            message = "Déplacement à droite";
            break;

        case 'moteur_ArGauche':
            arduinoSerialPort.write("MotorsBackLeft");
            message = "Déplacement arrière gauche";
            break;

        case 'moteur_AvDroite':
            arduinoSerialPort.write("MotorsFrontRight");
            message = "Déplacement avant droite";
            break;

        case 'moteur_ArDroite':
            arduinoSerialPort.write("MotorsBackRight");
            message = "Déplacement arrière droite";
            break;

        default:
            console.log(`Désolé cette action n'est pas reconnue : ${action}.`);
    }

    // RETOURNE LE MESSAGE RENVOYE PAR ARDUINO VIA LE PORT SERIE
    return res.json(message);

});
