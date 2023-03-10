/* global remuneration */
const fixe = 1100;
/**
 * Pour Satisfaite de les prestations lors de la création du site vitrine, il fautr concevoir une page 
spécifique contenant un simulateur de calcul à l’attention des commerciaux faisant partie de la force de vente itinérante 
(dix personnes environ) et ayant accessoirement assuré la distribution des trois modèles suivants :
 Le modèle "X-Spirit", haut de gamme est vendu au prix moyen de 350 € HT ;
 Le modèle "Multitec", qualité standard, est vendu au prix moyen de 180 € HT ;
 Le modèle "S 20", qualité standard, est vendu au prix moyen de 140 € HT.

La rémunération des représentants se calcule de la façon suivante :
 Un fixe de 1100 €, majoré de 3% à partir de 5 ans d'ancienneté ou de 6% au-delà de 10 ans ;
 Une commission de 2% sur le CA (chiffre d'affaires) HT du modèle "S 20" ;
 Une commission de 6% sur le CA HT du modèle "X-Spirit" après le 50ème casque vendu ;
 Une commission progressive sur le modèle "Multitec" :
o 4% sur le CA jusqu'au 20ème casque ;
o 6% du 21ème au 50ème ;
o 10% à partir du 51ème casque vendu.

Fonction qui retourne la prime d'ancienneté avec comme parametre
* @param {integer} nb
* @param {float} fixe
* @returns {float}
*/
function recupPrimeAnciennete(nb, fixe) {
    const nbAncienMin = 5, txAncienMin = 0.03, nbAncienSup = 10, txAncienSup = 0.06;
        if (nb >= nbAncienSup){
            return (fixe * txAncienSup);
        }
        else if (nb >= nbAncienMin) {
            return (fixe * txAncienMin);
        }
        else {
            return 0.0;
        }
} // La position des accolades ci-dessus n'est pas du tout optimale... (mise en page A4)
/**
* Fonction qui retourne la commission sur le S20
* @param {integer} nb
* @returns {float}
*/
function recupComS20(nb) {
    const prixS20 = 140.0, txComS20 = 0.02;
    return (nb * prixS20 * txComS20);
}
/**
* Fonction qui retourne la commission sur le X-Spirit
* @@param {integer} nb
* @returns {float}
*/
function recupComXS(nb) {
    const prixXS = 350.0, nbXSMinCom = 50, txComXS = 0.06;
    if (nb >= nbXSMinCom) {
    return ((nb - nbXSMinCom) * prixXS * txComXS);
    }
    else {
    return 0.0;
    }
}
/**
* Fonction qui retourne la commission sur le Multitec
* @param {integer} nb
* @returns {float}
*/
function recupComMulti(nb) {
    const prixMu = 180.0, nbMultiTranche1 = 20, nbMultiTranche2 = 50;
    const txMultiTranche1 = 0.04, txMultiTranche2 = 0.06, txMultiTranche3 = 0.1;
    if (nb <= nbMultiTranche1) {
        return (nb * prixMu * txMultiTranche1);
    }
    else if (nb <= nbMultiTranche2) {
        return ((nbMultiTranche1 * prixMu * txMultiTranche1) + ((nb - nbMultiTranche1) * prixMu * txMultiTranche2));
    }
    else {
        return ((nbMultiTranche1 * prixMu * txMultiTranche1) + ((nbMultiTranche2 - nbMultiTranche1) * prixMu * txMultiTranche2) + ((nb - nbMultiTranche2) * prixMu * txMultiTranche3));
    }
}

window.addEventListener("load", function() {
    window.document.querySelector("#btn_calculer").addEventListener("click", function() {
    // Déclaration des constantes
    const fixe = 1100.0;
    // Déclaration et affectation des variables
    let nbAncien = parseInt(window.document.querySelector("#num_ancien").value);
    let nbS20 = parseInt(window.document.querySelector("#num_s20").value);
    let nbXS = parseInt(window.document.querySelector("#num_xs").value);
    let nbMulti = parseInt(window.document.querySelector("#num_multi").value);
    let remuneration = fixe + recupPrimeAnciennete(nbAncien, fixe) + recupComS20(nbS20) + recupComXS(nbXS) + recupComMulti(nbMulti);
    // Affichage du résultat
    window.document.querySelector("#remuneration").innerHTML = "La rémunération sera de : " + remuneration + " €";
    });
});

window.addEventListener("load", function() {
    window.document.querySelector("#num_ancien").addEventListener("keyup", calcRemu);
    window.document.querySelector("#num_s20").addEventListener("keyup", calcRemu);
    window.document.querySelector("#num_xs").addEventListener("keyup", calcRemu);
    window.document.querySelector("#num_multi").addEventListener("keyup", calcRemu);
});

window.addEventListener("load", function() {
    // Déclaration de l'index de parcours
    let i;
    // tabInputs est une collection de <input>
    let tabInputs = window.document.querySelectorAll("input");
    // Parcours de tabInputs en s'appuyant sur le nombre de <input>
    for (i=0 ; i < tabInputs.length ; i++) {
    // Ajout d'un Listener sur tous les <input> sur l'évènement onKeyUp
    tabInputs[i].addEventListener("keyup", calcRemu);
    }
});

/**
* Fonction principale qui s'occupe de récupérer les valeurs, calculer le montant
* de la rémunération et qui s'occupe ensuite de l'afficher
* 
* @returns {undefined}
*/
function calcRemu() {
    // Déclaration des constantes
    const fixe = 1100.0;
    // Déclaration et affectation des variables
    let nbAncien = parseInt(window.document.querySelector("#num_ancien").value);
    let nbS20 = parseInt(window.document.querySelector("#num_s20").value);
    let nbXS = parseInt(window.document.querySelector("#num_xs").value);
    let nbMulti = parseInt(window.document.querySelector("#num_multi").value);
    let km = recupValeur("#num_km");
    let remuneration = fixe + recupPrimeAnciennete(nbAncien, fixe) + recupComS20(nbS20) + recupComXS(nbXS) + recupComMulti(nbMulti) + recupIndemKm(km);
    // Affichage du résultat
    window.document.querySelector("#remuneration").innerHTML = "La rémunération sera de : " + remuneration + " €";
}

/**
* Fonction qui retourne un entier depuis une valeur prise dans le DOM
* 
* @param {String} id
* @return {integer}
*/
function recupValeur(id) {
    return parseInt(window.document.querySelector(id).value);
}

// Affichage du résultat
window.document.querySelector("#remuneration").innerHTML = "La rémunération sera de : " + remuneration + " €";
// Affichage du résultat
afficheRemu(remuneration);

/**
* Fonction qui affiche la rémunération dans l'élément d'id "remuneration"
* 
* @param {type} nombre
* @return {undefined}
*/
function afficheRemu(nombre) {
    window.document.querySelector("#remuneration").innerHTML = "La rémunération sera de : " + nombre + " €";
}

/**
* Fonction qui retourne l'indemnité kilométrique
* @param {type} nb
* @returns {float}
*/
function recupIndemKm(nb) {
    const prix = 0.15, plafond = 350;
    let index = nb * prix;
    if (index > plafond) {
    return index;
    }
    else {
    return plafond;
    }
}