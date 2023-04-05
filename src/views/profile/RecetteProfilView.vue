<script setup>
import { onMounted } from "vue";
import { useRecette } from "@/stores/recette";
const store = useRecette();

onMounted(store.getRecettes);
</script>

<template>
  <div class="flex flex-col mx-auto md:w-100 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Mes Recettes</h1>
    <RouterLink :to="{ name: 'recettes.create' }" class="btn btn-primary w-64">
      ajouter une recette
    </RouterLink>

    <div class="border-t h-[1px] my-6"></div>

    <div class="flex justify-center flex-wrap">
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
            <a
              href="{{ route('home.details', $recette) }}"
              class="bg-yellow-200 py-1.5 px-6 rounded-full"
            >
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
              class="focus:outline-none text-xs text-gray-600 mt-2"
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
  </div>
</template>
