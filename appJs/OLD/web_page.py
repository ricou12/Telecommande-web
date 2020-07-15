#!/usr/bin/env python

# ------ IMPORT LE MODULE POUR LA COMMUNICATION SERIE ENTRE RASPBERRY ET ARDUINO ------
import serial
# ------ IMPORT LE MODULE web.py ------
import web


# ------ INITIALISE LA COMMUNICATION SERIE ------
ser = serial.Serial('/dev/ttyACM0', 9600)



# ------ DEFINIT LA CLASSE DE NOM 'index' POUR LE SITE WEB ------
urls = ('/public_html','index')

# ------ DOSSIER HTML QUI CONTIENT LA PAGE WEB LIE A L'APPLICATION PYTHON ------
dossier_web = web.template.render('public_html/')
app = web.application(urls, globals())



# DEFINIT L'ACTION A EFFECTUER QUAND LA PAGE INDEX EST APPELE
class index:
	# ------ UTILISE QUAND LA PAGE EST DEMANDE ------
	def GET(self):
		return dossier_web.index()
		print('get')

	# ------ TRAITE UNE REQUETE AJAX ------
	def POST(self):
		userdata = web.input()
		if hasattr(userdata,'action'):
			if userdata.action == 'haut':
				#print('haut')
				ser.write('1')
			if userdata.action == 'bas':
				#print('bas')
				ser.write('2')
			if userdata.action == 'gauche':
				#print('Gauche')
				ser.write('3')
			if userdata.action == 'centre':
				#print('Centrer')
				ser.write('4')
			if userdata.action == 'droite':
				#print('Droite')
				ser.write('5')
			if userdata.action == 'scan_h':
				#print('ScanH')
				ser.write('6')
			if userdata.action == 'scan_v':
				#print('ScanV')
				ser.write('7')
			if userdata.action == 'moteurStop':
				#print('Stop')
				ser.write('10')
			if userdata.action == 'moteurAvancer':
				#print('Avancer')
				ser.write('11')
			if userdata.action == 'moteurAvancer':
				#print('Avancer')
				ser.write('11')
			if userdata.action == 'moteurReculer':
				#print('Reculer')
				ser.write('12')
			if userdata.action == 'moteurGauche':
				#print('Aller a gauche')
				ser.write('13')
			if userdata.action == 'moteurAvGauche':
				#print('Aller avant gauche')
				ser.write('14')
			if userdata.action == 'moteurArGauche':
				#print('aller arriere gauche')
				ser.write('15')
			if userdata.action == 'moteurDroite':
				#print('aller a droite')
				ser.write('16')
			if userdata.action == 'moteurAvDroite':
				#print('ScanV')
				ser.write('17')
			if userdata.action == 'moteurArDroite':
				#print('ScanV')
				ser.write('18')


if __name__ == "__main__":
	app.run()

