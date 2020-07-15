
// TODO 
// Ajouter une action par chaque icon dans le tableau
// Envoyer les requete au serveur node  à partir d'une fonction en utilisant fetch.
// 


const images = [{
        'setAction': 'moteur_AvGauche',
        'default': 'hautGauche.png',
        'hover': 'hautGaucheCl.png'
    },
    {
        'setAction': 'moteur_Avancer',
        'default': 'avancer.png',
        'hover': 'avancerCl.png'
    },
    {
        'setAction': 'moteur_AvDroite',
        'default': 'hautDroite.png',
        'hover': 'hautDroiteCl.png'
    },
    {
        'setAction': 'moteur_Gauche',
        'default': 'gauche.png',
        'hover': 'gaucheCl.png'
    },
    {
        'setAction': 'moteur_Stop',
        'default': 'centrer.png',
        'hover': 'centrerCl.png'
    },
    {
        'setAction': 'moteur_Droite',
        'default': 'droite.png',
        'hover': 'droiteCl.png'
    },
    {
        'setAction': 'moteur_ArGauche',
        'default': 'basGauche.png',
        'hover': 'basGaucheCl.png'
    },
    {
        'setAction': 'moteur_Reculer',
        'default': 'reculer.png',
        'hover': 'reculerCl.png'
    },
    {
        'setAction': 'moteur_ArDroite',
        'default': 'basDroite.png',
        'hover': 'basDroiteCl.png'
    },
    {
        'setAction': 'camera_Haut',
        'default': 'avancer.png',
        'hover': 'avancerCl.png'
    },
    {
        'setAction': 'camera_Gauche',
        'default': 'gauche.png',
        'hover': 'gaucheCl.png'
    },
    {
        'setAction': 'camera_Centre',
        'default': 'centrer.png',
        'hover': 'centrerCl.png'
    },
    {
        'setAction': 'camera_Droite',
        'default': 'droite.png',
        'hover': 'droiteCl.png'
    },
    {
        'setAction': 'camera_Bas',
        'default': 'reculer.png',
        'hover': 'reculerCl.png'
    },
    {
        'setAction': 'camera_Scan-X',
        'default': 'scanX.png',
        'hover': 'scanXCl.png'
    },
    {
        'setAction': 'camera_Scan-Y',
        'default': 'scanY.png',
        'hover': 'scanYCl.png'
    },
];

let icons = document.querySelectorAll('.icon');
const dataServer = document.querySelector('.terminal');
const path = "assets/images/";

icons.forEach(icon => {
    icon.addEventListener('mousedown', event => {
        // Récupère la valeur de l'attribut action du bouton de commande
        // lorsque l'utilisateur appuie sur le bouton gauche de la souris.
        let action = icon.getAttribute('action');
        // Parcours le tableau recupere l'action etr change l'image sur l'évenement down et up.
        images.forEach(element => {
            if (element.setAction == action) {
                // console.log(element.setAction + '  ' + action + '  ' + element.hover);
                icon.setAttribute('src', path + element.hover);
                requestGetToServer(element.setAction);
            }
        });
    });

    icon.addEventListener('mouseup', event => {
        // Récupère la valeur de l'attribut action du bouton de commande
        // lorsque l'utilisateur relache le bouton gauche de la souris.
        let action = icon.getAttribute('action');
        // Parcours le tableau recupere l'action etr change l'image sur l'évenement down et up.
        images.forEach(element => {
            if (element.setAction == action) {
                // console.log(element.setAction + '  ' + action + '  ' + element.default);
                icon.setAttribute('src', path + element.default);
            }
        });
    });
});

// ENVOIE LA REQUETE VERS LE SERVEUR DISTANT
const requestGetToServer = (action) => {
    fetch('http://localhost:3000/'+action, {
            method: "GET",
        })
        .then(res => res.json())
        .then(returnData => {
            if (returnData) {
                // traitement de la réponse
               console.log(returnData);
               dataServer.innerHTML = `${returnData}`;
            } else {
                console.log("Erreur du serveur !");
            }
        })
        .catch((error) => {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
}

// ENVOIE LA REQUETE VERS LE SERVEUR DISTANT
const requestToServer = (command, action, data) => {
    fetch('http://localhost:3000/'+action, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(returnData => {
            if (returnData) {
                // traitement de la réponse
                executeWork(command, returnData);
            } else {
                $txtResult.value = "Erreur du serveur !";
            }
        })
        .catch((error) => {
            $txtResult.value = 'Il y a eu un problème avec l\'opération fetch: ' + error.message;
        });
}
