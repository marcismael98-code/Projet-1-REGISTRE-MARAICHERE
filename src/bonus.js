// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Pas de modèle pour ce fichier : à vous de combiner ce que vous avez appris.
import { versNombre, estDateValide } from './outils.js';
import { trouverParId, OPERATIONS } from './registre.js';
import { syntheseParParcelle } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['date', 'parcelle', 'culture', 'operation', 'coutFCFA'];

// Supprime du registre l'opération qui a cet identifiant.
// Renvoie l'opération supprimée, ou undefined si elle n'existe pas (le registre ne change pas).
export function supprimerOperation(operations, id) {
  const index = operations.findIndex((op) => op.id === id);
  if (index === -1) {
    return undefined;
  }
  const [supprimee] = operations.splice(index, 1);
  return supprimee;
}

// Modifie UN champ d'une opération. La nouvelle valeur arrive sous forme de TEXTE et suit
// les mêmes règles qu'à l'ajout. Renvoie les erreurs : [] si la modification est faite ;
// sinon les messages, et l'opération ne change pas.
// Erreurs : identifiant introuvable · champ 'id' (non modifiable) · champ absent de CHAMPS_MODIFIABLES
//           · valeur refusée par les règles de l'ajout.
export function modifierOperation(operations, id, champ, valeur) {
  const erreurs = [];

  if (champ === 'id') {
    erreurs.push("L'identifiant n'est pas modifiable.");
    return erreurs;
  }

  if (!CHAMPS_MODIFIABLES.includes(champ)) {
    erreurs.push(`Le champ « ${champ} » n'est pas modifiable.`);
    return erreurs;
  }

  const operation = trouverParId(operations, id);
  if (!operation) {
    erreurs.push(`Opération ${id} introuvable.`);
    return erreurs;
  }

  const texte = String(valeur ?? '').trim();

  if (champ === 'date') {
    if (!estDateValide(texte)) {
      erreurs.push('La date doit être une date réelle au format AAAA-MM-JJ.');
      return erreurs;
    }
    operation.date = texte;
  } else if (champ === 'parcelle') {
    if (texte === '') {
      erreurs.push('La parcelle est obligatoire.');
      return erreurs;
    }
    operation.parcelle = texte;
  } else if (champ === 'culture') {
    if (texte === '') {
      erreurs.push('La culture est obligatoire.');
      return erreurs;
    }
    operation.culture = texte;
  } else if (champ === 'operation') {
    if (!OPERATIONS.includes(texte)) {
      erreurs.push(`L'opération doit être l'une de : ${OPERATIONS.join(', ')}.`);
      return erreurs;
    }
    operation.operation = texte;
  } else if (champ === 'coutFCFA') {
    const cout = versNombre(texte);
    if (Number.isNaN(cout) || cout < 0) {
      erreurs.push('Le coût doit être un nombre positif ou nul (en FCFA).');
      return erreurs;
    }
    operation.coutFCFA = cout;
  }

  return [];
}

// Renvoie une COPIE triée par coût décroissant : la plus chère d'abord.
export function trierParCoutDecroissant(operations) {
  return [...operations].sort((a, b) => b.coutFCFA - a.coutFCFA);
}

// Renvoie la parcelle dont le total des coûts est le plus élevé : { parcelle, total },
// ou null si le registre est vide. En cas d'égalité : la première parcelle rencontrée.
export function parcelleLaPlusCouteuse(operations) {
  if (operations.length === 0) {
    return null;
  }
  const synthese = syntheseParParcelle(operations);
  let meilleure = null;
  for (const [parcelle, { total }] of Object.entries(synthese)) {
    if (meilleure === null || total > meilleure.total) {
      meilleure = { parcelle, total };
    }
  }
  return meilleure;
}
