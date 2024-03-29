import Vue from "vue";
import Router from "vue-router";
import Recipes from "./views/Recipes.vue";
import RecipeDetails from "./views/RecipeDetails.vue";

import Login from "./views/Login.vue";

Vue.use(Router);
const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/detalhes/:id",
      name: "listRecipes",
      component: RecipeDetails
    },
    {
      path: "/receitas",
      name: "receitas",
      component: Recipes,
    },
  ],
});

export default router;


