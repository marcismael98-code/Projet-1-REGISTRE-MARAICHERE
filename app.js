// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/operations.json';


function afficherAccueil() {
  console.log('==================================================');
  console.log('   REGISTRE DES OPÉRATIONS MARAÎCHÈRES');
  console.log('   Exploitation maraîchère pédagogique');
  console.log('==================================================');
}

function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter une opération');
  console.log('2. Lister les opérations');
  console.log('3. Rechercher (identifiant, parcelle, culture)');
  console.log('4. Trier (coût, date)');
  console.log('5. Synthèse des dépenses');
  console.log('6. Supprimer une opération');
  console.log('7. Modifier une opération');
  console.log('0. Quitter');
}

async function actionAjouter(operations) {
  console.log('--- Ajouter une opération ---');
  const idBrut = await demander('Identifiant (ex. O11) : ');
  if (idBrut === null) return;
  const date = await demander('Date (AAAA-MM-JJ) : ');
  if (date === null) return;
  const parcelleBrut = await demander('Parcelle (ex. P1) : ');
  if (parcelleBrut === null) return;
  const cultureBrut = await demander('Culture (ex. tomate) : ');
  if (cultureBrut === null) return;
  const operationBrut = await demander(`Opération (${OPERATIONS.join(', ')}) : `);
  if (operationBrut === null) return;
  const coutBrut = await demander('Coût en FCFA : ');
  if (coutBrut === null) return;

  const saisie = {
    id: idBrut.toUpperCase(),
    date: date,
    parcelle: parcelleBrut.toUpperCase(),
    culture: cultureBrut.toLowerCase(),
    operation: operationBrut.toLowerCase(),
    coutFCFA: coutBrut,
  };

  const erreurs = ajouterOperation(operations, saisie);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${saisie.id} ajoutée. Le registre compte ${operations.length} opération(s).`);
  } else {
    console.log('Opération refusée :');
    for (const msg of erreurs) {
      console.log(`  - ${msg}`);
    }
    console.log(`Le registre compte toujours ${operations.length} opération(s).`);
  }
}

function actionLister(operations) {
  console.log(`--- Liste des opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));
}

async function actionRechercher(operations) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par parcelle');
  console.log("3. Les opérations d'une culture");
  const sous = await demander('Votre choix : ');
  if (sous === null) return;

  if (sous === '1') {
    const idBrut = await demander('Identifiant : ');
    if (idBrut === null) return;
    const id = idBrut.toUpperCase();
    const op = trouverParId(operations, id);
    if (op) {
      console.log(formaterOperation(op));
    } else {
      console.log(`Opération ${id} introuvable.`);
    }
  } else if (sous === '2') {
    const parcelleBrut = await demander('Parcelle : ');
    if (parcelleBrut === null) return;
    const parcelle = parcelleBrut.toUpperCase();
    const resultat = filtrerParParcelle(operations, parcelle);
    console.log(`${resultat.length} opération(s) sur la parcelle ${parcelle} :`);
    console.log(listerOperations(resultat));
  } else if (sous === '3') {
    const cultureBrut = await demander('Culture : ');
    if (cultureBrut === null) return;
    const culture = cultureBrut.toLowerCase();
    const resultat = filtrerParCulture(operations, culture);
    console.log(`${resultat.length} opération(s) pour la culture ${culture} :`);
    console.log(listerOperations(resultat));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

async function actionTrier(operations) {
  console.log('--- Trier ---');
  console.log('1. Par coût croissant');
  console.log('2. Par date, de la plus ancienne à la plus récente');
  console.log('3. Par coût décroissant');
  const sous = await demander('Votre choix : ');
  if (sous === null) return;

  if (sous === '1') {
    console.log(listerOperations(trierParCout(operations)));
  } else if (sous === '2') {
    console.log(listerOperations(trierParDate(operations)));
  } else if (sous === '3') {
    console.log(listerOperations(trierParCoutDecroissant(operations)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

function actionSynthese(operations) {
  console.log('--- Synthèse des dépenses enregistrées ---');
  console.log(`Nombre d'opérations : ${operations.length}`);
  console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);
  console.log('Par parcelle :');
  const synthese = syntheseParParcelle(operations);
  for (const [parcelle, { nombre, total }] of Object.entries(synthese)) {
    console.log(`  ${parcelle} : ${nombre} opération(s), ${total} FCFA`);
  }
  const minMax = coutMinMax(operations);
  if (minMax === null) {
    console.log('Coût minimum et maximum : aucune donnée');
  } else {
    console.log(`Coût minimum : ${minMax.min} FCFA · Coût maximum : ${minMax.max} FCFA`);
  }
  const top = parcelleLaPlusCouteuse(operations);
  if (top) {
    console.log(`Parcelle la plus coûteuse : ${top.parcelle} (${top.total} FCFA)`);
  }
  console.log('Rappel : ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.');
}

async function actionSupprimer(operations) {
  console.log('--- Supprimer une opération ---');
  const idBrut = await demander('Identifiant : ');
  if (idBrut === null) return;
  const id = idBrut.toUpperCase();
  const supprimee = supprimerOperation(operations, id);
  if (supprimee) {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${id} supprimée. Le registre compte ${operations.length} opération(s).`);
  } else {
    console.log(`Opération ${id} introuvable.`);
  }
}

async function actionModifier(operations) {
  console.log('--- Modifier une opération ---');
  const idBrut = await demander('Identifiant : ');
  if (idBrut === null) return;
  const id = idBrut.toUpperCase();
  const champ = await demander('Champ à modifier (date, parcelle, culture, operation, coutFCFA) : ');
  if (champ === null) return;
  const valeur = await demander('Nouvelle valeur : ');
  if (valeur === null) return;

  let valeurNormee = valeur;
  if (champ === 'parcelle') valeurNormee = valeur.toUpperCase();
  if (champ === 'culture' || champ === 'operation') valeurNormee = valeur.toLowerCase();

  const erreurs = modifierOperation(operations, id, champ, valeurNormee);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${id} modifiée.`);
  } else {
    console.log('Modification refusée :');
    for (const msg of erreurs) {
      console.log(`  - ${msg}`);
    }
  }
}

async function main() {
  ouvrirSaisie();
  afficherAccueil();

  let operations = [];
  try {
    operations = await chargerJson(FICHIER_DONNEES);
    console.log(`${operations.length} opération(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le registre démarre vide.`);
    operations = [];
  }

  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('Votre choix : ');
    if (choix === null) {
      continuer = false;
      break;
    }

    try {
      if (choix === '0') {
        console.log('Au revoir !');
        continuer = false;
      } else if (choix === '1') {
        await actionAjouter(operations);
      } else if (choix === '2') {
        actionLister(operations);
      } else if (choix === '3') {
        await actionRechercher(operations);
      } else if (choix === '4') {
        await actionTrier(operations);
      } else if (choix === '5') {
        actionSynthese(operations);
      } else if (choix === '6') {
        await actionSupprimer(operations);
      } else if (choix === '7') {
        await actionModifier(operations);
      } else {
        console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
      }
    } catch (erreur) {
      const message = erreur.message || String(erreur);
      if (message.startsWith('TODO')) {
        console.log(`À compléter : ${message}`);
      } else {
        console.log(`Erreur inattendue : ${message}`);
      }
    }
  }

  fermerSaisie();
}

main();