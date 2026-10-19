# Royal TempoGym Jette — vitrine de démonstration

Adresse de présentation : https://boutiquetempogym.educsport.be/

Ce dépôt publie une **vitrine statique**, sur GitHub Pages depuis `main` à la racine. La navigation, les disciplines, les tarifs, les horaires, les événements et le catalogue sont consultables.

## Ce qui reste à faire pour le client

- Les commandes en ligne sont désactivées. Aucune demande ne doit être enregistrée sur cette vitrine ; les formulaires d'identité sont masqués.
- Les panneaux administrateur et entraîneurs sont des démonstrations locales. Leurs modifications restent dans le navigateur ; ils ne constituent pas une authentification sécurisée ou un service partagé.
- L'écran de développement est un filtre visuel JavaScript. Le HTML et les codes de démonstration sont publics.
- L'identité, le siège et le numéro BCE ont été renseignés d'après les sources du club. Le régime TVA, les conditions et les informations de confidentialité doivent être validés avec le club.

La version PHP corrigée est dans [`Khiirooo/tempogymm`, branche `nouveau-site-v5`](https://github.com/Khiirooo/tempogymm/tree/nouveau-site-v5), commit `6bc0747`. Les 31 contrôles PHP locaux ont réussi : installation, sessions, rôles, commandes concurrentes, stock, ressources, export et anonymisation. Elle attend l'accès à OVH pour son installation et la recette sur le serveur réel. Les médias y sont locaux et les mots de passe sont choisis à l'installation. **Ne pas copier cet `index.html` de démonstration par-dessus l'entrée de production PHP.** Les corrections utiles ont déjà été reportées dans cette version serveur.

GitHub peut conserver le code et son historique. GitHub Pages n'exécute pas PHP et ses conditions excluent les sites principalement consacrés aux transactions commerciales : https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Réglages de la vitrine

- GitHub Pages : branche `main`, dossier `/(root)`.
- Domaine configuré dans `CNAME` : `boutiquetempogym.educsport.be`.
- DNS du sous-domaine : CNAME vers `khiirooo.github.io` ; activer/vérifier HTTPS dans les réglages Pages.
- Conserver `.nojekyll`. L'en-tête reste textuel, sans image ajoutée au menu.
- De nombreuses photos et les PDF dépendent encore de `Khiirooo/tempogymm@main`. Les reprendre avec le projet lors de la livraison au client et adapter les références avant de supprimer ou de rendre privé ce dépôt.
- Ne pas changer le domaine ou la branche de publication du site officiel pendant les essais.

## Vérification locale

Prérequis : Node.js récent, sans installation de dépendances.

```sh
node scripts/check-static.mjs
node scripts/check-coaches.mjs
```

Les contrôles vérifient la syntaxe des scripts, l'interdiction d'écrire une commande depuis la vitrine, la cohérence de l'état des inscriptions, l'en-tête textuel et les gestes des profils entraîneurs. Le navigateur Chrome a servi à contrôler les profils au clic/clavier ainsi que les menus, fiches et tableaux dans des cadres de 320, 390 et 768 px sans débordement horizontal. Des téléphones réels et le serveur OVH restent à vérifier avant livraison. Voir [LIVRAISON.md](LIVRAISON.md).
