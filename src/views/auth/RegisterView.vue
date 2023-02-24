<script setup>
import { onBeforeUnmount } from "vue";
import { useRegister } from "@/stores/register";

const store = useRegister();

onBeforeUnmount(store.resetForm);
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Inscription</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="lastname" class="required">Nom</label>
        <input
          v-model="store.form.lastname"
          id="lastname"
          name="lastname"
          placeholder="entrez votre nom"
          type="text"
          class="form-input"
          autocomplete="lastname"
          required
        />
        <ValidationError :errors="store.errors" field="lastname" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="firstname" class="required">Prénom</label>
        <input
          v-model="store.form.firstname"
          id="firstname"
          name="firstname"
          type="text"
          class="form-input"
          placeholder="entrez votre prénom"
          autocomplete="firstname"
          required
        />
        <ValidationError :errors="store.errors" field="firstname" />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          id="email"
          v-model="store.form.email"
          name="email"
          type="email"
          class="form-input"
          placeholder="exemple@gmail.com"
          autocomplete="email"
          required
        />
        <ValidationError :errors="store.errors" field="email" />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Mot de passe</label>
        <input
          id="password"
          v-model="store.form.password"
          name="password"
          type="password"
          class="form-input"
          placeholder="entrez votre mot de passe"
          autocomplete="new-password"
          required
        />
        <ValidationError :errors="store.errors" field="password" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="password_confirmation" class="required">
          Confirmez votre mot de passe
        </label>
        <input
          id="password_confirmation"
          v-model="store.form.password_confirmation"
          name="password_confirmation"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
        />
      </div>

      <hr class="my-6" />

      <div class="flex flex-col gap-2">
        <button :disabled="store.loading" type="submit" class="btn btn-primary">
          Valider
          <icon-spinner-component v-show="store.loading" />
        </button>
      </div>
    </div>
  </form>
</template>
