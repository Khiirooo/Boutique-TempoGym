# Royal TempoGym Jette — vitrine de démonstration

Adresse de présentation : https://boutiquetempogym.educsport.be/

Ce dépôt publie une **vitrine statique**, sur GitHub Pages depuis `main` à la racine. La navigation, les disciplines, les tarifs, les horaires, les événements et le catalogue sont consultables.

## Ce qui reste à faire pour le client

- Les commandes en ligne sont désactivées. Aucune demande ne doit être enregistrée sur cette vitrine ; les formulaires d'identité sont masqués.
- Les panneaux administrateur et entraîneurs sont des démonstrations locales. Leurs modifications restent dans le navigateur ; ils ne constituent pas une authentification sécurisée ou un service partagé.
- L'écran de développement est un filtre visuel JavaScript. Le HTML et les codes de démonstration sont publics.
- Les coordonnées légales, conditions et informations de confidentialité sont préparatoires et doivent être complétées avec le club.

La version PHP existe dans [`Khiirooo/tempogymm`, branche `nouveau-site-v5`](https://github.com/Khiirooo/tempogymm/tree/nouveau-site-v5). Elle nécessite un hébergement PHP/Apache et des tests sur le serveur réel. **Ne pas copier cet `index.html` de démonstration par-dessus l'entrée de production PHP.** Reporter uniquement les changements utiles après comparaison des deux versions.

GitHub peut conserver le code et son historique. GitHub Pages n'exécute pas PHP et ses conditions excluent les sites principalement consacrés aux transactions commerciales : https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Réglages de la vitrine

- GitHub Pages : branche `main`, dossier `/(root)`.
- Domaine configuré dans `CNAME` : `boutiquetempogym.educsport.be`.
- DNS du sous-domaine : CNAME vers `khiirooo.github.io` ; activer/vérifier HTTPS dans les réglages Pages.
- Conserver `.nojekyll` et `floatingimage/Logofloating3D.png`.
- De nombreuses photos et les PDF dépendent encore de `Khiirooo/tempogymm@main`. Les reprendre avec le projet lors de la livraison au client et adapter les références avant de supprimer ou de rendre privé ce dépôt.
- Ne pas changer le domaine ou la branche de publication du site officiel pendant les essais.

## Vérification locale

Prérequis : Node.js récent, sans installation de dépendances.

```sh
node scripts/check-static.mjs
```

Le contrôle vérifie la syntaxe des scripts, l'interdiction d'écrire une commande depuis la vitrine, la cohérence de l'état des inscriptions et la présence du logo. Les tests de navigateur et de serveur restent nécessaires avant livraison.
