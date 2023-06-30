<template>
  <p>{{ text }}</p>
  <slot name="append"></slot>
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