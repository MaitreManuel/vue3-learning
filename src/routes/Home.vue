<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <p class="font-weight-light mb-16 text-center">
          Home
        </p>
        <display text="Coucou">
          <template v-slot:append>
            <span>John</span>
          </template>
        </display>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';

import Display from '@Src/components/Display.vue'

onMounted(() => {
  console.log('Home page loaded');
});
</script>