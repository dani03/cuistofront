import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
      beforeEnter: auth,
      component: () => import("@/views/recettes/indexView.vue"),
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
  ],
});

function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    console.log("user is not connected");
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
