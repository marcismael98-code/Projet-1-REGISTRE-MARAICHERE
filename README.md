# Registre des opérations maraîchères

> Projet individuel du SAS DFS, brief 1 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

✏️ *La responsable d'une exploitation maraîchère pédagogique suit au quotidien les interventions sur ses parcelles : semis, repiquage, arrosage, désherbage et récolte. Jusqu'à présent, elle notait tout dans un carnet papier. Les oublis, les recherches longues et l'impossibilité de totaliser rapidement les dépenses par parcelle lui font perdre du temps.

Elle a besoin d'un outil simple en ligne de commande pour :
- saisir une opération (identifiant, date, parcelle, culture, type d'opération, coût en FCFA) ;
- retrouver une intervention par identifiant, par parcelle ou par culture ;
- trier les opérations par coût ou par date ;
- obtenir une synthèse des dépenses (total général, détail par parcelle, coût minimum et maximum).



## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git
cd brief-1-registre-maraicher
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x ] Données lues et enregistrées dans `donnees/operations.json`
- [ x] Ajouter une opération, saisies invalides refusées sans arrêter le programme
- [x ] Lister les opérations, message si le registre est vide
- [x ] Rechercher par identifiant ou par parcelle ; filtrer par culture
- [x ] Trier par coût ou par date
- [x ] Synthèse : total, nombre et total par parcelle, coût minimum et maximum
- [x ] Bonus : supprimer et modifier une opération (choix 6 et 7)
- [x ] Bonus : tri par coût décroissant, parcelle la plus coûteuse

## Données

✏️ *Champ      Exemple         Unité / format
     id          O03          texte unique
     date     2026-10-21      AAAA-MM-JJ 
    parcelle    P1            texte
    culture    tomate         texte
    operation  arrosage    une des 5 opérations autorisées
    coutFCFA    2000         nombre ≥ 0, en francs CFA
## Limites

1-Le registre enregistre uniquement des dépenses, pas les revenus → il ne mesure pas la rentabilité.
2-Aucun contrôle de cohérence entre parcelle et culture (ex. P1 + gombo est accepté).
3-Pas d'historique des modifications ni de multi-utilisateurs.
4-Unité monétaire figée en FCFA (pas de conversion).
5-Interface en ligne de commande uniquement (pas d'interface graphique).
6-Les identifiants et parcelles sont normalisés en majuscules, les cultures et opérations en minuscules à la saisie.



## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
Ismael AMUSA? marcisamel98-code, toutes l'equipe du proget 1 sur le codage et anglovia et abdallah