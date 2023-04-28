<script setup>
import { watchEffect, onBeforeUnmount, watch } from "vue";
import { useRecette } from "@/stores/recette";

import { useRoute } from "vue-router";
//import Vue3CanvasVideoPlayer from "vue3-canvas-video-player";
import "vue3-canvas-video-player/dist/style.css";
// import Plyr from "plyr";
import "vue-plyr/dist/vue-plyr.css";
import { useComment } from "@/stores/comment";

// const player = new Plyr("#player");
const store = useRecette();
const route = useRoute();
const commentStore = useComment();

onBeforeUnmount(commentStore.resetForm);

watch(
  () => store.oneRecette,
  (newVal) => {
    commentStore.findCommentaires(newVal.commentaires);
    console.log("ici ", newVal);
  },
  { immediate: true }
);
watch(
  () => commentStore.form.commentaire,
  (newVal) => {
    commentStore.watchComment(newVal);
  }
);

watchEffect(async () => {
  store.watchRecette({ slug: route.params.slug });
});
</script>

<template>
  <div class="flex flex-wrap w-full">
    <!-- <div class="w-2/3 rounded p-4">
      {{ store.oneRecette.name }}
      <Vue3CanvasVideoPlayer
        :src="store.oneRecette.link_video"
        :muted="false"
        :autoplay="true"
        :range="[10, 20]"
        :fps="30"
        :bbox="{
          data: {
            100: [0, 200, 100, 400],
            101: [10, 210, 110, 410],
            102: [20, 220, 120, 420],
          },
          borderSize: 1,
          borderColor: 'red',
          fillColor: 'green',
        }"
        :type="'contain'"
        :messageTime="1000"
        :preview="true"
        :darkMode="true"
      />
    </div> -->
    <div class="w-2/3 h-72 p-4 mt-4 mx-2">
      <form
        @submit.prevent="commentStore.handleForm(store.oneRecette)"
        novalidate
      >
        <div
          class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <textarea
              id="comment"
              :maxlength="commentStore.maxLength"
              :bind="commentStore.watchComment"
              v-model="commentStore.form.commentaire"
              rows="3"
              name="commentaire"
              class="w-full px-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="votre commentaire...."
            ></textarea>
            <ValidationError
              :errors="commentStore.errors"
              field="commentaire"
            />
          </div>
          <div
            class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600"
          >
            <button
              type="submit"
              :disabled="
                commentStore.loading ||
                commentStore.form.commentaire.length <= 0
              "
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              commenter
              <icon-spinner-component
                class="animate-spin"
                v-if="commentStore.loading"
              />
            </button>
            <div class="flex pl-0 space-x-1 sm:pl-2 text-white">
              {{ commentStore.caracterLength }} / {{ commentStore.maxLength }}
            </div>
          </div>
        </div>
      </form>

      <div
        v-show="commentStore.showComment"
        class="bg-green-300 border text-green-800 w-48 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">{{ commentStore.status }}</strong>
      </div>
    </div>

    <!-- <video id="player" playsinline controls>
      <source :src="store.oneRecette.link_video" type="video/mp4" />
      <source :src="store.oneRecette.link_video" type="video/mp4" />

      <track
        kind="captions"
        label="English captions"
        src="/path/to/captions.vtt"
        srclang="en"
        default
      />
    </video> -->
  </div>
  <section class="bg-white w-2/3 p-4 mt-4 mb-4 mx-2">
    <div class="w-full text-center text-lg">
      <icon-spinner-component v-if="!commentStore.commentaires" />
    </div>
    <article
      v-show="commentStore.commentaires.slice().reverse()"
      v-for="commentaire in commentStore.commentaires"
      :key="commentaire.id"
      class="px-4 mb-4 py-2 text-base bg-white mx-2 rounded-lg dark:bg-gray-900"
    >
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p
            class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
          >
            <img
              class="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
            />{{ commentaire.user.firstname }}, {{ commentaire.user.lastname }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate datetime="2022-02-08" title="February 8th, 2022">{{
              commentaire.created_at
            }}</time>
          </p>
        </div>
        <button
          id="dropdownComment1Button"
          data-dropdown-toggle="dropdownComment1"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
            ></path>
          </svg>
          <span class="sr-only">modifier</span>
        </button>
        <!-- Dropdown menu -->
      </footer>
      <p class="text-gray-500 dark:text-gray-400">
        {{ commentaire.comment }}
      </p>
    </article>
  </section>
</template>
