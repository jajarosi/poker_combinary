function evaluerCombinaison(cartes) {
    // Trier les cartes par valeur
    cartes.sort((a, b) => a.valeur - b.valeur);

    // Fonction utilitaire pour compter les occurrences de chaque valeur
    function compterOccurrences(cartes) {
        const occurrences = {};
        for (const carte of cartes) {
            occurrences[carte.valeur] = (occurrences[carte.valeur] || 0) + 1;
        }
        return occurrences;
    }

    // Compter les occurrences de chaque valeur
    const occurrences = compterOccurrences(cartes);

    // Fonction utilitaire pour vérifier si une suite est présente
    function aSuite(cartes) {
        for (let i = 0; i < cartes.length - 1; i++) {
            if (cartes[i + 1].valeur - cartes[i].valeur !== 1) {
                return false;
            }
        }
        return true;
    }

    // Vérifier la présence de chaque combinaison dans l'ordre décroissant de priorité
    if (occurrences[1] === 1 && occurrences[10] === 1 && occurrences[11] === 1 && occurrences[12] === 1 && occurrences[13] === 1) {
        return "Quinte Flush Royale";
    } else if (aSuite(cartes) && Object.keys(occurrences).length === cartes.length) {
        return "Quinte Flush";
    } else if (Object.values(occurrences).includes(4)) {
        return "Carré";
    } else if (Object.values(occurrences).includes(3) && Object.values(occurrences).includes(2)) {
        return "Full";
    } else if (aSuite(cartes)) {
        return "Quinte";
    } else if (Object.values(occurrences).includes(3)) {
        return "Brelan";
    } else if (Object.values(occurrences).filter(count => count === 2).length === 2) {
        return "Double Paire";
    } else if (Object.values(occurrences).includes(2)) {
        return "Paire";
    } else {
        return "Carte Haute";
    }

}

function evaluerCartes() {
    const cartesInput = document.getElementById("cartesInput").value;
    const cartesEntrees = cartesInput.split(',').map(entry => entry.trim());

    const cartesJoueur = cartesEntrees.map(entry => {
        const valeur = parseInt(entry.slice(0, -1), 10); // Retirer le dernier caractère (la couleur) pour obtenir la valeur.
        const couleur = entry.slice(-1).toLowerCase(); // Récupérer le dernier caractère comme couleur (en minuscules).
        return { valeur, couleur };
    });

    // Valider que les entrées sont des nombres valides entre 1 et 13, par exemple.
    if (cartesJoueur.some(carte => isNaN(carte.valeur) || carte.valeur < 1 || carte.valeur > 13 || !['p', 'c', 'd', 't'].includes(carte.couleur))) {
        alert("Veuillez entrer des valeurs valides (1-13) avec des couleurs valides (p, c, d, t).");
        return;
    }

    const meilleureCombinaisonJoueur = evaluerCombinaison(cartesJoueur);

    // Afficher la meilleure combinaison du joueur
    const resultatCombinaisonElement = document.getElementById("resultatCombinaison");
    resultatCombinaisonElement.textContent = `Meilleure combinaison du joueur : ${meilleureCombinaisonJoueur}`;
}