<script setup>
import { onBeforeUnmount } from "vue";
import { useRecette } from "@/stores/recette";

const store = useRecette();

onBeforeUnmount(store.resetForm);
</script>

<template>
  <form @submit.prevent="store.storeRecette" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">ajoutez une recette</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">nom de la recette</label>
        <input
          v-model="store.form.name"
          id="name"
          name="name"
          type="text"
          class="form-input plate"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="name" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="url_video" class="required"
          >fichier video <span>(type: mp4 )</span></label
        >
        <input
          id="url_video"
          name="url_video"
          type="file"
          class="form-input plate"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="name" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="description">Description</label>

        <textarea
          v-model="store.form.description"
          cols="30"
          rows="10"
          id="description"
          name="description"
          type="text"
          class="form-input"
          placeholder="la description les etapes, les conseils etc..."
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="description" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="store.loading"
        >
          <IconSpinner class="animate-spin" v-show="store.loading" />
          ajouter la recette
        </button>
        <!-- <RouterLink :to="{ name: 'vehicles.index' }" class="btn btn-secondary">
          Cancel
        </RouterLink> -->
      </div>
    </div>
  </form>
</template>
