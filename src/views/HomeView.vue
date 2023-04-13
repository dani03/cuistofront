<script setup>
import { onMounted } from "vue";
import { useRecette } from "@/stores/recette";
//import { RouterLink } from "vue-router";

const store = useRecette();
onMounted(store.getAllRecettes);
</script>

<template>
  <div class="block bg-gradient-to-r from-green-400 to-blue-500 h-96 static">
    <div
      class="card-img-overlay bg-gray-700 bg-opacity-75 h-3/4"
      style="height: 24rem; z-index: 0; position: relative"
    >
      <p
        class="text-center animate__animated animate__zoomInUp animate__slower 5s text-white p-16 capitalize extrabold text-5xl"
      >
        Cuistotutos
      </p>
      <p class="text-center text-white md:text-center">
        Devenez votre propre chef. Formez vous avec les meilleurs tutoriels.
        <br />

        <button
          class="bg-white hover:bg-gray-100 mt-8 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
        >
          Voir les Tutoriels <i class="fas fa-angle-down"></i>
        </button>
      </p>
    </div>
  </div>
  <div class="flex justify-evenly flex-wrap mt-8">
    <div
      v-for="recette in store.recettes"
      :key="recette.id"
      tabindex="0"
      class="focus:outline-none rounded-lg mx-8 w-1/3 border-x-2 border-green-600 xl:mb-0 m-4 shadow-xl"
    >
      <div class="bg-white rounded-md">
        <div class="flex items-center justify-between px-4 pt-4">
          <button class="mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <a href="" class="bg-green-400 py-1.5 px-6 rounded-full">
            <p tabindex="0" class="focus:outline-none text-xs text-white">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </button>
            </p>
          </a>
        </div>
        <div class="p-4">
          <div class="flex items-center">
            <h2
              tabindex="0"
              class="capitalize focus:outline-none text-lg font-semibold"
            >
              {{ recette.name }}
            </h2>
            <p
              tabindex="0"
              class="focus:outline-none text-xs text-gray-600 pl-5"
            >
              {{ recette.created_at }}
            </p>
          </div>
          <p
            tabindex="0"
            class="focus:outline-none truncate text-sm text-gray-600 mt-2"
          >
            {{ recette.description }}
          </p>

          <div class="flex items-center justify-between py-4">
            <p
              tabindex="0"
              class="focus:outline-none text-xs text-indigo-600 pl-5"
            >
              mise à jour {{ recette.updated_at }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
