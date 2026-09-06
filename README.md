# Mon appli de révision

**👉 [Ouvrir l'application](https://lll65.github.io/Loukia-App/)**

Application de révision personnelle pour le collège (programme de 3ᵉ) : cours, fiches,
vidéos, quiz, exercices corrigés, notes, emploi du temps, programme de travail
personnalisé, statistiques et mode concentration.

C'est une **application web installable** (PWA) : elle s'ajoute à l'écran d'accueil
du téléphone comme une vraie application et fonctionne **hors connexion**.
**Toutes les données restent sur l'appareil** — aucun compte, aucun serveur.

## Les 12 fonctions

| | Écran | Ce qu'on y fait |
|---|---|---|
| 1 | **Accueil** | Tâches du jour, temps de révision, série de jours, moyenne, suggestion du jour, prochains contrôles |
| 2 | **Matières et cours** | Une matière → ses chapitres, avec le niveau de maîtrise de chacun |
| 3 | **Mes notes** | Saisie des notes, moyenne par matière, moyenne générale, évolution, estimation de la moyenne à venir |
| 4 | **Emploi du temps** | Vue semaine et vue jour, couleurs par matière, créneaux modifiables |
| 5 | **Ma note visée** | L'objectif de l'année, l'écart à combler, les matières qui coûtent le plus de points |
| 6 | **Programme personnalisé** | Le programme du jour, de la semaine et du mois, généré automatiquement |
| 7 | **Cours complets** | Cours rédigés par sections (définition, propriété, méthode, exemple, astuce, piège), fiches, vidéos, exercices corrigés |
| 8 | **Quiz et exercices** | QCM, vrai/faux, réponse à écrire, calcul, associations — avec correction et explication |
| 9 | **Statistiques** | Temps de travail, répartition par matière, évolution de la moyenne, chapitres à revoir |
| 10 | **Mode concentration** | Minuteur Pomodoro, objectif de session, temps enregistré automatiquement |
| 11 | **Rappels** | Contrôles, devoirs, révisions, avec alerte quelques jours avant |
| 12 | **Paramètres** | Profil, rythme de travail, thème clair/sombre, sauvegarde et restauration |

## Contenu fourni au départ

Les **11 matières** de 3ᵉ et leurs chapitres sont préremplis, avec pour chacun un cours
rédigé, une fiche de révision (l'essentiel, les formules, les pièges), des quiz corrigés
et, pour les matières principales, des exercices type brevet avec correction détaillée.

Mathématiques · Français · Histoire-Géographie-EMC · SVT · Physique-Chimie · Anglais ·
Espagnol · Technologie · Arts plastiques · Éducation musicale · EPS

**Tout est modifiable** : ajouter ou supprimer une matière, un chapitre, une section de
cours, un point de fiche, une vidéo. Un emploi du temps type est également chargé, à
adapter au vrai.

Les vidéos ouvrent une **recherche YouTube** ciblée sur le chapitre plutôt qu'un lien fixe
susceptible de disparaître ; on peut ensuite enregistrer le lien de celle qu'on a préférée.

## Comment le programme est calculé

Chaque chapitre reçoit un score de priorité qui combine :

- le **niveau de maîtrise** du chapitre (mis à jour à chaque quiz) ;
- les **contrôles et devoirs à venir**, d'autant plus lourds qu'ils sont proches ;
- l'**écart entre la moyenne de la matière et la note visée** ;
- les **erreurs non corrigées** sur ce chapitre ;
- le **temps écoulé depuis la dernière révision** ;
- le **coefficient** de la matière.

Les chapitres les mieux placés sont ensuite convertis en tâches (lire le cours, revoir la
fiche, faire le quiz, faire les exercices, corriger ses erreurs) jusqu'à remplir le temps
disponible du jour, en alternant les matières.

## Développement

```bash
npm install
npm run dev        # serveur de développement
npm run build      # build de production dans dist/
npm run preview    # prévisualisation du build
npm run typecheck  # vérification des types
```

Pile technique : React 19, TypeScript, Vite, Tailwind CSS v4, React Router.
Aucune dépendance d'exécution en dehors de React et du routeur : les graphiques,
les icônes et le rendu de texte enrichi sont écrits à la main.

### Organisation du code

```
src/
  content/     contenu pédagogique (une matière par fichier) + données d'exemple
  store/       types, reducer, persistance localStorage, sélecteurs et calculs
  components/  interface (ui/, charts/, layout/) et composants partagés
  pages/       un fichier par écran
  hooks/       génération du programme, état local persistant
  lib/         dates, formats, couleurs, utilitaires
```

Le contenu pédagogique est séparé du code : pour ajouter une matière, il suffit d'écrire
un fichier dans `src/content/` sur le modèle des autres et de l'ajouter à `SEEDS`
dans `src/content/index.ts`.

## Mise en ligne

Le build utilise des chemins relatifs : `dist/` peut être servi depuis n'importe quel
hébergeur statique ou sous-dossier. Un workflow GitHub Actions publie automatiquement
sur GitHub Pages à chaque push sur la branche par défaut — à activer dans
*Settings → Pages → Source : GitHub Actions*.

L'application est en ligne à l'adresse **https://lll65.github.io/Loukia-App/** et se met
à jour toute seule à chaque push.

À savoir : GitHub Pages est gratuit sur un dépôt public, mais demande un abonnement payant
sur un dépôt privé. Si le dépôt repasse en privé sans abonnement, il suffit de déposer le
contenu de `dist/` sur Netlify ou Cloudflare Pages (glisser-déposer du dossier, aucune
configuration nécessaire).

## Installer sur le téléphone

- **iPhone** : ouvrir le site dans Safari → bouton Partager → « Sur l'écran d'accueil ».
- **Android** : ouvrir le site dans Chrome → menu ⋮ → « Installer l'application ».

## Sauvegardes

Les données vivent dans le stockage local du navigateur. Depuis *Paramètres → Mes données* :
**Exporter une sauvegarde** produit un fichier `.json`, **Restaurer une sauvegarde** le
recharge — utile pour changer de téléphone ou après un nettoyage du navigateur.
