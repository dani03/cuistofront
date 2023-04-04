<script setup>
import { onBeforeUnmount } from "vue";
import { useRecette } from "@/stores/recette";

const store = useRecette();

onBeforeUnmount(store.resetForm);
</script>
<template>
  <div class="align-center">
    <div
      class="w-1/2 text-center alert alert-success mb-4"
      v-show="store.status"
    >
      {{ store.status }}
    </div>
  </div>
  bienvenue! sur les recettes
</template>
