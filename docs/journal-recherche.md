# Journal de recherche

> Chaque recherche utile : ce que vous cherchiez, où (cours, [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript), [Node.js](https://nodejs.org/api/), un camarade, une IA…), ce que vous avez compris. Ce que vous gardez, vous devez pouvoir l'expliquer.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
Lire un fichier JSON avec Node.js (fs/promises) | Doc Node.js + MDN | await readFile(chemin, 'utf8') puis JSON.parse() pour obtenir un tableau. On laisse l'erreur remonter si le fichier n'existe pas. | src/stockage.js → chargerJson |

 Valider une date au format AAAA-MM-JJ | MDN + tests fournis | Utiliser la fonction fournie estDateValide. Une date comme 2026-02-30 est invalide. | src/registre.js → verifierSaisie |