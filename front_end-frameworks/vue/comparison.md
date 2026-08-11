# React vs Vue.js : analyse comparative

Ce document compare les implémentations React et Vue.js de la landing page Agentic AI construite pendant ce cursus. La version React se trouve dans `front_end-frameworks/react/` et la version Vue, migrée depuis celle-ci, se trouve dans `front_end-frameworks/vue/`. Les deux applications partagent les mêmes sections (Header, Hero, About, Features, Insights, Contact, Footer), le même style Tailwind CSS et la même structure de dossiers globale, ce qui en fait une base de comparaison directe plutôt que deux projets sans rapport.

## Composants

### Comment les composants React sont créés

Un composant React est une simple fonction JavaScript qui retourne du JSX. Dans ce projet, chaque fichier de composant (`Header.jsx`, `Button.jsx`, `FeatureCard.jsx`) suit la même forme : une déclaration de fonction, une instruction `return` contenant le balisage, et un export par défaut en bas du fichier.

```jsx
// react/src/components/ui/Button.jsx
function Button({href="#", variant="primary", icon:Icon, target="", rel="", text=""}) {
    const baseClasses = "text-white px-4 py-2 font-semibold rounded-md";
    const variantClasses = variant === "primary" ? "bg-violet-500 hover:bg-violet-600" : "border border-slate-800";
    return (
        <a href={href} target={target} rel={rel} className={`${baseClasses} ${variantClasses}`}>
            {text} {Icon && <Icon />}
        </a>
    )
}
export default Button
```

### Comment les composants Vue sont créés

Un composant Vue est un Single File Component (fichier `.vue`) découpé en trois blocs : `<script setup>` pour la logique, `<template>` pour le balisage, et optionnellement `<style>` pour du CSS scopé.

```vue
<!-- vue/src/components/ui/Button.vue -->
<script setup>
defineProps({
  href: { type: String, default: "#" },
  variant: { type: String, default: "primary" },
  icon: { type: [Object, Function], default: null },
})
const baseClasses = "text-white px-4 py-2 font-semibold rounded-md"
</script>

<template>
  <a :href="href" :class="`${baseClasses} ${variant === 'primary' ? 'bg-violet-500 hover:bg-violet-600' : 'border border-slate-800'}`">
    {{ text }}
    <component :is="icon" v-if="icon" />
  </a>
</template>
```

Il n'y a ni `return` ni export explicite dans la version Vue : tout ce qui est déclaré dans `<script setup>` devient automatiquement disponible dans le template.

### Similarités

Les deux approches encouragent des composants petits et à responsabilité unique, assemblés ensuite en sections plus larges, elles-mêmes assemblées dans la page (`App.jsx` et `App.vue` assemblent tous les deux simplement `Header`, `Hero`, `About`, `Features`, `Insights`, `Contact` et `Footer`). Les deux frameworks supportent les props pour la communication parent-enfant, et tous les deux supportent le rendu conditionnel et le rendu de listes dans le balisage du composant.

### Différences

React mélange balisage et logique dans le même corps de fonction via JSX, tandis que Vue les sépare physiquement dans des blocs différents du même fichier, comme le montre l'exemple `Button` ci-dessus. Les composants React sont de simples fonctions et peuvent être compris avec un raisonnement JavaScript ordinaire (une fonction qui s'exécute et retourne une valeur), tandis que les composants Vue reposent sur une syntaxe spécifique au compilateur à l'intérieur de `<template>`, qui n'a de sens que dans l'écosystème Vue. Cela affecte aussi la réutilisation de logique : extraire de la logique partagée en React se fait généralement via un hook personnalisé (une fonction), tandis qu'en Vue c'est typiquement un "composable" construit autour de `ref`/`computed` — conceptuellement similaire, mais pas du code interchangeable.

## Templates

### JSX

JSX est une syntaxe proche du HTML intégrée directement dans du JavaScript et compilée en appels `React.createElement`. Comme c'est du JavaScript, n'importe quelle expression JavaScript peut être utilisée entre accolades, et tout attribut HTML qui entre en conflit avec un mot-clé JavaScript réservé doit être renommé (`class` devient `className`, `for` devient `htmlFor`) :

```jsx
// react/src/components/sections/Contact.jsx
<label htmlFor="fullName" className="flex items-center gap-2 text-sm text-slate-300 mb-2">
    <UserRound className="text-violet-500" size={16} />
    <span>Full name</span>
</label>
```

### Templates Vue

Les templates Vue sont plus proches du vrai HTML, compilés en fonctions de rendu par le compilateur de templates propre à Vue, plutôt que traités comme du JavaScript. Les noms d'attributs HTML standards sont utilisés directement (`class`, `for`) :

```vue
<!-- vue/src/components/sections/Contact.vue -->
<label for="fullName" class="flex items-center gap-2 text-sm text-slate-300 mb-2">
  <UserRound class="text-violet-500" :size="16" />
  <span>Full name</span>
</label>
```

### Avantages et inconvénients

Le plus grand avantage de JSX est d'être "juste du JavaScript" : aucune nouvelle syntaxe à apprendre au-delà des expressions entre accolades, et n'importe quelle fonctionnalité JS (ternaires, `.map()`, évaluation court-circuit) fonctionne directement. Son principal inconvénient est la verbosité pour les motifs courants, puisque le rendu conditionnel et le rendu de listes nécessitent tous deux d'écrire des expressions JavaScript brutes à l'intérieur du balisage :

```jsx
// react/src/components/sections/Insights.jsx
{error && <p className="text-red-400 mb-8">{error}</p>}
```

Les templates de Vue, basés sur des directives, se lisent plus proche du HTML pur et communiquent l'intention plus explicitement :

```vue
<!-- vue/src/components/sections/Insights.vue -->
<p v-if="error" class="text-red-400 mb-8">{{ error }}</p>
```

`v-if` indique clairement "conditionnel" en tant qu'attribut directement sur l'élément, ce qui a rendu le balisage migré plus facile à parcourir visuellement que l'expression React équivalente noyée entre accolades. La contrepartie est que les directives de Vue forment un mini-langage propre aux templates, à apprendre en plus du JavaScript, et que certains motifs triviaux en JSX (passer du balisage comme valeur de prop) n'ont pas d'équivalent direct en template et nécessitent un mécanisme différent (les slots, voir la section Props).

## Props

### Props React

Les props React sont reçues comme unique argument de la fonction composant, généralement déstructurées avec des valeurs par défaut :

```jsx
// react/src/components/ui/Brand.jsx
function Brand({ className = "" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="bg-violet-500 p-1 rounded-lg text-white text-xs">
                <Brain aria-hidden="true" />
            </div>
            <span className="text-white font-bold">Agentic AI</span>
        </div>
    )
}
```

Il n'y a aucune validation intégrée à l'exécution, sauf à utiliser une bibliothèque séparée (PropTypes) ou TypeScript — passer une valeur du mauvais type ne produit donc aucun avertissement par défaut.

### Props Vue

Les props Vue sont déclarées explicitement avec `defineProps`, sous forme d'objet décrivant le type attendu de chaque prop et si elle est requise ou a une valeur par défaut :

```vue
<!-- vue/src/components/ui/Button.vue -->
<script setup>
defineProps({
  icon: { type: [Object, Function], default: null },
})
</script>
```

Cette déclaration est vérifiée à l'exécution en mode développement : passer une valeur du mauvais type affiche un avertissement dans la console sans casser le rendu.

### Similarités et différences

Sur le plan conceptuel, les props circulent dans un seul sens dans les deux frameworks, du parent vers l'enfant, et les deux frameworks les traitent en lecture seule à l'intérieur du composant qui les reçoit. La différence concrète qui a eu le plus d'impact pendant la migration est le mécanisme de fallthrough attributes de Vue : tout attribut passé à un composant Vue qui n'est pas déclaré comme prop, et que le composant rend comme élément racine unique, est fusionné automatiquement sur cet élément racine.

```vue
<!-- vue/src/components/ui/Brand.vue : aucun prop équivalent à className -->
<template>
  <div class="flex items-center gap-2">
    <div class="bg-violet-500 p-1 rounded-lg text-white text-xs">
      <Brain aria-hidden="true" />
    </div>
    <span class="text-white font-bold">Agentic AI</span>
  </div>
</template>
```

```vue
<!-- vue/src/components/layout/Footer.vue -->
<Brand class="mb-4" />
```

`<Brand class="mb-4" />` fonctionne sans que `Brand.vue` déclare ou retransmette un prop `class`, alors que le `Brand.jsx` original (montré plus haut) devait déclarer `className` explicitement et l'interpoler à la main dans le JSX. Ce n'est pas une simple différence de syntaxe : ça change la quantité de code nécessaire pour quelque chose d'aussi courant que permettre à un parent de styler un composant enfant.

Une autre différence concerne la façon dont une référence de composant est passée en tant que prop. React s'appuie sur le fait que JSX résout toute variable capitalisée comme une balise, ce qui permettait à `Button.jsx` de recevoir `icon: Icon` et d'afficher directement `<Icon />` (voir la section Composants). Les templates Vue ne résolvent jamais une variable liée en minuscule comme une balise, donc `Button.vue` utilise la syntaxe dédiée `<component :is="icon" />` pour afficher une référence de composant stockée dans une prop.

Une différence liée concerne le passage de balisage lui-même en tant que prop. React peut le faire car JSX est du JavaScript :

```jsx
// react/src/components/layout/Footer.jsx
<SocialLink href="#" label="Instagram" svg={<svg xmlns="..." fill="currentColor">...</svg>} />
```

Le `<template>` de Vue ne peut pas contenir une valeur de type JSX en tant que prop, donc l'équivalent est un slot au lieu d'une prop :

```vue
<!-- vue/src/components/ui/SocialLink.vue -->
<template>
  <a href="..." class="...">
    <slot />
  </a>
</template>
```

```vue
<!-- vue/src/components/layout/Footer.vue -->
<SocialLink href="#" label="Instagram">
  <svg xmlns="..." fill="currentColor">...</svg>
</SocialLink>
```

## Gestion d'état

### Gestion d'état en React

L'état React est créé avec le hook `useState`, qui retourne une valeur et une fonction de mise à jour. Comme une fonction composant React réexécute tout son corps à chaque rendu, toute valeur dérivée de l'état est écrite comme une simple `const` et est automatiquement recalculée au rendu suivant :

```jsx
// react/src/components/sections/Contact.jsx
const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
const isFullNameValid = formData.fullName.trim().length >= 2;
```

### État réactif en Vue

L'état Vue est créé avec `ref()`, accédé et modifié via la propriété `.value` à l'intérieur de `<script setup>`, et automatiquement déballé (pas besoin de `.value`) à l'intérieur du template. Contrairement à une fonction composant React, `<script setup>` ne s'exécute qu'une seule fois, à la création du composant, pas à chaque changement d'état. En conséquence, les valeurs dérivées doivent être enveloppées dans `computed()` pour rester synchronisées avec leur état source :

```js
// vue/src/components/sections/Contact.vue
const formData = ref({ fullName: "", email: "", message: "" })
const isFullNameValid = computed(() => formData.value.fullName.trim().length >= 2)
```

C'est le piège le plus important rencontré pendant la migration de `Contact.vue` : écrire `isFullNameValid` comme une simple `const` (`const isFullNameValid = formData.value.fullName.trim().length >= 2`), en suivant le motif React à la lettre, aurait produit du code qui compile sans erreur mais ne se met jamais à jour après le rendu initial, puisque rien ne réexécute le calcul quand `formData` change.

### Similarités et différences

Les deux modèles sont réactifs au sens où mettre à jour l'état déclenche un nouveau rendu des parties de l'interface qui en dépendent. Le mécanisme sous-jacent diffère : la réactivité de React est obtenue en réexécutant toute la fonction composant et en comparant le DOM virtuel résultant (un modèle "pull" piloté par la réexécution), tandis que la réactivité de Vue suit les dépendances à une granularité plus fine via des proxies (`ref`) et ne met à jour que les parties du DOM qui dépendent réellement de la valeur modifiée, sans réexécuter la fonction setup.

## Cycle de vie

### Logique de cycle de vie en React

Les composants fonction gèrent les effets de bord avec `useEffect`. Exécuter du code une seule fois, au montage du composant, se fait en passant un tableau de dépendances vide. Le callback de `useEffect` ne peut pas être lui-même une fonction `async`, car React s'attend à ce que le callback retourne éventuellement une fonction de nettoyage synchrone — récupérer des données a donc nécessité de déclarer une fonction `async` séparée à l'intérieur de l'effet et de l'appeler immédiatement :

```jsx
// react/src/components/sections/Insights.jsx
useEffect(() => {
  async function chargerDonnees() {
    try {
      const resultat = await getInsights();
      setInsights(resultat);
    } catch (erreur) {
      setError("Erreur lors du chargement des données");
    }
  }
  chargerDonnees();
}, [])
```

### Logique de cycle de vie en Vue

Vue expose les hooks de cycle de vie comme des fonctions importées depuis `vue` et appelées directement à l'intérieur de `<script setup>`, comme `onMounted()`. Contrairement à `useEffect`, `onMounted()` accepte directement un callback `async`, puisqu'il n'a pas de contrat de fonction de nettoyage à préserver :

```js
// vue/src/components/sections/Insights.vue
onMounted(async () => {
  try {
    insights.value = await getInsights()
  } catch (erreur) {
    error.value = "Erreur lors du chargement des données"
  }
})
```

Cela a supprimé le besoin de la fonction wrapper intermédiaire : la logique de récupération de données se trouve directement dans le callback passé à `onMounted`.

### Similarités et différences

Les deux mécanismes existent pour exécuter du code en réaction au cycle de vie d'un composant plutôt que pendant le rendu, et les deux sont l'endroit correct pour déclencher une récupération de données. La différence pratique observée pendant la migration est que le modèle de Vue supprime un niveau d'indirection (la fonction wrapper) que le modèle de React rend obligatoire pour la logique de montage asynchrone.

## Rendu conditionnel

### Rendu conditionnel en React

Le rendu conditionnel en JSX se fait avec de simples expressions JavaScript, l'opérateur court-circuit `&&` pour un cas tout-ou-rien :

```jsx
// react/src/components/sections/Insights.jsx
{error && <p className="text-red-400 mb-8">{error}</p>}
```

### Rendu conditionnel en Vue

Vue utilise les directives `v-if` (et `v-else-if`/`v-else`) directement sur l'élément pour le rendu conditionnel :

```vue
<!-- vue/src/components/sections/Insights.vue -->
<p v-if="error" class="text-red-400 mb-8">{{ error }}</p>
```

`Button.vue` utilise aussi `v-if="icon"` pour n'afficher `<component :is="icon" />` que si une icône a effectivement été passée.

### Similarités et différences

Les deux obtiennent le même résultat et sont tout aussi lisibles une fois la syntaxe connue. La différence est structurelle : la logique conditionnelle de React vit à l'intérieur du langage d'expression JavaScript, mélangée au reste du balisage, tandis que la logique conditionnelle de Vue vit sur l'élément lui-même en tant qu'attribut de directive, ce qui garde la condition visuellement attachée à l'élément qu'elle affecte plutôt qu'imbriquée dans des accolades environnantes.

## Rendu dynamique

### Rendu dynamique en React

Les listes sont rendues avec `.map()`, transformant un tableau de données en un tableau d'éléments JSX, chacun nécessitant une prop `key` :

```jsx
// react/src/components/sections/About.jsx
{steps.map((step) => (
    <div className="flex items-start gap-4" key={step.number}>
        <p>{step.number}</p>
        <p>{step.title}</p>
    </div>
))}
```

### Rendu dynamique en Vue

Les listes sont rendues avec la directive `v-for` placée directement sur l'élément à répéter, combinée à un binding `:key` :

```vue
<!-- vue/src/components/sections/About.vue -->
<div class="flex items-start gap-4" v-for="step in steps" :key="step.number">
  <p>{{ step.number }}</p>
  <p>{{ step.title }}</p>
</div>
```

### Similarités et différences

Les deux nécessitent une clé stable pour chaque élément rendu, pour la même raison : aider l'algorithme de diffing du framework à faire correspondre les éléments d'un rendu à l'autre. La différence est là encore syntaxique et structurelle plutôt que conceptuelle : `.map()` est une méthode de tableau généraliste qui se trouve être utilisée pour le rendu, tandis que `v-for` est une directive spécifique au rendu, sans signification en dehors d'un template. L'approche de Vue rend le rendu de listes visuellement distinct du reste de la logique JavaScript du fichier, ce qui était nettement plus facile à repérer d'un coup d'œil en lisant `Features.vue`, comparé à parcourir `Features.jsx` à la recherche de l'appel `.map()` noyé dans le JSX retourné.

## Formulaires

### Gestion de formulaire en React

Le `Contact.jsx` original implémente un formulaire contrôlé : la `value` de chaque champ est liée à un morceau d'état, et un handler `onChange` met à jour cet état à chaque frappe :

```jsx
// react/src/components/sections/Contact.jsx
function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
}
// ...
<input name="fullName" value={formData.fullName} onChange={handleChange} />
```

### Gestion de formulaire en Vue

Le `Contact.vue` migré utilise `v-model`, qui est du sucre syntaxique combinant un binding de valeur et un écouteur d'input en une seule directive :

```vue
<!-- vue/src/components/sections/Contact.vue -->
<input name="fullName" v-model="formData.fullName" />
```

La fonction `handleChange` dédiée présente dans la version React n'est plus nécessaire et a été entièrement supprimée, puisque `v-model` met à jour directement le champ correspondant.

### Similarités et différences

Les deux implémentations gardent les données du formulaire dans un état réactif, et les deux dérivent des indicateurs de validité à partir de cet état (`isFullNameValid`, `isEmailValid`, `isMessageValid`, `isFormValid`) pour contrôler le style des champs et l'état désactivé du bouton de soumission. La différence significative est la quantité de code nécessaire pour le binding bidirectionnel : le motif de champ contrôlé de React nécessite un handler explicite (même partagé entre les champs), tandis que `v-model` de Vue ne nécessite aucun code de handler, au prix de dépendre d'une directive propre à Vue plutôt que de la gestion d'événements classique.

## Événements

### Gestion d'événements en React

Les handlers d'événements sont passés en tant que props avec des noms en camelCase préfixés par `on`, et reçoivent un objet événement synthétique :

```jsx
// react/src/components/sections/Contact.jsx
async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    // ...
}
// ...
<form autoComplete="off" onSubmit={handleSubmit}>
```

### Gestion d'événements en Vue

Vue lie les événements avec la directive `v-on`, généralement écrite avec son raccourci `@`, et prend en charge des modificateurs intégrés :

```vue
<!-- vue/src/components/sections/Contact.vue -->
<script setup>
async function handleSubmit() {
  isSending.value = true
  // ...
}
</script>
<template>
  <form autocomplete="off" @submit.prevent="handleSubmit">
</template>
```

Le modificateur `.prevent` remplace l'appel manuel à `event.preventDefault()`, et comme c'est géré déclarativement par Vue, `handleSubmit` n'a plus besoin de recevoir ni de lire l'objet événement du tout.

### Similarités et différences

Les deux frameworks attachent en fin de compte de vrais écouteurs d'événements DOM, et les deux passent une référence de fonction handler plutôt que de l'appeler directement. La différence qui ressort le plus pendant la migration est le système de modificateurs de Vue : des motifs courants comme empêcher le comportement par défaut, arrêter la propagation, ou restreindre un handler à une touche spécifique sont exprimés déclarativement dans le binding lui-même (`.prevent`, `.stop`, `.enter`) plutôt que comme du code impératif à l'intérieur de la fonction handler.

## Organisation du projet

### Structure du projet React

Le projet React organise `src/` en `components/{ui,cards,layout,sections}/`, `data/`, et `services/`, avec `App.jsx` qui assemble les sections et `main.jsx` qui monte l'application :

```jsx
// react/src/main.jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### Structure du projet Vue

Le projet Vue reproduit exactement la même structure de dossiers, `components/{ui,cards,layout,sections}/`, `data/`, `services/`, avec des fichiers `.vue` qui remplacent les fichiers `.jsx` un pour un, `App.vue` qui remplace `App.jsx`, et `main.js` qui remplace `main.jsx` :

```js
// vue/src/main.js
createApp(App).mount('#app')
```

Il n'y a pas d'équivalent à `StrictMode` : les avertissements du mode développement de Vue sont actifs par défaut, sans wrapper à ajouter explicitement.

### Similarités et différences

La structure de dossiers elle-même n'a nécessité aucun changement pendant la migration, ce qui suggère que la façon dont ce projet organise les composants par rôle (layout, sections, UI réutilisable, cards) n'est pas spécifique à React et se transfère directement à Vue. Les différences se situent au niveau de la configuration plutôt qu'au niveau structurel. `vite.config.js` change juste le plugin de framework :

```js
// react/vite.config.js
plugins: [react(), tailwindcss()],
```

```js
// vue/vite.config.js
plugins: [vue(), tailwindcss()],
```

`eslint.config.js` utilise `eslint-plugin-vue` au lieu de `eslint-plugin-react-hooks`/`eslint-plugin-react-refresh`, et impose une règle de lint supplémentaire propre à Vue, `vue/multi-word-component-names`, sans équivalent côté React, qui a nécessité une liste `ignores` explicite (`Header`, `Footer`, `Hero`, `About`, `Contact`, `Features`, `Insights`, `Brand`, `Button`) pour garder les mêmes noms de composants que la version React :

```js
// vue/eslint.config.js
{
  rules: {
    "vue/multi-word-component-names": ["error", {
      ignores: ["Header", "Footer", "Hero", "About", "Contact", "Features", "Insights", "Brand", "Button"],
    }],
  },
},
```

Les deux projets ont aussi eu besoin d'une cible de déploiement GitHub Pages distincte, pour que déployer la version Vue n'écrase pas la version React déjà déployée sur la même branche `gh-pages` :

```js
// vue/vite.config.js
base: '/holbertonschool-agentic_ai/vue/',
```

```json
// vue/package.json
"deploy": "npm run build && gh-pages -d dist -e vue"
```

## Migration assistée par IA

### Quels outils d'IA ont été utilisés

La migration de React vers Vue a été réalisée avec Claude Code, un assistant de programmation par IA, travaillant directement dans l'arborescence de fichiers du projet. Chaque fichier `.jsx` a été lu intégralement avant que son équivalent `.vue` soit généré, et chaque fichier généré a été relu et discuté avant d'être accepté.

### Ce qui a bien fonctionné

Les fichiers sans syntaxe spécifique à un framework ont migré quasiment sans changement : `data/features.js`, `data/insights.js`, `data/steps.js` et `services/insightsService.js` n'ont nécessité que le changement de l'import des icônes, de `lucide-react` vers `lucide-vue-next`, puisque le reste de leur contenu est du JavaScript pur :

```js
// react/src/data/features.js vs vue/src/data/features.js
import { Bot, Workflow, BrainCircuit, Database, Wrench, ShieldCheck } from 'lucide-react';   // react
import { Bot, Workflow, BrainCircuit, Database, Wrench, ShieldCheck } from 'lucide-vue-next'; // vue
```

La traduction mécanique de syntaxe a aussi été fiable : `className` vers `class`, `htmlFor` vers `for`, `.map()` vers `v-for`, et les expressions conditionnelles vers `v-if` ont toutes été converties proprement dès la première passe.

### Ce qui a nécessité des corrections manuelles

Plusieurs problèmes ne sont apparus qu'après avoir généré le code et l'avoir exécuté. Le `package.json` généré avait initialement une virgule manquante entre deux entrées de scripts :

```json
"preview": "vite preview"
"lint": "eslint .",
```

ce qui a cassé `npm run lint` avec une erreur de parsing JSON, jusqu'à ce que la virgule soit ajoutée. La configuration flat d'ESLint lintait par défaut le dossier `dist/` généré, produisant des dizaines d'erreurs sans rapport venant du code minifié du bundle, jusqu'à l'ajout de `globalIgnores(['dist'])`, reprenant une correction déjà présente dans le `eslint.config.js` du projet React. La règle `vue/multi-word-component-names` rejetait chaque nom de composant à un seul mot hérité de React, et a dû être explicitement configurée avec une liste `ignores`, montrée dans la section Organisation du projet ci-dessus. Le paquet `lucide-vue-next` utilisé pour les icônes est marqué déprécié par npm au profit de `@lucide/vue` ; il a d'abord été remplacé par `@lucide/vue` pendant la tâche de setup du projet, puis remis à `lucide-vue-next` spécifiquement pour cette tâche de migration, parce que son énoncé exige explicitement ce paquet précis par son nom. Aucun de ces problèmes n'a été détecté en relisant simplement le code généré : tous n'ont été trouvés qu'en exécutant réellement `npm run lint` et `npm run build` et en inspectant le résultat.

### Leçons tirées du processus de migration

Traduire la syntaxe ligne par ligne n'est pas suffisant pour produire une migration correcte : les parties du code qui ressemblaient le plus à leur équivalent React n'étaient pas nécessairement les parties qui se comportaient de la même façon. L'exemple le plus clair est celui des indicateurs de validité de `Contact.jsx`, montrés dans la section Gestion d'état : les réécrire comme de simples déclarations `const`, ce qu'une traduction littérale ligne par ligne aurait produit, aurait compilé sans aucune erreur tout en ne se mettant jamais à jour après le premier rendu, parce que Vue ne réexécute pas `<script setup>` comme React réexécute une fonction composant. Repérer ça a nécessité de comprendre *pourquoi* l'approche React fonctionne (toute la fonction se réexécute) plutôt que de simplement voir *ce que* le code fait, et d'appliquer `computed()` précisément parce que le modèle de réactivité sous-jacent diffère. Cela a renforcé l'idée que le code généré par IA doit être relu à la lumière d'une compréhension du modèle d'exécution réel des deux frameworks, pas seulement vérifié pour sa correction syntaxique ou son résultat visuel, puisqu'un bug comme un état de validation figé peut sembler identique à un comportement correct lors d'un test manuel superficiel.
