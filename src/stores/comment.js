import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useComment = defineStore("commentaire", () => {
  const errors = reactive({});
  const commentaires = ref([]);
  const loading = ref(false);
  const showComment = ref(false);
  const status = ref("");
  const caracterLength = ref(0);
  const maxLength = ref(240);

  const form = reactive({
    commentaire: "",
  });

  function resetForm() {
    form.commentaire = "";
  }

  function watchComment(text) {
    caracterLength.value = text.length;
  }
  function getCommentaires(recetteId) {
    commentaires.value = "";
    window.axios
      .get(`comment/show/${recetteId}`)
      .then((response) => {
        console.log("getCommentaires", response);
        commentaires.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function findCommentaires(comments) {
    console.log("comments ", comments);
    commentaires.value = comments;
  }

  function handleForm(recette) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};
    window.axios
      .post(`comment/store/${recette.slug}`, form)
      .then((response) => {
        showComment.value = true;
        console.log("les responses---", response.data.recette);
        status.value = response.data.message;
        setTimeout(() => {
          showComment.value = false;
        }, 2000);
        getCommentaires(response.data.recette.id);
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
    findCommentaires,
    resetForm,
    handleForm,
    getCommentaires,
  };
});
