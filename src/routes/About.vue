<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="font-weight-light mb-16 text-center">
          About
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('About page loaded');
});
</script>