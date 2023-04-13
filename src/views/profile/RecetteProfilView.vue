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
        class="focus:outline-none mx-2 w-80 xl:mb-0 m-4 shadow-lg"
      >
        <div>
          <img
            alt="person capturing an image"
            src="https://picsum.photos/281/158?random={{ recette.id }}"
            tabindex="0"
            class="focus:outline-none w-full h-44 rounded-t-lg"
          />
        </div>
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
            <a href="" class="bg-yellow-200 py-1.5 px-6 rounded-full">
              <p
                tabindex="0"
                class="focus:outline-none text-xs text-yellow-700"
              >
                Voir
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
            <div class="flex justify-around">
              <RouterLink
                :to="{ name: 'recette.show', params: { slug: recette.slug } }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="green"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </RouterLink>
              <button @click="store.deleteRecette(recette)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="red"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
