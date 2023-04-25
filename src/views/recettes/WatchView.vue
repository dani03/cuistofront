<script setup>
import { watchEffect } from "vue";
import { useRecette } from "@/stores/recette";
import { useRoute } from "vue-router";
import Vue3CanvasVideoPlayer from "vue3-canvas-video-player";
import "vue3-canvas-video-player/dist/style.css";
// import Plyr from "plyr";
import "vue-plyr/dist/vue-plyr.css";

// const player = new Plyr("#player");
const store = useRecette();
const route = useRoute();

watchEffect(async () => {
  store.watchRecette({ slug: route.params.slug });
});
console.log(store.oneRecette);
</script>

<template>
  <div class="flex">
    <div class="w-2/3 rounded p-4">
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
