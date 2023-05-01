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
      <div
        v-if="store.form.ingredients.length > 0"
        class="mt-2 px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-400"
      >
        <span
          v-for="ingredient in store.form.ingredients"
          :key="ingredient.name"
          class="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          {{ ingredient.name }} ( {{ ingredient.quantity
          }}{{ ingredient.unite_mesure }})
          <svg
            @click="store.deleteIngredient(ingredient)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-3 hover:text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="store.loading"
        >
          <icon-spinner-component class="animate-spin" v-show="store.loading" />
          ajouter la recette
        </button>
        <!-- <RouterLink :to="{ name: 'vehicles.index' }" class="btn btn-secondary">
          Cancel
        </RouterLink> -->
      </div>
    </div>
  </form>
</template>
