# Tableau des tâches

> Planifiez vous-même, puis tenez le tableau à jour. Une preuve : un commit, un test vert, un document.

Tâche     | Prévu | Fait le | Preuve |

| Poste et dépôt prêts ; besoin compris ; documents commencés | Jour 1 13H | 02/11/2026 | Commit initial + docs commencés (114b72e) |

| lire et écrire le JSON                             | Jour 1 SOIR | 03/11/2026 | npm run test:stockage vert + commits 1ae5845 et 711ed70 |

| ajouter et lister ; choix 1 et 2 ; erreurs         | Jour 2 |03/11/2026| npm run test:registre vert + commits de validation et ajout |

| rechercher et trier ; choix 3 et 4 | Jour 2-3 | 03/11/2026 | npm run test:recherche vert + commits de filtre et tri |

| synthèse ; choix 5 | Jour 3 | 04/11/2026 | npm run test:synthese vert + commits total / min-max / synthèse |

 Fiche agronomique ; README ; documents | Jour 3 | 04/11/2026 | docs/fiche-agronomique.md, dictionnaire-donnees.md, journal-recherche.md, fiche-individuelle.md, releve-tests.md |

| Tests par un camarade ; mes propres tests | Jour 3-4 | 04/11/2026 | Relevé des tests rempli (testeur : Kouame Florent) + npm test 39/39 verts |

|rechercher et trier ; choix 3 et 4 | Jour 2-3 | 03/11/2026 | npm run test:recherche vert + commits de filtre et tri |

| Dépôt cloné et lancé ailleurs ; démonstration répétée | Jour 4 | 04/11/2026 | Testé sur le poste de Kouame Florent (git clone + node app.js + npm test) |

| Bonus | Jour 4 | 04/11/2026 | npm run test:bonus vert + commits suppression, modification, tri décroissant, parcelle la plus coûteuse |


**Blocages** (le message exact, ce que j'ai essayé, la solution) :
Problème : mon GitHub ne s’actualisait pas.  
Solution : j’ai repris les commits et j’ai été aidé par Abdallah et Anglovia pour synchroniser le dépôt.
Problème : trierParCoutDecroissant is not defined.  
Solution : ajout de l’import manquant depuis src/bonus.js dans app.js.
