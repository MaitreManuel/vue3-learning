# Les bases de Vue 3

## Syntaxes Vue 3

#### Option API

- tout est rangé par section : `components`, `props`, `data`, `computed`, `watch`, `methods`, etc...
- syntaxe compatible entre Vue 2 et 3

```js
/* Parent */
<template>
  <fruit :color="fruitColor" :set-color="setColor">
    <template v-slot:fruitName>
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
    <template v-slot:fruitName>
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
    <template v-slot:fruitName>
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
    
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };
</script>
```


## Instance de Vue

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
est identique à :

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

On peut créer des listes dynamiques avec des tableaux, des objets et même des `range`.
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

#### Data binding

```js
<input v-model="text" />
```

#### Gestion des évènements

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