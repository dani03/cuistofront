<script setup>
import { onMounted } from "vue";
import { useRecette } from "@/stores/recette";

const store = useRecette();

onMounted(store.findRecettesLikes);
</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Mes Likes</h1>

    <div class="border-t h-[1px] my-6"></div>
    <div class="flex justify-evenly m-4 flex-wrap">
      <div
        v-for="recette in store.recettesLiked"
        :key="recette.id"
        tabindex="0"
        class="focus:outline-none rounded-lg mx-8 md:w-1/3 border-x-2 border-green-600 xl:mb-0 m-4 shadow-xl"
      >
        <div class="bg-white rounded-md">
          <div class="flex items-center justify-between px-4 pt-4">
            <!-- like button -->
            <button class="mb-3" @click="store.likeRecette(recette)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                :fill="
                  store.likesIdsRecettes.includes(recette.id) ? 'red' : 'white'
                "
                viewBox="0 0 24 24"
                stroke="red"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
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
