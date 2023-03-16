import axios from "axios";
import { useAuth } from "./stores/auth";

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://localhost:4000/api/v1/";

//si une requete vers 'api nous renvoie une erreur 401 alors un deconnecte l'utilisateur
//et on le renvoi sur la page register
window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const auth = useAuth();
      console.log("pas connectez va être rediriger");
      auth.destroyTokenAndRedirectTo();
    }
    console.log("user est bien connectez");

    return Promise.reject(error);
  }
);
//lorsqu'on raffraichir on veut recuperer le token
if (localStorage.getItem("access_token")) {
  window.axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access_token")}`;
}
