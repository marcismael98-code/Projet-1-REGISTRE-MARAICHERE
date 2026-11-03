# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification      | Type   | Règle de validation    | Unité              | Exemple |
| `id`    | Identifiant unique | string |Obligatoire, unique     | Texte (majuscules) |  `O03` |
| `date`  | Date de l'operation| string |date reelle existante   |AAAA-MM-JJ          | `2026-11-03`|
|`parcelle`|surface delimité   | string | obligatoire non vide   |texte               |     `p1`    |
|`culture` |plante cultivee sur la parcelle |string |obligatoire non vide |texte(minuscule)  |`tomate` |
|`operation` |intervention humaine | string |liste fermee uniquement |une des 5 valeurs |`arrosage` |
|`coutFCFA` | Depense enregistree | number | nombre >=0 | francs cfa | `3000` |

**Listes de valeurs autorisées** : ✏️

**Sources** : ✏️
