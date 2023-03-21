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
    ingredientName: ref(""),
    quantite: ref(""),
    unite_mesure: ref(""),
  });

  function addIngredient() {
    form.ingredients.push({
      name: form.ingredientName,
      quantite: form.quantite,
      unite_mesure: form.unite_mesure,
    });
    form.ingredientName = "";
    form.quantite = "";
    form.unite_mesure = "";
  }

  function clickToAdd(event) {
    event.preventDefault();
    console.log("inside click to add ");
    addIngredient();
    console.log(form.ingredients);
  }
  function resetForm() {
    form.name = "";
    form.description = "";
    form.url_video = "";
    form.ingredients = ref([]);
    form.ingredientName = "";
    form.quantite = "";
    form.unite_mesure = "";
  }

  async function storeRecette() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};
    //let ingredients = form.ingredients;
    // addIngredient();
    console.log(form.ingredients);
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
  return { storeRecette, resetForm, loading, errors, form, status, clickToAdd };
});
