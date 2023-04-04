import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useAuth } from "@/stores/auth";

export const useLogin = defineStore("login", () => {
  //pour la generation de token
  const auth = useAuth();
  const errors = reactive({});
  const loading = ref(false);

  const form = reactive({
    email: "",
    password: "",
    remenber: false,
  });

  function resetForm() {
    form.email = "";
    form.password = "";
    form.remenber = "";

    errors.value = {};
  }

  async function handleSubmit() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    return window.axios
      .post("login", form)
      .then((response) => {
        console.log("response => ", response);
        auth.login(response.data.access_token);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        form.password = "";
        loading.value = false;
      });
  }
  return { form, errors, loading, resetForm, handleSubmit };
});
