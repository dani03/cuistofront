import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useProfile = defineStore("profile", () => {
  const errors = reactive({});
  const status = ref("");
  const loading = ref(false);
  const form = reactive({
    firstname: "",
    lastname: "",
    email: "",
  });

  function resetForm() {
    form.firstname = "";
    form.email = "";
    form.lastname = "";

    errors.value = {};
    status.value = "";
  }

  async function fetchProfile() {
    return window.axios.get("profile").then((response) => {
      console.log("data => ", response.data);
      form.firstname = response.data.firstname;
      form.lastname = response.data.lastname;
      form.email = response.data.email;
    });
  }

  async function updateProfile() {
    loading.value = true;
    errors.value = {};
    status.value = "";

    return window.axios
      .post("update/profile", form)
      .then((response) => {
        form.email = response.data.email;
        form.firstname = response.data.firstname;
        form.lastname = response.data.lastname;
        status.value = "votre profil a été mis à jour.";
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
  return {
    form,
    loading,
    errors,
    resetForm,
    status,
    fetchProfile,
    updateProfile,
  };
});
