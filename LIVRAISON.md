# TempoGym — audit et préparation de livraison

Date : 19 octobre 2026. Projet : `Khiirooo/Boutique-TempoGym`.

**Verdict : démonstration présentable après corrections, pas encore un service de production pour les comptes et les commandes.**

L'audit initial porte sur la version publiée au commit `2c18b141d7b0448e73692ef1a27603a72d079566`. Les corrections ont ensuite été publiées via la PR #1, après autorisation du propriétaire. Le bouton « S’inscrire », le blocage des fausses commandes et les disponibilités des tarifs ont été recontrôlés dans le navigateur sur le site publié. L'image du logo ajoutée au menu a été retirée à la demande du propriétaire ; l'en-tête textuel et le bouton « S’inscrire » sont confirmés en ligne. Une seconde passe a corrigé les profils entraîneurs et préparé la version serveur OVH ; les résultats sont détaillés ci-dessous. Le tableau ci-dessous conserve les constats de l'audit initial et précise les corrections.

## Changements publiés

- « Disponibilités » devient **« S’inscrire »** dans le menu bureau, le menu mobile, le pied de page et le libellé HTML de secours. La destination reste `#inscriptions`. Le bandeau inférieur peut toujours afficher « Nous contacter » lorsque les inscriptions sont closes, conformément au comportement existant.
- L'en-tête conserve son identité textuelle. L'image ajoutée au menu lors de la réparation d'une ressource absente a été retirée à la demande du propriétaire.
- Les tarifs Baby/Pré-gym, GAF Loisirs et Parkour loisirs respectent maintenant la clôture générale. Les compétitions sur sélection et Fun Gym conservent leurs exceptions. Aucune date, aucun prix ni horaire n'a été inventé.
- La vitrine GitHub Pages ne peut plus enregistrer de commande fictive : garde au niveau du moteur local et retrait du gestionnaire de commande de cette vitrine. Les champs d'identité et références de commande sont masqués ; les tailles restent consultables et une information indique de contacter le secrétariat.
- Ajout d'un contrôle exécutable avec `node scripts/check-static.mjs`. Le README précise les limites réelles de la démonstration.

## Corrections supplémentaires du 19 octobre 2026

- Profils entraîneurs : gestion unifiée du pointeur et du glissement, boutons natifs pour le clavier, fenêtres nommées et retour du focus. Le clic sur un profil visible (Martin) et l'ouverture de Lucas avec Entrée sont confirmés dans Chrome. Les descriptions et années non renseignées sont masquées, sans inventer de biographies.
- Mentions : identité **ROYAL TEMPOGYM JETTE ASBL**, siège et BCE **0899.464.172** renseignés d'après les statuts officiels. Le régime TVA et les conditions de vente/retour restent à valider par le club.
- Responsive : menu ouvert et lien d'inscription testés dans des cadres de 320 et 390 px ; fiche produit à 320 px ; tableau Parkour à 768 px. Aucun débordement horizontal de la page. La barre de défilement de ce Chrome réduit le contenu disponible de 15 px. Ce contrôle n'émule pas un appareil tactile et ne certifie pas Safari/iPhone.
- Version OVH mise à jour sur `Khiirooo/tempogymm`, branche `nouveau-site-v5`, commit **`6bc074725b7c46a7f951ac008df40ff6410b90af`**. Les corrections de navigation, tarifs, profils et mentions y sont reportées. Les articles à taille unique sont pris en charge. Les 33 médias référencés et les 4 PDF du club sont locaux, présents et vérifiés ; le catalogue de base utilise aussi les chemins locaux.
- Installation OVH : trois mots de passe choisis par le propriétaire, aucun code visiteur commun ; stockage privé facultativement configurable hors des racines web ; les chemins `tests/`, `scripts/` et les métadonnées Git sont refusés par Apache.
- **31 contrôles PHP réels réussis**, avec PHP 8.2.34, un serveur local à quatre workers et des données fictives isolées : installation, clé supprimée, accès visiteur, sessions, droits admin/entraîneur, deux commandes concurrentes pour une unité (201/409), stock, annulations idempotentes, ressources partagées, CSV et anonymisation. Les 16 scripts de chaque version sont syntaxiquement valides. Ces essais n'utilisent pas OVH et ne déclenchent aucun paiement/courriel.

**Blocage externe restant : le club est chez OVH, mais les accès à l'hébergement ne sont pas encore disponibles. Aucun déploiement OVH ni changement DNS n'a été effectué.** Le guide de la branche PHP décrit l'installation, les sauvegardes, le stockage séparé préversion/production et la recette finale.

## Parcours vérifiés

| Étape | Parcours | État et preuve observée |
|---|---|---|
| 1 | Accès visiteur | Le site publié affiche un écran de développement. Accès obtenu puis accueil visible. Ce filtre JavaScript ne protège pas le code public. |
| 2 | Navigation / inscription | Le bouton actuel atteint la section inscriptions. Le nouveau libellé est confirmé sur le site publié. |
| 3 | Disciplines | Les 8 fiches s'ouvrent et se ferment : GAF, GAM, Parkour, Baby, Fun Gym et les 3 compétitions. |
| 4 | Profil entraîneur | Gestion du clic/glissement corrigée. Clic sur Martin et Entrée sur Lucas confirmés ; champs vides et « à définir » masqués. |
| 5 | Inscriptions | Clôture générale 2026–2027 et exceptions affichées. Aucun formulaire d'inscription active n'est proposé actuellement. Le bouton « S’inscrire » ne rouvre pas les inscriptions. |
| 6 | Boutique | Les 4 produits vedettes s'ouvrent. Taille, identité et groupe ont été testés avec des données fictives sur un produit. Bug reproduit : le clic « Commandes bientôt disponibles » enregistrait malgré tout une commande locale DEMO. Corrigé et recontrôlé sur le site publié. |
| 7 | Tarifs | Les 7 onglets sélectionnent leur tableau. Incohérence « Ouvert » / inscriptions closes reproduite puis corrigée et recontrôlée sur le site publié. |
| 8 | Horaires | L'accordéon Mercredi s'ouvre et se referme, avec modification de son état accessible. Le contenu des autres jours est présent. |
| 9 | Événements | Filtres Tous, Compétitions et Stages testés. La catégorie vide affiche un message ; le filtre Stages affiche ses événements ; retour Tous opérationnel. Les autres filtres et toutes les combinaisons d'archives ne sont pas certifiés. |
| 10 | Documents | Les 4 liens PDF répondent HTTP 200. Le ROI s'ouvre dans la fenêtre du site avec le lecteur PDF et ses 3 pages visibles. |
| 11 | Contact / carte | Liens téléphone et e-mail présents avec leurs protocoles. Carte Google chargée au lieu du club et lien externe disponible. Aucun appel ni courriel envoyé. |
| 12 | Administration | Panneau accessible ; l'interface indique « Édition locale » et précise que les changements restent dans le navigateur. La version PHP préparée passe les contrôles de connexion et de contenu partagé ; la vitrine conserve son mode local. OVH reste à tester. |
| 13 | Espace entraîneurs | Les 4 onglets Annonces, Documents, Planning, Rotations sont sélectionnables ; états vides cohérents. L'interface confirme l'absence de partage entre appareils. En PHP local, une ressource publiée par l'administration est visible par une session entraîneur distincte, sans accès aux commandes. |
| 14 | Mentions / confidentialité | Fenêtre légale ouverte. Identité, siège, BCE, comité responsable et hébergeur renseignés. TVA applicable et modalités de vente restent à valider. Documents explicitement marqués préparatoires. |

Contrôles complémentaires : **29 ressources d'images et de PDF ont répondu HTTP 200**. Les 16 scripts JavaScript ont une syntaxe valide. Aucun ID dupliqué dans le HTML source. Les liens vers `#tg-legal` sont des ouvertures de fenêtre gérées en JavaScript, pas des sections manquantes.

## Points qui empêchent de livrer comme site final

1. **Version serveur pas encore installée sur OVH.** Les fonctions partagées ont passé la recette PHP locale. Sur la vitrine GitHub Pages uniquement, comptes, administration, stocks et commandes restent locaux ou désactivés. Les données locales ne passent pas à un autre ordinateur, ne sont pas une base serveur et peuvent disparaître avec les données du navigateur. Les codes de démonstration publics ne doivent jamais servir de mots de passe de production.
2. **Conditions et contenus à valider.** L'identité et les coordonnées officielles sont renseignées. Faire confirmer par le club le régime TVA, les prestataires, les règles de retrait/retour, le fonctionnement de la commande et la conservation réelle des données. Ce contrôle constate les champs manquants ; ce n'est pas une validation juridique.
3. **Contenus à faire confirmer.** Baby-Gym : 2½–6 ans dans la fiche et 3,5–5 ans dans les tarifs. GAM loisirs : le tableau n'indique que jeudi alors que le planning comprend aussi samedi. Compétition GAM : « nés après 2020 » dans les exceptions, « 8 ans et + » pour Initiation dans les tarifs. Profils entraîneurs incomplets. Ne pas résoudre ces écarts en devinant.
4. **Dépendances au compte personnel.** Plusieurs médias et PDF viennent encore de `Khiirooo/tempogymm@main` via GitHub/jsDelivr. Supprimer, renommer ou rendre privé ce dépôt pourrait casser les ressources. La version PHP corrigée les référence déjà localement ; conserver tous ses dossiers de médias lors du déploiement.
5. **Recette finale à effectuer sur la vraie cible.** Smartphone réel (iPhone/Safari et Android/Chrome), menu mobile, tailles à 320/390 px, clavier et lecteur d'écran, comptes serveur, commande reçue et stock partagé, sessions, sauvegarde/restauration. Les petits cadres Chrome et les tests PHP locaux couvrent une partie de ces points ; ils ne certifient pas les appareils réels, OVH ni une conformité WCAG complète.

## Migration : ce qu'il faut savoir

**Le projet est déjà sur GitHub. GitHub stocke et versionne le code ; GitHub Pages publie seulement la partie statique.** GitHub Pages n'exécute pas PHP. Ses règles excluent aussi son emploi comme hébergement gratuit d'un site principalement destiné aux transactions commerciales.

Pour conserver la boutique et les espaces partagés prévus, la piste déjà présente dans le projet est **GitHub pour le code + hébergement PHP/Apache pour l'exécution**. Une version PHP existe dans `Khiirooo/tempogymm`, branche `nouveau-site-v5`. Son README décrit PHP 8.1+ et un stockage JSON privé à côté du répertoire public. Elle a passé les 31 contrôles PHP locaux et attend sa recette sur OVH.

### Ordre conseillé pour la livraison

1. Faire préciser au client le domaine final, l'hébergement existant, le périmètre boutique et les personnes qui administreront le projet. Faire posséder le domaine, l'hébergement et le dépôt par le club ; conserver ton accès de maintenance séparé si convenu.
2. Sauvegarder le code et le site actuellement en service. Préparer un sous-domaine et un dossier de test distincts avant de toucher au domaine public.
3. Prendre la version `nouveau-site-v5` corrigée au commit `6bc0747` ou ultérieur validé. Les corrections utiles y sont déjà reportées. **Ne pas déployer cet `index.html` de démonstration à la place du site PHP** : il force le mode local et désactive volontairement les commandes.
4. Déployer l'ensemble de la version PHP, y compris `index.php`, `api/`, `.htaccess`, les médias et documents. Vérifier PHP, HTTPS, les règles Apache, les chemins et le droit d'écrire dans le stockage privé. OVH propose une association dépôt/branche GitHub ; un transfert SFTP/FTP initial est aussi décrit dans le projet. Ne pas choisir le dossier du site existant par inadvertance.
5. Exécuter l'installation sur le serveur de test en suivant le README de cette version. Définir les vrais mots de passe via le serveur, séparer les droits admin/entraîneur et conserver configuration, secrets et données de commande hors de Git et de la racine publique. Sauvegarder les données privées séparément des déploiements de code.
6. Configurer les contenus approuvés, le stock réel, le formulaire d'inscription HTTPS autorisé quand les inscriptions rouvriront et les coordonnées légales. Les modifications enregistrées dans le navigateur de démonstration ne sont pas migrées automatiquement : les exporter/renseigner explicitement.
7. Faire une recette avec deux navigateurs/appareils : une commande arrive dans l'administration de l'autre appareil, réserve le stock attendu, change de statut, puis une annulation restitue le stock selon les règles du club. Vérifier aussi qu'un entraîneur ne voit pas les commandes ni les fonctions admin. Prévoir une donnée de test identifiée et sa suppression contrôlée.
8. Valider le mode de réception. Le README PHP indique **pas de paiement en ligne et pas de courriel automatique inclus**. Ne pas promettre de notification ou d'encaissement qui n'a pas été développé et testé.
9. Faire accepter la recette au client, puis planifier le basculement DNS et HTTPS et garder un moyen de retour à la version précédente. Un transfert de dépôt vers le compte du client ne remplace pas la migration du domaine, des médias et des données.
10. Remettre les accès par un canal sécurisé, les consignes d'édition, les sauvegardes, la procédure de mise à jour/retour arrière et ce qui relève de la maintenance. Conserver une version identifiée de livraison.

### Si le client veut seulement une vitrine statique

GitHub Pages peut publier la présentation et les PDF, avec un formulaire externe HTTPS explicitement choisi pour les inscriptions si nécessaire. Les vrais comptes, le stock et les commandes devront rester désactivés ou être portés par un service séparé adéquat. Pour un transfert de la vitrine à un autre compte, recontrôler l'accès à Pages selon son offre, la branche de publication, le domaine personnalisé, la cible DNS du nouveau propriétaire et HTTPS. Aucun transfert de compte ou changement DNS n'a été effectué pendant cet audit.

## Sources techniques officielles consultées

- [Création d'un site Pages, dont l'absence d'exécution PHP](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Limites d'usage de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Gestion du domaine et de HTTPS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Transfert d'un dépôt](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)
- [Association GitHub et hébergement OVHcloud](https://docs.ovhcloud.com/fr/guides/web-cloud/web-hosting/git-integration-webhosting)

## Sources du club pour les mentions

- [Statuts publiés par le club](https://www.tempogymjette.be/wp-content/uploads/2024/11/Statuts-corriges.pdf) : dénomination, siège et BCE.
- [Site officiel du club](https://www.tempogymjette.be/) : coordonnées publiques.
