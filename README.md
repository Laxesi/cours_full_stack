# Développement Fullstack — Polytech

Dépôt de travail du cours. Il regroupe les TP du cours magistral et les TD à rendre.

## Structure

    tp/
      back/     projet Gradle + Spring Boot préconfiguré : TP Java / Spring
      front/    répertoire vide, destiné au projet créé par « ng new » : TP Angular
    td/
      back/     TD : API REST de la bibliothèque de films
        http/   requêtes HTTP, exécutées avec l'extension IntelliJ IDEA’s Built-In REST Client
      front/    TD : front Angular de la bibliothèque de films

## Récupération du dépôt

```bash
git clone polytech-fullstack-starter.bundle mon-depot
cd mon-depot
git remote remove origin                 # le bundle ne constitue pas un dépôt distant
git remote add origin <URL du dépôt GitHub>
git push -u origin main
```

## Démarrage

### Back des TP

```bash
cd tp/back
./gradlew build      # Windows : gradlew.bat build
./gradlew bootRun
```

Le wrapper télécharge Gradle 9.7.1 et, le cas échéant, le JDK 21 : aucune installation
manuelle n'est nécessaire. Le fichier `build.gradle` ne déclare qu'une dépendance,
`spring-boot-starter-webmvc`. Elle apporte Spring MVC, Jackson, un Tomcat embarqué ainsi
que `spring-context`, le conteneur IoC utilisé dans les premiers TP.

### Front des TP

```bash
cd tp/front
ng new tp-front      # CSS, sans SSR, « None » pour les outils IA
```

### TD

Le back est généré depuis l'IDE IntelliJ,
**dans `td/back`**, avec la dépendance Spring Web. Le front est généré avec IntelliJ, utilisant `ng new`,
**dans `td/front`**.

## Requêtes HTTP

Ni collection Postman ni collection Bruno : les requêtes sont versionnées dans des fichiers
`.http` placés dans `td/back/http` et exécutées par IntelliJ IDEA’s Built-In REST Client,
via l'action *Send Request* afficher a côté de chaque requête. Un fichier par ressource,
requêtes séparées par `###`. `films.http` contient le squelette du TD 1 et une partie du TD 2, `acteur.http` contient l'autre partie du squelette du TD 2

## Rendus

| Tag   | Contenu                                        |
|-------|------------------------------------------------|
| `td1` | API REST, stockage en mémoire                  |
| `td2` | persistance JPA, DTO, CORS                     |
| `td3` | front Angular branché sur l'API                |

La régularité et la lisibilité des commits ainsi que la mise à jour du `README.md` sont
prises en compte dans l'évaluation.

# Cas particulier : pourquoi je ne l'ai pas (encore) finie
## Trouble spécifique du langage ecrit

Il nous est demandé de réaliser le TD sans utiliser l'IA, c'est donc ce que j'ai fait en utilisant les diapositives de leçon et éventuellement quelques ressources sur internet. Cependant, avec mon trouble spécifique du langage ecrit (ex dyslexie et dysorthographie), lire le cours et les pages web, mais plus particulièrement chercher une info me prend beaucoup plus de temps.

Ce trouble a été diagnostiqué par une orthophoniste et d'ailleurs je dispose actuellement d'aménagements tels que les tiers-temps durant les DS.

## Quelques autres points qui m'ont ralenti ou qui m'ont posé problème

- J'ai mal anticipé l'utilisation de mes composants réutilisables acteur-make-list et film-make-list en demandant comme input pour le /film et /acteur un ```Observable<Acteur[]>``` au lieu de juste ```Acteur[]```, j'ai donc dû réécrire ces composants ainsi que ceux précédant pour pouvoir le réutiliser avec acteur-detail et film-detail.

- J'ai oublié de créer un ActeurDetailDto pour envoyer les films avec les acteurs.

- Je n'ai pas su trouver facilement le moyen d'utiliser l'ID transmis dans la barre d'adresse pour l'envoyer au service afin qu'il fasse la requête API.