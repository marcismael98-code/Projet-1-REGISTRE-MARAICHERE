// Ajouter et lister les opérations.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des opérations culturales acceptées, fournie par le coach agronomie.
export const OPERATIONS = ['semis', 'arrosage', 'désherbage', 'repiquage', 'récolte'];

// Renvoie une ligne de texte qui décrit l'opération.
// Exemple : 'O03 | 2026-10-21 | P1 | tomate | arrosage | 2000 FCFA'
export function formaterOperation(operation) {
  return `${operation.id} | ${operation.date} | ${operation.parcelle} | ${operation.culture} | ${operation.operation} | ${operation.coutFCFA} FCFA`;
}



// Renvoie un texte avec une opération par ligne (lignes séparées par '\n'),
// ou 'Aucune opération enregistrée.' si la liste est vide.
export function listerOperations(operations) {
  if (operations.length === 0) {
    return 'Aucune opération enregistrée.';
  }
  return operations.map(formaterOperation).join('\n');
}


// Renvoie l'opération qui a cet identifiant, ou undefined si elle n'existe pas.
export function trouverParId(operations, id) {
  return operations.find((op) => op.id === id);
}


// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'O11', date: '2026-10-27', parcelle: 'P1', culture: 'tomate', operation: 'récolte', coutFCFA: '2500' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · date réelle au format AAAA-MM-JJ · parcelle et culture
// obligatoires (n'importe quel texte non vide) · operation présente dans OPERATIONS
// · coutFCFA nombre positif ou nul.
export function verifierOperation(saisie, operations) {
  const erreurs = [];

  const id = String(saisie.id ?? '').trim();
  if (id === '') {
    erreurs.push("L'identifiant est obligatoire.");
  } else if (trouverParId(operations, id)) {
    erreurs.push(`L'identifiant ${id} est déjà utilisé.`);
  }

  const date = String(saisie.date ?? '').trim();
  if (!estDateValide(date)) {
    erreurs.push('La date doit être une date réelle au format AAAA-MM-JJ.');
  }

  const parcelle = String(saisie.parcelle ?? '').trim();
  if (parcelle === '') {
    erreurs.push('La parcelle est obligatoire.');
  }

  const culture = String(saisie.culture ?? '').trim();
  if (culture === '') {
    erreurs.push('La culture est obligatoire.');
  }

  const operation = String(saisie.operation ?? '').trim();
  if (!OPERATIONS.includes(operation)) {
    erreurs.push(`L'opération doit être l'une de : ${OPERATIONS.join(', ')}.`);
  }

  const cout = versNombre(saisie.coutFCFA);
  if (Number.isNaN(cout) || cout < 0) {
    erreurs.push('Le coût doit être un nombre positif ou nul (en FCFA).');
  }

  return erreurs;
}

// Fabrique l'opération à enregistrer à partir d'une saisie VALIDE : coutFCFA devient un nombre.
export function creerOperation(saisie) {
  return {
    id: String(saisie.id).trim(),
    date: String(saisie.date).trim(),
    parcelle: String(saisie.parcelle).trim(),
    culture: String(saisie.culture).trim(),
    operation: String(saisie.operation).trim(),
    coutFCFA: versNombre(saisie.coutFCFA),
  };
}


// Ajoute la saisie au registre si elle est valide (verifierOperation, puis creerOperation).
// Renvoie les erreurs : [] si l'opération a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterOperation(operations, saisie) {
  const erreurs = verifierOperation(saisie, operations);
  if (erreurs.length > 0) {
    return erreurs;
  }
  operations.push(creerOperation(saisie));
  return [];
}
