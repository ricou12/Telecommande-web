//  FRAMEWORK STANDARD POUR LE DEVELOPPEMENT DE SERVEUR EN NODE.JS
// https://www.npmjs.com/package/express || http://expressjs.com/
const express = require('express');
const app = express();
var port = 3000;

// LIBRAIRIE POUR COMMUNIQUER PORT SERIE (Node SerialPort)
// https://serialport.io/
let SerialPort = require("serialport");
const arduinoCOMPort = "COM5";
let infoSerailPort = "";
let dataSerial ='';

// INITIALISE LA COMMUNICATION 
let arduinoSerialPort = new SerialPort(arduinoCOMPort, {
    baudRate: 9600,
});

// PARAMETRAGE DES DONNEES RECUES VIA LE PORT SERIE (delimiter :Longueur de la chaine \n saut de ligne, \r retour chariot)  
const Readline = require('@serialport/parser-readline');
const parser = arduinoSerialPort.pipe(new Readline({ delimiter: '\n' }));
const parser1 = arduinoSerialPort.pipe(new Readline({ delimiter: '\n' }));

// AFFICHE LES DONNEES RECU VIA LE PORT SERIE
parser.on('data', data =>{
    infoSerailPort = data;
    console.log('Arduino émission de données : ', data);
});

// OUVERTURE DU PORT SERIE  
arduinoSerialPort.on('open', function () {
    infoSerailPort ='Le port serie ' + arduinoCOMPort + ' est ouvert.';
    console.log(infoSerailPort);
});

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
    // return res.sendFile(__dirname+'/index.html');
})

// DEFINIT L'ACTION A REALISER ET ENVOIE DE LA COMMANDE VIA LE PORT SERIE (WRITE)
app.get('/:action', function (req, res) {
    // Caméra : CamUp, CamDown, CamLeft, CamCenter, CamRight, CamScanX, CamScanY
    // Déplacement du véhicule : MotorsStop, MotorsForward, MotorsBackward, MotorsLeft, MotorsFrontLeft, MotorsBackLeft, MotorsRight, MotorsFrontRight, MotorsBackRight
    message = '';
    var action = req.params.action || req.param('action');

    if (action == 'camera_Haut') {
        arduinoSerialPort.write("CamUp");
        message = "Regarde en haut";
    }
    if (action == 'camera_Bas') {
        arduinoSerialPort.write("CamDown");
        message = "Regarde en bas";
    }
    if (action == 'camera_Gauche') {
        arduinoSerialPort.write("CamLeft");
        message = "Regarde à gauche";
    }
    if (action == 'camera_Centre') {
        arduinoSerialPort.write("CamCenter");
        message = "Centrage de la caméra";
    }
    if (action == 'camera_Droite') {
        arduinoSerialPort.write("CamRight");
        message = "Regarde à droite";
    }
    if (action == 'camera_Scan-X') {
        arduinoSerialPort.write("CamScanX");
        message = "Regarde de gauche à droite";
    }
    if (action == 'camera_Scan-Y') {
        arduinoSerialPort.write("CamScanY");
        message = "Regarde de haut en bas";
    }
    if (action == 'moteur_Stop') {
        arduinoSerialPort.write("MotorsStop");
        message = "Arrêt du véhicule";
    }
    if (action == 'moteur_Avancer') {
        arduinoSerialPort.write("MotorsForward");
        message = "Déplacement vers l'avant";
    }
    if (action == 'moteur_Reculer') {
        arduinoSerialPort.write("MotorsBackward");
        message = "Déplacement marche arrière";
    }
    if (action == 'moteur_Gauche') {
        arduinoSerialPort.write("MotorsLeft");
        message = "Déplacement à gauche";
    }
    if (action == 'moteur_AvGauche') {
        arduinoSerialPort.write("MotorsFrontLeft");
        message = "Déplacement avant gauche";
    }
    if (action == 'moteur_ArGauche') {
        arduinoSerialPort.write("MotorsBackLeft");
        message = "Déplacement arrière gauche";
    }
    if (action == 'moteur_Droite') {
        arduinoSerialPort.write("MotorsRight");
        message = "Déplacement à droite";
    }
    if (action == 'moteur_AvDroite') {
        arduinoSerialPort.write("MotorsFrontRight");
        message = "Déplacement avant droite";
    }
    if (action == 'moteur_ArDroite') {
        arduinoSerialPort.write("MotorsBackRight");
        message = "Déplacement arrière droite";
    }

    return res.json(message);
    // RETOURNE LE MESSAGE RENVOYE PAR ARDUINO VIA LE PORT SERIE
});

// app.post('/camera',function (req, res){
//     let action = req.body
// })

