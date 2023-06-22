# Les bases de Vue 3

## Syntaxes Vue 3

#### Option API

- tout est rangé par section : `components`, `props`, `data`, `computed`, `watch`, `methods`, etc...
- syntaxe compatible entre Vue 2 et 3

```js
/* Parent */
<template>
  <fruit :color="fruitColor" :set-color="setColor">
    <template #fruitName>
      <span>{{ fruitName }}</span>
    </template>
  </fruit>
</template>

<script>
  import Fruit from '@Src/Fruit.vue';
  
  export default {
    components: {
      Fruit
    },
  
    data() {
      return {
        fruitColor: 'green',
        fruitName: '',
      };
    },
  
    mounted() {
      this.fruitName = 'Apple';
    },
  
    methods: {
      setColor(color) {
        this.fruitColor = color;
      },
    },
  };
</script>
/* Enfant */
<template>
  <p @click="changeColor">
    <span>{{ color }}</span>
    <slot name="fruitName"></slot>
  </p>
</template>

<script>
  export default {
    props: {
      color: {
        required: true,
        type: String,
      },
      setColor: {
        required: true,
        type: Function,
      },
    },
  
    methods: {
      changeColor() {
        const colors = ['green', 'orange', 'red', 'yellow'];

        this.setColor(colors[Math.floor(Math.random() * colors.length)]);
      },
    },
  };
</script>
```

#### Composition API

- plus de sections `data` et `methods`, tout dans `setup`
- les données doivent être "enveloppées" par les méthodes `ref` et `reactive`
- plus de contexte `this`

```js
/* Parent */
<template>
  <fruit :color="fruitColor" :set-color="setColor">
    <template #fruitName>
      <span>{{ fruitName }}</span>
    </template>
  </fruit>
</template>

<script>
  import { onMounted, ref } from 'vue';

  import Fruit from '@Src/Fruit.vue';

  export default {
    components: {
      Fruit
    },
  
    setup() {
      const fruitColor = ref('green');
      const fruitName = ref('');

      onMounted(() => {
        fruitName.value = 'Apple';
      });

      const setColor = (color) => {
        fruitColor.value = color;
      };
      
      return {
        fruitColor,
        fruitName,
        setColor,
      };
    },
  };
</script>
/* Enfant */
<template>
  <p @click="changeColor">
    <span>{{ color }}</span>
    <slot name="fruitName"></slot>
  </p>
</template>

<script>
  export default {
    props: {
      color: {
        required: true,
        type: String,
      },
      setColor: {
        required: true,
        type: Function,
      },
    },
  
    setup(props, { attrs, emits, expose, slots }) {
      const changeColor = () => {
        const colors = ['green', 'orange', 'red', 'yellow'];

        props.setColor(colors[Math.floor(Math.random() * colors.length)]);
      };
      
      return {
        changeColor,
      };
    },
  };
</script>
```

- les données et fonctions doivent être exposées au template
- Composition API amène plus de code

#### Script setup

- Composition API en plus poussé et bien plus léger
- Tout est à définir

```js
/* Parent */
<template>
  <fruit :color="fruitColor" :set-color="setColor">
    <template #fruitName>
      <span>{{ fruitName }}</span>
    </template>
  </fruit>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  
  import Fruit from '@Src/Fruit.vue';
  
  const fruitColor = ref('green');
  const fruitName = ref('Apple');

  onMounted(() => {
    fruitName.value = 'Apple';
  });
  
  const setColor = (color) => {
    fruitColor.value = color;
  };
</script>

/* Enfant */
<template>
  <p @click="changeColor">
    <span>{{ color }}</span>
    <slot name="fruitName"></slot>
  </p>
</template>
<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    color: {
      required: true,
      type: String,
    },
    setColor: {
      required: true,
      type: Function,
    },
  });
  
  const changeColor = () => {
    const colors = ['green', 'orange', 'red', 'yellow'];
    
    props.setColor(colors[Math.floor(Math.random() * colors.length)]);
  };
</script>
```

## Injection de Vue

```js
import { createApp } from 'vue';
import App from '@Src/App.vue';

const app = createApp(
  App, {
    name: 'Vue'
  }
);

app.mount('#vueapp');
```

## Directives

#### Syntaxe

Les directives sont préfixés la plus part du temps par `v-directive="js code"`.
<br> Se sont des alias qui permettent d'appliquer des comportements aux éléments de DOM.

#### Attribut dynamique

Il est possible de lier dynamiquement des attributs HTML avec des valeurs JavaScript.
<br> On peut l'écrire de deux manières :

```js
<div v-bind:id="fruitName"></div>
```
est identique à

```js
<div :id="fruitName"></div>
```

#### Rendu conditionnel

En fonction des données que l'on attend, on peut créer des conditions pour afficher certaines parties de DOM.
<br> Ces conditions fonctionnent comme celles en JavaScript.

```js
<p v-if="fruit === 'apple'">Apple !</p>
<p v-else-if="fruit === 'cherry'">Cherry !</p>
<p v-else>Yuk, pinapple..</p>
```

Il existe aussi la directive `v-show` pour jouer avec la visibilité d'un élément de DOM.
<br> Il ajoute en CSS un `display: none;` si la condition est fausse.

```js
<p v-show="apple">Apple ?</p>
```

#### Rendu de liste

Pour créer des listes dynamiques avec des tableaux, des objets et même des `range`, on utilise la directive `v-for`
<br> Cela arrive le plus souvent lorsque l'on execute des requêtes asynchrones.

```js
// fruits = ['apple', 'banana', 'cherry']
<ul v-for="(fruit, index) in fruits">
  <li>{{ `${ index + 1 }. ${ fruit }` }}</li>
  <!-- <li>1. apple</li> -->
  <!-- <li>2. banana</li> -->
  <!-- <li>3. cherry</li> -->
</ul>
// fruit = { color: 'green', name: 'apple' }
<ul v-for="(value, key, index) in fruits">
  <li>{{ `${ index + 1 }. ${ key }: ${ value }` }}</li>
  <!-- <li>1. color: green</li> -->
  <!-- <li>2. name: apple</li> -->
</ul>
<ul v-for="idx in 3">
  <li>{{ idx }}</li>
  <!-- <li>1</li> -->
  <!-- <li>2</li> -->
  <!-- <li>3</li> -->
</ul>
```

#### Liaison de classes

Il est possible d'associer des valeurs JavaScript à des classes CSS.
<br> Comme pour les attributs simples, on peut utiliser `:class` au lieu `v-bind:class`.
<br> Il y a plusieurs cas de figure :

- Rendu conditionnel

```html
<p :class="{ active: isActive }" /></p>
```

Attention pour les noms composés avec `-`, il faut ajouter des guillemets.

```html
<p :class="{ 'active-class': isActive }" /></p>
```

- Rendu de tableau

```html
<p :class="[apple ? 'green' : 'red', 'clean']" /></p>
```

- Rendu littéraux de gabarit

```html
<p :class="{ apple ? 'green' : 'red' }" /></p>
```

#### Liaison de style

Comme pour les liaisons de classes, il est possible d'associer des valeurs JavaScript à des règles CSS. 

```html
<p :style="{ color: fruitColor }" /></p>
```

#### Gestion des évènements

Pour attacher des évènements aux éléments de DOM, on utilise la directive `v-on:` ou l'alias `@`.

```js
<button type="button" v-on:click="nbClick =+ 1">Click n°{{ nbClick }}</button>
```

est identique à

```js
<button type="button" @click="nbClick =+ 1">Click n°{{ nbClick }}</button>
```

Il est possible d'ajouter des modificateurs d'évènements et même de les chaîner :

- `.stop`: appelle event.stopPropagation(), empêchera dans ce cas les évènements `click` parents de se déclencher

```js
<div @click="alert('clicked ?')">
  <button type="button" @click.stop="clickMe">Clicked</button>
</div>
```

- `.prevent`: appelle event.preventDefault(), empêchera dans ce cas le formulaire de recharger la page du navigateur

```js
<form @submit.prevent="nbClick =+ 1"></button>
```

- `.capture`: utilise le mode « capture » lorsque l'écouteur d'évènements est ajouté, un évènement destiné à un élément interne est géré ici avant d'être géré par ses éléments parents
- `.self`: seulement déclenché si l'instruction `event.target` est l'élément lui-même, cela ne s'applique pas aux éléments enfants
- `.once`: l'évènement « click » sera déclenché qu'une fois
- `.passive`: le comportement par défaut de l'évènement se produit immédiatement

Pour les évènements clavier tels que `keyup`, on peut spécifier directement la touche plutôt que d'utiliser le `event.keyCode` :

- `.enter`
- `.tab`
- `.delete` (marche pour les touches "Suppr" et "Backspace")
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

```js
<input @keyup.enter="sendForm" />
```

Il existe deux manières de récupérer l'évènement de DOM d'origine avec une variable de contexte `$event` ou en utilisant
une fonction fléchée.

```js
<button type="button" @click="handleClick($event)">Click</button>
```

```js
<button type="button" @click="(event) => handleClick(event)">Click</button>
```

On peut aussi créer des évènements "fait-maison".

```js
/* Enfant */
<input @input="onInputText" />

import { defineEmits } from 'vue';

const emit = defineEmits(['inputText']);

const onInputText = (text) => {
  emit('inputText', text);
};

/* Parent */
<my-input @inputText="handleInputText" />
```

#### Data binding

Pour lier une valeur JavaScript en lecture et écriture à un élément de DOM, on utilise la directive `v-model`.
<br> C'est un alias entre la directive `v-bind:value` et `v-bind:change` ou `v-bind:input` selon l'élément.

- Type `text`

```js
// text = ref('Apple')
<input v-model="text" type="text" />
```

```js
// text = ref('An apple a day keeps the doctor away!')
<textarea v-model="text"></textarea>
```

- Type `checkbox` simple

```js
// active = ref(true)
<input v-model="active" type="checkbox" />
```

- Type `checkbox` multiple

```js
// fruits = ref(['apple'])
<input v-model="fruits" type="checkbox" value="apple" />
<input v-model="fruits" type="checkbox" value="cherry" />
```

- Type `radio`
```js
// selectedFruit = 'apple'
<input v-model="selectedFruit" type="radio" value="apple" selected />
<input v-model="selectedFruit" type="radio" value="cherry" />
```

- Type `select` simple
```js
// selectedFruit = 'Cherry'
<select v-model="selectedFruit">
  <option disabled value="">Select a fruit :</option>
  <option>Apple</option>
  <option>Banana</option>
  <option selected>Cherry</option>
</select>
```

- Type `select` multiple
```js
// fruitsSalad = ['apple', 'cherry']
<select v-model="selectedFruit">
  <option disabled value="">Select one or more fruits :</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</select>
```

## Composant

#### Single File Components

Ou SFC, définit un composant monofichier avec une syntaxe réunissant 3 parties : le `template` HTML, le `script` JavaScript
et le `style` CSS.
<br> En Vue, les fichiers ont comme extension `.vue`;
<br> Il est possible de renseigner un moteur spécifique pour chaque :
```html
<template lang="pug">
<script lang="ts">
<style lang="scss">
```

- Template

```html
<template>
  <h1>Title</h1>
  <h3>Subtitle</h3>
  <div class="wrapper">
    <p>Text</p>
  </div>
</template>
```

- Script

```js
<script setup>
  import { onMounted } from 'vue';

  const myVar = ref('');

  onMounted(() => {
  console.log('App loaded');
});
</script>
```

- Style

```css
<style>
  div {
    background: red;
  }

  div p {
    color: white;
  }
</style>
```

#### Cycle de vie

Chaques composants possèdent des fonctions prédéfinies qui représentent son cycle de vie et sont déclenchées à partir de
leur appel dans le composant parent et lorsqu'e d''une donnée réactive est amenée à muter.

```js
<script setup>
  import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from 'vue';
  
  // equivalent between beforeCreate & create

  onBeforeMount(() => {
  
  });
  onMounted(() => {
  
  });
  onBeforeUpdate(() => {
  
  });
  onUpdated(() => {
  
  });
  onBeforeUnmount(() => {
  
  });
  onUnmounted(() => {
  
  });
</script>
```

#### Données reactives

Un composant possède ses propres données disponibles qu'à l'intérieur de ce dernier. Elles sont wrappées avec une méthode `ref()`.
<br> Chaque mutation de donnée déclenche une partie de son cycle de vie.
<br> Attention, son utilisation dans le `script` est différente. Pour lui assigner une nouvelle valeur, il faut ajouter `.value`.
Dans le `template`, elle est exposée et n'en a pas besoin.

```js
<template>
  <p>{{ fruit }}</p>
</template>

<script setup>
  import { ref } from 'vue';

  const fruit = ref('');

  fruit.value = 'Apple';
</script>
```

#### Props

Les `props` sont des paramètres qui se passent entre le composant parent et le composant enfant, un peu comme des fonctions.
<br> Il est aussi possible de modifier des données d'un composant parent via un composant enfant via une fonction passée
comme `props`.

```js
/* Enfant */
<template>
  <p @click="setText('Mama mia')">{{ text }}</p>
</template>
<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    text: {
      required: true,
      type: String,
    },
    setText: {
      required: true,
      type: Function,
    },
  });
</script>
/* Parent */
<template>
  <child :text="someText" :set-text="changeText" />
</template>
<script setup>
  import { ref } from 'vue';
  
  import Child from '@Src/Child.vue';
  
  const someText = ref(`It's me Mario`);
  
  const changeText = (text) => {
    someText.value = text;
  };
</script>
```

#### Computed

Avec `computed`, il est possible de créer des données en lecture seule qui se mettent automatiquement à jour avec des données
telles que `ref`.

```js
<template>
  <p>Hi ! My name is {{ fullname }}</p>
</template>
<script setup>
  import { computed, ref } from 'vue';

  const firstname = ref('John');
  const lastname = ref('Doe');
  
  const fullname = computed(() => `${ firstname.value } ${ lastname.value }`);
</script>
```

#### Watch

Les fonctions `watch` permettent d'écouter les changements de valeur de n'importe quelles propriétés, même celles créées
avec `computed`.

```js
<script setup>
  import { computed, ref, watch } from 'vue';

  const fruits = ref(['apple', 'cherry', 'pinapple']);

  const fruitsSalad = computed(() => fruits.value.join(' and '));
  
  watch(fruitsSalad, (newSalad, oldSalad) => {
    if (fruits.indexOf('pinapple') > -1) {
      console.error(`yuk... I prefer the old salad with ${ oldSalad }`);
    }
  });
</script>
```

#### Slots

Les `slots` sont une manière d'injecter des templates HTML dans un composant enfant depuis un composant parent.
<br> Ils fonctionnent quasiment de la même manière que les props et on peut les nommer pour en ajouter plusieurs à la fois.

```js
/* Parent */
<template>
  <fruit>
    <span>{{ fruitName }}</span>
    <template #color>
      <span>{{ fruitColor }}</span>
    </template>
    <template #condition>
      <span>{{ fruitCondition }}</span>
    </template>
  </fruit>
</template>
<script setup>
  import { ref } from 'vue';

  const fruitColor = ref('Green');
  const fruitCondition = ref('pristine');
  const fruitName = ref('apple');
</script>
/* Enfant */
<template>
  <p>
    <slot name="color"></slot>
    <slot name="condition"></slot>
    <slot></slot>
  </p>
</template>
```

Ce qui rendra en HTML :
```html
<p>
  <span>Green</span>
  <span>pristine</span>
  <span>apple</span>
</p>
```

L'ordre au niveau du composant parent n'a pas d'incidence.