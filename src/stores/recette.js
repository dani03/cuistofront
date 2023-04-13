import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useRecette = defineStore("recette", () => {
  const errors = reactive({});
  const router = useRouter();
  const loading = ref(false);
  const status = ref("");
  const recettes = ref([]);

  function getRecettes() {
    return window.axios.get("profile/recettes").then((response) => {
      console.log("recettes => ", response.data);
      recettes.value = response.data.data;
    });
  }

  const form = reactive({
    name: "",
    description: "",
    urlVideo: "",
    ingredients: ref([]),
    ingredientName: ref(""),
    quantity: ref(""),
    unite_mesure: ref(""),
  });

  //updated a recette
  function updateRecette(recette) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};
    var formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("ingredients", JSON.stringify(form.ingredients));
    formData.append("urlVideo", form.urlVideo);
    var config = {
      header: { "Contect-type": "multipart/form-data" },
    };
    window.axios
      .post(`/recette/update/${recette.slug}`, formData, config)
      .then(() => {
        console.log("has been updated");
        status.value = "votre recette a bien été mis à jour ";
        router.push({ name: "recettes.profile" });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  //ajouter un  ingredient
  function addIngredient() {
    form.ingredients.push({
      name: form.ingredientName,
      quantity: form.quantity,
      unite_mesure: form.unite_mesure,
    });
    console.log(form.ingredients);
    form.ingredientName = "";
    form.quantity = "";
    form.unite_mesure = "";
  }

  //recuperation de fichier
  function handleFile(event) {
    //console.log("selected file", file.value.files);
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log(formData);
    const file = event.target.files[0];
    form.urlVideo = file;
    console.log(form.urlVideo);
  }
  //recuperation de toutes les recettes
  function getAllRecettes() {
    window.axios
      .get("/recettes")
      .then((response) => {
        recettes.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 422) {
          errors.value = error.response.data.errors;
        }
      });
  }

  //suppression d'une recette
  function deleteRecette(recette) {
    window.axios
      .delete(`/recette/delete/${recette.slug}`)
      .then(() => {
        status.value = "recette supprimée.";
        getRecettes();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 422) {
          errors.value = error.response.data.errors;
        }
      });
  }
  //traitement des ingredients
  function clickToAdd(event) {
    event.preventDefault();
    console.log("inside click to add");
    addIngredient();
    console.log(form.ingredients);
  }

  //remise du form a zero
  function resetForm() {
    form.name = "";
    form.description = "";
    form.urlVideo = "";
    form.ingredients = ref([]);
    form.ingredientName = "";
    form.quantity = "";
    form.unite_mesure = "";
  }

  //recuperation d'une recette
  function getRecette(recette) {
    window.axios.get(`/recette/show/${recette.slug}`).then((response) => {
      console.log("response =>", response.data);
      form.description = response.data.data.description;
      form.name = response.data.data.name;
      form.ingredients = response.data.data.ingredients;
    });
  }

  //sauvegarder une recette
  async function storeRecette() {
    if (loading.value) return;
    loading.value = true;
    errors.value = {};
    var formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("ingredients", JSON.stringify(form.ingredients));
    formData.append("urlVideo", form.urlVideo);
    var config = {
      header: { "Contect-type": "multipart/form-data" },
    };
    //console.log("this is form => ", formData.getAll("ingredients"));
    window.axios
      .post("/recette", formData, config)
      .then(() => {
        status.value = "recette ajouté avec succès.";
        router.push({ name: "recettes.index" });
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  return {
    storeRecette,
    resetForm,
    loading,
    errors,
    form,
    status,
    getAllRecettes,
    deleteRecette,
    getRecettes,
    recettes,
    getRecette,
    updateRecette,
    handleFile,
    clickToAdd,
  };
});
