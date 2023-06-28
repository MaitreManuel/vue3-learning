<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="font-weight-light mb-16 text-center">
          Home
        </h1>
        <adie-card text="Bonjour trystan" color="blue" />
        <adie-card text="Bonjour joseph" color="yellow" />
        <adie-card text="Bonjour audrey" color="green" />
        <adie-card text="Bonjour Aymenb" />
        <adie-card text="Bonjour Frédéric" color="grey" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';

import AdieCard from '@Src/components/AdieCard.vue';

onMounted(() => {
  console.log('Home page loaded');
});
</script>