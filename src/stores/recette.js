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
    urlVideo: "",
    ingredients: ref([]),
    ingredientName: ref(""),
    quantity: ref(""),
    unite_mesure: ref(""),
  });

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
  function handleFile(event) {
    // debugger;
    //console.log("selected file", file.value.files);
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log(formData);
    const file = event.target.files[0];
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = (e) => {
    //   console.log(e.target.result);
    //   form.urlVideo = e.target.result;
    // };
    //Upload to server
    form.urlVideo = file;
    console.log(form.urlVideo);
  }

  function clickToAdd(event) {
    event.preventDefault();
    console.log("inside click to add");
    addIngredient();
    console.log(form.ingredients);
  }
  function resetForm() {
    form.name = "";
    form.description = "";
    form.urlVideo = "";
    form.ingredients = ref([]);
    form.ingredientName = "";
    form.quantity = "";
    form.unite_mesure = "";
  }

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
    console.log("this is form => ", formData.getAll("ingredients"));
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
    handleFile,
    clickToAdd,
  };
});
