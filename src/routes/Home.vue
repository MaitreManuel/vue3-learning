<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="font-weight-light mb-16 text-center">
          Home
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';

import FakeFetch from '@Src/utils/fakeFetch';

const getFruits = async (cb) => {
  cb(await FakeFetch(2000));
};

onMounted(() => {
  console.log('App loaded');

  getFruits((response) => {
    console.log(response);
  });
});
</script>