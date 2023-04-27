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

onBeforeUnmount(store.resetForm);

watch(
  () => commentStore.form.commentaire,
  (newVal) => {
    commentStore.watchComment(newVal);
    // Do something when commentaire changes
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
    <div class="w-2/3 h-80 p-4 mt-4 mx-2">
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
</template>
