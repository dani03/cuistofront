import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useRecette = defineStore("recette", () => {
  const errors = reactive({});
  const router = useRouter();
  const loading = ref(false);
  const status = ref("");

  const form = reactive({
    name: "",
    description: "",
    url_video: "",
    ingredients: ref([]),
  });

  function resetForm() {
    form.name = "";
    form.description = "";
    form.url_video = "";
    form.ingredients = ref([]);
  }

  async function storeRecette() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .post("/recette", form)
      .then(() => {
        status.value = "recette ajouté avec succès.";
        router.push({ name: "recettes.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }
  return { storeRecette, resetForm, loading, errors, form, status };
});
