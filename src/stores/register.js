import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useRegister = defineStore("register", () => {
  const form = reactive({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const errors = reactive({});
  const loading = ref(false);

  function resetForm() {
    form.firstname = "";
    form.lastname = "";
    form.email = "";
    form.password = "";
    form.password_confirmation = "";
    errors.value = {};
  }

  async function handleSubmit() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {}; // on efface les erreurs
    return window.axios
      .post("register", form)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })

      .finally(() => {
        form.password = "";
        form.password_confirmation = "";
        loading.value = false;
      });
  }

  return { form, errors, resetForm, loading, handleSubmit };
});
