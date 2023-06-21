# Les bases de Vue 3

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

## Rendu conditionnel

```js
<p v-if="sun && !rain">Sunny day !</p>
<p v-else>Rainny day..</p>
```

## Rendu de liste

```js
<ul v-for="(fruit, index) in fruits">
  <li>{{ `${ index + 1 }. ${ fruit }` }}</li>
</ul>
```

## Liaison de classes

```html
<p :class="[sun ? 'yellow-text' : 'blue-text', 'margin-0']" />Coucou</p>
```

## Data binding

```js
<input v-model="text" />
```

## Gestion des évènements

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

## Syntaxe Vue 3

#### Option API

- tout est rangé par section : `components`, `props`, `data`, `computed`, `watch`, `methods`, ...
- syntaxe compatible Vue 2 & 3

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
        fruitColor = color;
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

        setColor(colors[Math.floor(Math.random() * colors.length)]);
      },
    },
  };
</script>
```

#### Composition API

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
  import { defineProps } from 'vue';

  export default {
    setup() {
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



      return {
        changeColor,
      };
    },
  };
</script>
```

#### Composition API Script setup

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