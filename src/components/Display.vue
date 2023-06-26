<template>
  <p>{{ text }}</p>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    text: {
      required: true,
      type: String
    }
  });

  console.log(props.text);
</script>