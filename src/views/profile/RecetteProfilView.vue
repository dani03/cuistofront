<script setup>
import { onMounted } from "vue";
import { useRecette } from "@/stores/recette";
import { RouterLink } from "vue-router";
const store = useRecette();

onMounted(store.getRecettes);
</script>

<template>
  <div class="flex flex-col mx-auto md:w-100 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Mes Recettes</h1>
    <!-- <RouterLink :to="{ name: 'recettes.create' }" class="btn btn-primary w-64">
      ajouter une recette
    </RouterLink> -->

    <div class="border-t h-[1px] my-6"></div>

    <div class="flex justify-center flex-wrap">
      <div v-if="!store.recettes.length">
        <div>
          <h1>vous n'avez pas de recette</h1>
          <RouterLink
            :to="{ name: 'recettes.create' }"
            class="btn btn-primary w-64"
          >
            ajouter une recette
          </RouterLink>
        </div>
      </div>
      <div
        v-for="recette in store.recettes"
        :key="recette.id"
        tabindex="0"
        class="focus:outline-none rounded-lg mx-8 md:w-1/3 border-x-2 border-green-600 xl:mb-0 m-4 shadow-xl"
      >
        <div class="bg-white rounded-md">
          <div class="flex items-center justify-between px-4 pt-4">
            <!-- like button -->
            <button-like-component :recetteID="recette.id" :recette="recette" />

            <!-- end like button -->
            <!-- watch button camera -->
            <RouterLink
              :to="{ name: 'recette.watch', params: { slug: recette.slug } }"
              class="bg-green-400 py-1.5 px-6 rounded-full"
            >
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
            </RouterLink>
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

            <div class="flex items-center justify-between p-4">
              <p class="focus:outline-none text-xs text-gray-600">
                mise à jour {{ recette.updated_at }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
