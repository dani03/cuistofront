<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useProfile } from "@/stores/profile";

const store = useProfile();

onMounted(store.fetchProfile);
onBeforeUnmount(store.resetForm);
</script>

<template>
  <button
    data-drawer-target="separator-sidebar"
    data-drawer-toggle="separator-sidebar"
    aria-controls="separator-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="separator-sidebar"
    class="z-40 w-64 rounded-full h-full transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul
        class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
      >
        <li>
          <router-link
            class="router-link flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            :to="{ name: 'update.profile.password' }"
          >
            <span class="ml-4">changez le mot de passe</span>
          </router-link>
          <router-link
            class="router-link flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            :to="{ name: 'recettes.profile' }"
          >
            <span class="ml-4">Mes recettes</span>
          </router-link>
          <router-link
            class="router-link flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            :to="{ name: 'recettes.likes' }"
          >
            <span class="ml-4"> Mes Likes</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>

  <form @submit.prevent="store.updateProfile">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Editez votre profil</h1>
      <div class="alert alert-success mb-4" v-show="store.status">
        {{ store.status }}
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="lastname" class="required">nom</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          class="form-input"
          placeholder="entrez votre nom"
          v-model="store.form.lastname"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="lastname" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="firstname" class="required">Prénom</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          class="form-input"
          placeholder="entrez votre prénom"
          v-model="store.form.firstname"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="firstname" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="required">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-input"
          v-model="store.form.email"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="email" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <button type="submit" class="btn btn-primary" :disabled="store.loading">
        <IconSpinner class="animate-spin" v-show="store.loading" />
        valider
      </button>
    </div>
  </form>
</template>
