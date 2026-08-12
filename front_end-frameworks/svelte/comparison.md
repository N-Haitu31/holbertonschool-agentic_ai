# Svelte face à React et Vue.js : analyse comparative

Ce document analyse l'implémentation Svelte de l'application Agentic AI et la compare aux versions React et Vue.js développées précédemment dans ce cursus. Conformément à la consigne de cette task, il ne reprend pas l'intégralité de la comparaison React contre Vue.js déjà réalisée dans `front_end-frameworks/vue/comparison.md` : il se concentre sur ce que l'implémentation Svelte apporte de nouveau à la compréhension des frameworks frontend, en s'appuyant sur les trois versions du projet quand c'est pertinent.

## Comparaison générale

Les trois frameworks résolvent le même problème (découper une interface en composants, gérer un état qui change, réagir aux interactions utilisateur) avec des philosophies très différentes. React et Vue restent, à l'exécution, des bibliothèques qui tournent dans le navigateur et comparent des états pour savoir quoi mettre à jour. Svelte change radicalement d'approche : il s'agit avant tout d'un **compilateur**. Le code `.svelte` n'est pas exécuté tel quel dans le navigateur, il est transformé au moment du build en instructions JavaScript impératives qui manipulent directement le DOM aux bons endroits, sans comparaison d'arbre virtuel ni proxy de réactivité à l'exécution. Cette différence n'est pas qu'un détail d'implémentation : elle explique pourquoi le bundle Svelte de ce projet (`46.43 kB`, non compressé, dans `dist/assets/index-*.js`) est plus léger que l'équivalent Vue (`92.15 kB`) pour une application strictement identique en fonctionnalités.

Les concepts qui apparaissent dans les trois frameworks, malgré des syntaxes totalement différentes, sont : la notion de composant comme unité de réutilisation, les props pour la communication parent-enfant, un mécanisme dédié pour l'état qui déclenche un nouveau rendu, un hook de cycle de vie pour exécuter du code au montage, une syntaxe dédiée pour le rendu conditionnel et le rendu de listes, et la nécessité d'une clé stable pour chaque élément d'une liste rendue dynamiquement. Le fait que ces concepts reviennent systématiquement, sous des noms différents (`useState`/`ref`/`$state`, `useEffect`/`onMounted`/`onMount`), suggère qu'ils répondent à des problèmes réels et récurrents du développement d'interfaces, indépendants du framework choisi.

La différence la plus marquante entre Svelte et les deux autres n'est pas syntaxique mais architecturale : React et Vue transportent une bibliothèque de runtime dans le navigateur ; Svelte transporte le minimum de code nécessaire, généré sur mesure pour l'application, le reste du travail ayant déjà été fait par le compilateur en amont.

## Composants Svelte

Un composant Svelte est un fichier `.svelte` qui, comme un composant Vue, sépare `<script>` (la logique) du markup (l'affichage). La différence structurelle la plus visible avec Vue est l'absence de balise `<template>` : le markup n'est pas enveloppé, il commence directement après la fermeture de `</script>`, au même niveau que le script lui-même, sans conteneur autour. C'est apparu de façon récurrente comme source d'erreur pendant la migration : le réflexe acquis avec Vue (chercher un wrapper pour le HTML) a plusieurs fois conduit à écrire du markup à l'intérieur des balises `<script>` par erreur, ce qui provoque une erreur de compilation immédiate puisque `<script>` n'attend que du JavaScript.

`src/components/ui/Brand.svelte` illustre bien l'organisation d'un fichier Svelte simple :
```svelte
<script>
  import { Brain } from 'lucide-svelte'
  let { className = "" } = $props();
</script>

<div class="flex items-center gap-2 {className}">
  <div class="bg-violet-500 p-1 rounded-lg text-white text-xs">
    <Brain aria-hidden="true" />
  </div>
  <span class="text-white font-bold">Agentic AI</span>
</div>
```

Ce qui a semblé le plus simple à l'usage, comparé à React et Vue, est l'absence totale de `.value` pour manipuler l'état réactif (voir la section suivante) et l'absence d'export explicite du composant : contrairement à React (`export default Brand`), un fichier `.svelte` est intrinsèquement le composant, sans qu'il soit nécessaire de l'exporter soi-même. Ce qui a le plus surpris, en revanche, est l'absence de fallthrough automatique des attributs, détaillée plus loin dans la section sur les props : un réflexe acquis avec Vue qui ne se transpose pas à Svelte.

## Templates et syntaxe

Le template Svelte ressemble, en apparence, à du HTML augmenté : les attributs dynamiques se notent directement `attribut={expression}`, sans les deux-points de Vue (`:attribut="expression"`) ni la distinction React entre attribut HTML et JSX (`className` au lieu de `class`). Sur ce point précis, Svelte est plus proche du HTML natif que les deux autres frameworks, puisqu'il utilise `class` et `for` sans renommage, comme Vue, mais sans préfixe de binding.

La différence la plus significative concerne l'insertion d'expressions dans une chaîne d'attribut. React résout ce problème nativement grâce aux template literals JavaScript (`` className={`... ${x} ...`} ``), et Vue reproduit ce même mécanisme dans ses attributs liés par `:` (`` :class="`... ${x} ...`" ``). Svelte n'a pas besoin de backticks du tout : le texte statique et les expressions `{...}` peuvent être mélangés directement dans la valeur d'un attribut classique entre guillemets, comme dans `InsightCard.svelte` :
```svelte
<article class="group h-80 relative overflow-hidden rounded-xl {index === 0 ? 'md:col-span-2' : ''}">
```
Ce point est apparu comme la source d'erreur la plus fréquente pendant la migration : le réflexe d'écrire des backticks autour de toute la valeur (habitude directement héritée de React et reproduite en Vue) ne fonctionne pas en Svelte, où cela produit une chaîne littérale contenant du texte `${...}` non interprété plutôt qu'une expression évaluée.

L'avantage de la syntaxe Svelte est sa proximité avec le HTML, ce qui l'a rendue plus rapide à lire une fois les habitudes ajustées. Sa limite est que cette proximité crée une fausse impression de simplicité : à première vue, un fichier `.svelte` ressemble à du HTML classique, mais chaque `{...}` cache une expression JavaScript dont l'interprétation change selon le contexte (attribut, contenu, ou bloc de contrôle), ce qui demande une vigilance particulière à la relecture.

## Props et flux de données

Svelte 5 déclare les props avec la rune `$props()`, déstructurée dans une variable `let` (jamais `const`, puisque la valeur doit pouvoir être réassignée si le parent change ce qu'il transmet) :
```js
let { href = "#", variant = "primary", icon: Icon = null, target = "", rel = "", text = "" } = $props();
```
Ce mécanisme se rapproche conceptuellement de la déstructuration de paramètres en React, jusque dans le détail du renommage : `icon: Icon` fonctionne de façon identique dans les deux frameworks (c'est de la déstructuration JavaScript standard, pas une fonctionnalité propre au framework), et permet d'obtenir une variable locale capitalisée utilisable directement comme balise de composant dynamique, `<Icon />`, sans l'équivalent du `<component :is="icon">` de Vue.

La différence la plus notable avec Vue concerne le fallthrough des attributs. Vue fusionne automatiquement tout attribut non déclaré comme prop sur l'élément racine d'un composant à racine unique. Svelte n'a pas ce mécanisme : chaque prop doit être explicitement déclaré et utilisé, exactement comme en React. C'est pour cette raison que `Brand.svelte` déclare un prop nommé `className` (et non `class`) pour rester cohérent avec la version React, et que son utilisation dans `Footer.svelte` doit reprendre ce nom précis (`<Brand className="mb-4" />`) plutôt que le `class="mb-4"` qui suffit en Vue. Ce qui est resté conceptuellement identique entre les trois frameworks est le sens de circulation des données : les props descendent toujours du parent vers l'enfant, jamais l'inverse, et sont traitées comme des données en lecture seule du point de vue du composant qui les reçoit.

## État et réactivité

Svelte 5 introduit `$state()` pour déclarer une valeur réactive. La différence la plus frappante avec Vue est l'absence totale de `.value`, aussi bien dans le script que dans le template :
```js
let insights = $state([]);
insights = await getInsights();
```
Vue exige `insights.value = ...` dans le script (même si le template le déballe automatiquement). React n'a pas de `.value` non plus, mais passe par une fonction de mise à jour dédiée (`setInsights(...)`) plutôt qu'une réassignation directe de la variable. Svelte se situe donc entre les deux : pas de wrapper à déréférencer comme Vue, mais une réassignation directe plutôt qu'un setter séparé comme React. En termes de quantité de code, c'est la syntaxe la plus courte des trois pour ce cas précis.

La leçon la plus importante sur la réactivité, tirée directement d'une erreur commise pendant la migration de `Contact.svelte`, concerne les valeurs dérivées. Les quatre indicateurs de validité du formulaire (`isFullNameValid`, `isEmailValid`, `isMessageValid`, `isFormValid`) ne peuvent pas être de simples `let`/`const` calculées une fois : `<script>` ne s'exécute qu'au moment où le composant est créé, jamais à nouveau ensuite, exactement comme `<script setup>` en Vue. Une valeur calculée à partir d'un état réactif doit donc être explicitement enveloppée dans la rune `$derived()`, l'équivalent syntaxique du `computed()` de Vue :
```js
let isFullNameValid = $derived(formData.fullName.trim().length >= 2);
```
Ce que cette erreur (et sa correction) enseigne sur la réactivité en général, au-delà du cas Svelte : contrairement à React, où l'ensemble du corps du composant se réexécute à chaque rendu et où une valeur dérivée se recalcule donc automatiquement, les frameworks à compilation ou à réactivité fine (Vue, Svelte) exécutent le corps du composant une seule fois et suivent ensuite les dépendances de façon ciblée. Une traduction littérale, ligne à ligne, d'un composant React vers Svelte ou vers Vue produit un code qui compile sans erreur mais dont les valeurs dérivées restent figées sur leur état initial, un bug silencieux qui ne se manifeste qu'à l'usage réel, jamais à la lecture du code ni à la compilation.

## Logique de rendu

Le rendu conditionnel utilise des blocs délimités par des accolades et un mot-clé, `{#if condition}...{/if}`, comparable dans son esprit au `v-if` de Vue mais avec une syntaxe de bloc plutôt que d'attribut placé sur un élément. React, à l'inverse, exprime la même logique avec de purs opérateurs JavaScript (`{condition && <p>...}`) directement mêlés au JSX. Le résultat est identique dans les trois cas, mais Svelte et Vue rendent l'intention plus lisible d'un coup d'œil, puisque le mot-clé de contrôle (`{#if}` ou `v-if`) est visuellement distinct du reste du balisage, alors qu'en React la condition se noie dans une expression JavaScript générique.

Le rendu de listes utilise `{#each tableau as élément (clé)}...{/each}`, où la clé se place entre parenthèses directement après le `as`, une syntaxe propre à Svelte, différente du `:key` de Vue et du `key={...}` de React qui sont, eux, des attributs séparés sur l'élément rendu. `About.svelte` illustre ce point :
```svelte
{#each steps as step (step.number)}
  <div class="flex items-start gap-4">
    <p>{step.number}</p>
  </div>
{/each}
```
`Insights.svelte` illustre en plus la récupération de l'index en complément de l'élément (`{#each insights as insight, index (index)}`), équivalent au deuxième paramètre de `.map()` en React. Dans les trois frameworks, la clé sert le même objectif technique : permettre à l'algorithme de rendu de faire correspondre les éléments d'un rendu à l'autre plutôt que de tout reconstruire.

## Cycle de vie et effets de bord

Svelte expose `onMount`, importé depuis le module `'svelte'`, pour exécuter du code une seule fois au montage du composant. Son comportement est en tout point comparable à celui d'`onMounted` en Vue, jusqu'à un détail technique précis : les deux acceptent un callback `async` directement, sans wrapper intermédiaire, contrairement à `useEffect` en React qui l'interdit, parce qu'il attend que son callback retourne soit `undefined`, soit une fonction de nettoyage synchrone, jamais une Promise. `Insights.svelte` illustre cette simplicité :
```js
onMount(async () => {
  try {
    insights = await getInsights();
  } catch (erreur) {
    error = "Erreur lors du chargement des données";
  }
});
```
Ce qui reste identique malgré la syntaxe différente, dans les trois frameworks, est le rôle fonctionnel de ce hook : déclencher un effet de bord (ici, une récupération de données) au bon moment du cycle de vie, en dehors du flux normal du rendu, avec une gestion d'erreur explicite pour ne pas laisser l'application dans un état incohérent en cas d'échec.

## Formulaires et événements

Le binding de formulaire utilise `bind:value`, une directive qui combine en un seul mot-clé ce que React exprime en deux attributs séparés (`value` + `onChange`) accompagnés d'une fonction `handleChange` généraliste. Vue résout le même problème avec `v-model`. Les trois aboutissent au même résultat fonctionnel, mais avec une quantité de code très différente : la version React de `Contact.jsx` nécessite une fonction `handleChange` dédiée d'une dizaine de lignes, entièrement absente des versions Vue et Svelte, où `bind:value={formData.fullName}` (Svelte) ou `v-model="formData.fullName"` (Vue) suffisent à eux seuls.

La gestion des événements a changé de syntaxe entre Svelte 4 et Svelte 5 : les événements s'écrivent désormais comme des attributs HTML en minuscule, sans les deux-points (`onsubmit={handleSubmit}`), et Svelte n'a pas d'équivalent au modificateur `.prevent` de Vue. Il faut appeler `event.preventDefault()` manuellement, à l'intérieur même de la fonction, exactement comme en React :
```js
async function handleSubmit(event) {
  event.preventDefault();
  ...
}
```
Ce point est notable parce qu'il montre que Svelte ne cherche pas systématiquement à être plus déclaratif que React ou Vue partout : sur la gestion d'événements précisément, Svelte 5 s'est rapproché du style impératif de React plutôt que du style déclaratif de Vue.

## Organisation du projet

L'arborescence du projet Svelte reprend exactement celle des projets React et Vue : `components/{ui,cards,layout,sections}/`, `data/`, `services/`, avec des fichiers `.svelte` remplaçant un pour un les fichiers `.jsx`/`.vue`. Aucune réorganisation n'a été nécessaire, ce qui confirme, pour la troisième fois, que cette façon de découper les composants par rôle n'est pas liée à un framework particulier.

Ce qui a changé pour des raisons propres à l'écosystème Svelte relève uniquement de l'outillage, pas de la structure : l'assistant interactif de configuration d'ESLint (`@eslint/create-config`) ne propose pas Svelte comme option de framework, contrairement à Vue, ce qui a nécessité d'installer et de brancher `eslint-plugin-svelte` manuellement après coup, avec une syntaxe de configuration légèrement différente (`...svelte.configs["flat/recommended"]`, un spread, parce que ce preset exporte un tableau de configurations plutôt qu'un objet unique comme celui de Vue). De la même façon, `lucide-svelte` s'est révélé déprécié au profit de `@lucide/svelte`, exactement le même type d'avertissement déjà rencontré avec `lucide-vue-next` lors du projet Vue, ce qui suggère que ce genre de dépréciation de packages est un aléa habituel de l'écosystème JavaScript, indépendant du framework utilisé.

## Migration assistée par IA

La migration de React vers Svelte a été réalisée avec Claude Code, en s'appuyant explicitement sur les implémentations React et Vue déjà terminées comme référence directe pour chaque composant, plutôt qu'en repartant de la documentation Svelte à chaque fichier. Disposer de deux versions déjà fonctionnelles et strictement équivalentes visuellement a permis de vérifier chaque composant Svelte par comparaison directe plutôt que par relecture isolée, une méthode de validation qui n'était pas disponible lors de la première migration vers Vue.

Ce qui a bien fonctionné : les fichiers sans syntaxe propre au framework (`data/`, `services/`) ont migré sans changement autre que l'import des icônes, confirmant l'observation déjà faite lors du projet Vue selon laquelle le choix du framework n'affecte que la couche d'affichage, jamais la logique métier pure. La traduction des concepts déjà rencontrés une fois avec Vue (props, boucles, rendu conditionnel) a également été rapide, la seconde migration bénéficiant de l'expérience acquise sur la première.

Ce qui a nécessité une correction manuelle relève presque exclusivement d'un phénomène d'interférence entre frameworks récemment appris : des réflexes acquis avec Vue se sont mécaniquement reproduits dans du code Svelte alors qu'ils n'y sont pas valides. Concrètement, cela s'est traduit par du markup écrit à l'intérieur des balises `<script>` (réflexe du `<template>` de Vue), une interpolation en double accolades `{{ variable }}` au lieu de l'accolade simple de Svelte (`{variable}`), et des attributs de classe entourés de backticks alors que Svelte n'en a jamais besoin. Aucune de ces erreurs n'a été détectée à la simple lecture du code généré : toutes ont été repérées soit par la compilation (erreurs de syntaxe bloquantes), soit par une vérification explicite du rendu dans le navigateur, jamais par la seule relecture. Cela confirme qu'une bonne structure de projet original facilite la migration technique (moins de décisions architecturales à reprendre), mais ne dispense jamais de vérifier activement le résultat, la relecture seule n'étant pas suffisante pour détecter des erreurs de syntaxe subtiles entre frameworks proches.

## Perspective professionnelle

Ce projet a montré concrètement que la difficulté de passer d'un framework à un autre n'est pas de mémoriser une nouvelle syntaxe, mais de désapprendre les réflexes automatiques acquis avec le framework précédent : la majorité des erreurs commises pendant cette migration ne venaient pas d'une syntaxe Svelte mal comprise en soi, mais de syntaxe Vue reproduite par automatisme dans un contexte où elle ne s'applique pas. C'est précisément pour cette raison que comprendre l'architecture d'un composant (où vit l'état, comment une prop circule, quand un effet de bord se déclenche) compte davantage que mémoriser une liste de mots-clés : cette compréhension se transfère d'un framework à l'autre, alors que la syntaxe, elle, ne se transfère jamais telle quelle et peut même activement induire en erreur.

L'IA a réduit la barrière entre écosystèmes en accélérant la traduction mécanique du code (la partie qui suit des règles connues et répétitives) et en permettant de comparer immédiatement une implémentation Svelte à ses équivalents React et Vue déjà écrits, sans avoir à rechercher chaque équivalence dans la documentation. Mais cette accélération ne dispense pas de lire, tester, déboguer et valider le résultat : à plusieurs reprises pendant cette migration, du code généré compilait sans erreur tout en produisant un comportement incorrect (silencieusement, sans crash), et seule une vérification active, dans le navigateur ou via les outils de lint et de build, permettait de le détecter. Un développeur qui accepterait du code généré sans le comprendre ni le tester perdrait justement la capacité qui fait la différence entre utiliser l'IA comme outil de productivité et lui déléguer une responsabilité qu'elle ne peut pas assumer seule : garantir que le code fait réellement ce qu'il est censé faire.
