<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuth } from "@/stores/auth";

const auth = useAuth();
</script>

<template>
  <header class="py-6 bg-gray-100 shadow">
    <div class="container md:px-2 px-4 mx-auto">
      <nav class="flex gap-4 justify-between">
        <div class="flex gap-4 items-center">
          <h2 class="text-xl font-bold">
            <div
              class="router-link inline-flex items-center justify-center w-6 h-6 text-center"
            >
              <img src="@/assets/cuistotuto-logo.svg" />
            </div>
            <a href="/">Cuistotutos</a>
          </h2>
          <template v-if="auth.check">
            <RouterLink class="router-link" :to="{ name: 'recettes.index' }">
              Recettes
            </RouterLink>
          </template>
          <template v-if="auth.check">
            <RouterLink class="router-link" :to="{ name: 'profile' }">
              Profil
            </RouterLink>
            <RouterLink class="router-link" :to="{ name: 'recettes.profile' }">
              Ajouter une recette
            </RouterLink>
          </template>
        </div>
        <div class="flex gap-4 items-center">
          <template v-if="auth.check">
            <button @click="auth.logout" class="router-link">
              Déconnexion
            </button>
          </template>
          <template v-else>
            <div>
              <RouterLink class="router-link" :to="{ name: 'login' }">
                Se connecter
              </RouterLink>
            </div>
            <div>
              <RouterLink class="router-link" :to="{ name: 'register' }">
                Inscription
              </RouterLink>
            </div>
          </template>
        </div>
      </nav>
    </div>
  </header>

  <div class="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
    <RouterView />
  </div>
</template>
