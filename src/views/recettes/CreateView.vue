<script setup>
import { onBeforeUnmount } from "vue";
import { useRecette } from "@/stores/recette";

const store = useRecette();

onBeforeUnmount(store.resetForm);
</script>

<template>
  <form
    enctype="multipart/form-data"
    @submit.prevent="store.storeRecette"
    novalidate
  >
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
        <label for="urlVideo" class="required"
          >fichier video <span>(type: mp4 )</span></label
        >
        <input
          v-on:change="store.handleFile"
          id="urlVideo"
          name="urlVideo"
          type="file"
          class="form-input plate"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="urlVideo" />
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
      <div>
        <div class="flex flex-col gap-2 mt-4">
          <label for="ingredients" class="required">Ingredients</label>
          <input
            v-model="store.form.ingredientName"
            id="ingredients"
            name="ingredientName"
            type="text"
            class="form-input w-48 plate"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="ingredients" />
        </div>
        <!--  -->
        <div class="inline-flex">
          <div class="flex flex-col gap-2 ml-2">
            <label for="qte" class="required">qté</label>
            <input
              v-model="store.form.quantity"
              type="number"
              name="quantity"
              min="1"
              class="form-input w-16 plate"
              required
            />
          </div>
          <div class="flex flex-col gap-2 ml-2">
            <label for="unite_mesure" class="required">unité de mesure</label>
            <select
              required
              v-model="store.form.unite_mesure"
              class="form-input w-32 plate"
              name="ingredients[]"
              id="unite_mesure"
            >
              <option value="Parts">Parts</option>
              <option value="L">L (Litre)</option>
              <option value="KG">KG (Kilogramme)</option>
              <option value="G">G (Gramme)</option>
            </select>
            <button
              type="button"
              v-show="
                store.form.unite_mesure &&
                store.form.ingredientName &&
                store.form.quantity
              "
              @click="store.clickToAdd"
            >
              valider
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <span
          v-for="ingredient in store.form.ingredients"
          :key="ingredient.name"
          class="bg-blue-100 w-40 text-white-800 text-md font-medium m-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
        >
          {{ ingredient.name }} ( {{ ingredient.quantity
          }}{{ ingredient.unite_mesure }})
        </span>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="store.loading"
        >
          <!-- <IconSpinner class="animate-spin" v-show="store.loading" /> -->
          ajouter la recette
        </button>
        <!-- <RouterLink :to="{ name: 'vehicles.index' }" class="btn btn-secondary">
          Cancel
        </RouterLink> -->
      </div>
    </div>
  </form>
</template>
