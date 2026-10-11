# Royal TempoGym Jette — boutique publique

Site public préparé pour : **https://boutiquetempogym.educsport.be**

## Mise en ligne GitHub Pages

1. Dans ce dépôt, aller à **Settings → Pages**.
2. Dans « Build and deployment », choisir **Deploy from a branch**, puis **main** et **/(root)**, et enregistrer.
3. Dans « Custom domain », saisir `boutiquetempogym.educsport.be`, enregistrer, puis attendre le contrôle DNS.
4. Dans la zone DNS de `educsport.be`, créer : **CNAME** `boutiquetempogym` → `khiirooo.github.io`. Ne pas modifier `tempogym.educsport.be`.
5. Lorsque disponible, activer **Enforce HTTPS**.

## Limitations de cette version GitHub Pages

La vitrine, les photos, les disciplines et la boutique sont consultables. Les commandes réelles, le stock partagé et les connexions administrateur/entraîneur ne sont **pas opérationnels** sur GitHub Pages. Les boutons de commande signalent l'indisponibilité temporaire.

Le code d'entrée `tempogym2026` sert uniquement de filtre visuel JavaScript : ce n'est **pas** une protection d'accès sécurisée, le contenu HTML et le code sont publics.

La version PHP complète reste dans le dépôt `Khiirooo/tempogymm`, branche `nouveau-site-v5`, pour un futur déploiement OVH. Ne pas changer la branche GitHub Pages ni le CNAME du dépôt du site officiel.

Les images sont principalement référencées depuis `Khiirooo/tempogymm` et doivent rester publiques.
