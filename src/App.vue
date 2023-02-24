<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="py-6 bg-gray-100 shadow">
    <div class="container md:px-2 px-4 mx-auto">
      <nav class="flex gap-4 justify-between">
        <div class="flex gap-4 items-center">
          <h2 class="text-xl font-bold">
            <div
              class="inline-flex items-center justify-center w-6 h-6 text-center"
            >
              <img src="@/assets/cuistotuto-logo.svg" />
            </div>
            Cuistotutos
          </h2>
          <RouterLink class="router-link" :to="{ name: 'home' }">
            Acceuil
          </RouterLink>
        </div>
        <div class="flex gap-4 items-center">
          <RouterLink class="router-link" :to="{ name: 'register' }">
            Inscription
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <div class="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
    <RouterView />
  </div>
</template>
