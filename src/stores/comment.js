import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useComment = defineStore("commentaire", () => {
  const errors = reactive({});
  const commentaires = ref([]);
  const loading = ref(false);
  const showComment = ref(false);
  const status = ref("");
  const caracterLength = ref(0);
  const maxLength = ref(255);

  const form = reactive({
    commentaire: "",
  });

  function resetForm() {
    form.commentaire = ref("");
  }

  function watchComment(text) {
    console.log("inside watch");
    caracterLength.value = text.length;
  }

  function handleForm(recette) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};
    window.axios
      .post(`comment/store/${recette.slug}`, form)
      .then((response) => {
        showComment.value = true;
        status.value = response.data.message;
        setTimeout(() => {
          showComment.value = false;
        }, 2000);
        resetForm();
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log("error", error.response.data.errors);
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  return {
    errors,
    commentaires,
    form,
    loading,
    status,
    showComment,
    caracterLength,
    maxLength,
    watchComment,
    resetForm,
    handleForm,
  };
});
