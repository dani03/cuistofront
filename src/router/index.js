import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "register",
      beforeEnter: guest,
      component: () => import("@/views/auth/RegisterView.vue"),
    },
    {
      path: "/recettes",
      name: "recettes.index",
      component: () => import("@/views/recettes/indexView.vue"),
    },

    {
      path: "/recette/show/:slug",
      name: "recette.show",
      beforeEnter: auth,
      component: () => import("@/views/recettes/EditView.vue"),
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: guest,
      component: () => import("@/views/auth/LoginView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      beforeEnter: auth,
      component: () => import("@/views/profile/EditView.vue"),
    },
    {
      path: "/update/profile/password",
      name: "update.profile.password",
      beforeEnter: auth,
      component: () => import("@/views/profile/ChangePassword.vue"),
    },
    {
      path: "/profile/recettes",
      name: "recettes.profile",
      beforeEnter: auth,
      component: () => import("@/views/profile/RecetteProfilView.vue"),
    },
    {
      path: "/recette/create",
      name: "recettes.create",
      beforeEnter: auth,
      component: () => import("@/views/recettes/CreateView.vue"),
    },
    {
      path: "/recette/watch/:slug",
      name: "recette.watch",
      beforeEnter: auth,
      component: () => import("@/views/recettes/WatchView.vue"),
    },
    {
      path: "/profile/recettes/likes",
      name: "recettes.likes",
      beforeEnter: auth,
      component: () => import("@/views/profile/RecettesLikeView.vue"),
    },
  ],
});

function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    console.log("user is not connected");
    //auth.destroyTokenAndRedirectTo();
    return next({ name: "login" });
  }

  next();
}

function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "recettes.index" });
  }

  next();
}

export default router;
