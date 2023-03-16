<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useProfile } from "@/stores/profile";

const store = useProfile();

onMounted(store.fetchProfile);
onBeforeUnmount(store.resetForm);
</script>

<template>
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
