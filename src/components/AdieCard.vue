<template>
  <v-card>
    <span :style="`color: ${ color };`">{{ text }}</span>
    <v-btn color="yellow-adie">Button</v-btn>
  </v-card>
</template>

<script setup>
 import { defineProps } from 'vue';

 const props = defineProps({
   color: {
     default: () => 'red',
     required: false,
     type: String
   },
   text: {
     required: true,
     type: String,
   }
 });
</script>

<style lang="scss">
  .bg-yellow-adie {
    background-color: $yellow !important;
  }
</style>