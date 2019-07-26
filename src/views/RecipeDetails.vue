<template>
  <div>
    <div
      class="imageBackground"
      style="padding-top: 20px;"
      v-bind:style="{ backgroundImage: 'url(' + getImage(this.recipe.name) + ')' }"
    >
      <div class="timeOfPreparation">
        <div class="row" style=" color: black;">
          <div class="col-2" style="padding-top: 10px;">
            <img src="../assets/images/icon-time.png" />
          </div>
          <div class="col">
            Tempo de preparo
            <br />
            <center style="font-weight:bold;">{{recipe.timeOfPreparation}}</center>
          </div>
        </div>
      </div>
      <div class="textPrincipal">
        <div style="font-weight: bold;font-size: 28px;margin-bottom: -15px;">{{recipe.name}}</div>
        <br />
        <div style="font-size: 20px;width: 110rem;font-weight: 600;">{{recipe.description}}</div>
      </div>
    </div>

    <div class="mt-4" style="padding-left: 43px; background-color: #ece8e8;">
      <h2 style="color:black;">Ingredientes</h2>
      <div style="color:black;" v-for="item in this.recipe.ingredients" :key="item">
        <input type="checkbox" class="mr-1" @click="addIngredients(item)" :value="item" />
        <label style="color:black;">{{item}}</label>
      </div>
    </div>
    <div class="mt-4" style="padding-left: 43px; background-color: white;">
      <h2 style="color:black;">Modo de preparo</h2>
      <div style="color:black;" v-for="item in this.recipe.methodOfPreparation" :key="item">
        <input type="checkbox"  @click="addPreparation(item)" class="mr-1" :value="item" />
        <label style="color:black;">Passo {{item.step}}</label><br>
        <label style="color:black;">{{item.value}}</label>
      </div>
    </div>
    <div>
          <b-progress :value="valueProgress" variant="success" striped :animated="animate"></b-progress>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import PrettyCheckbox from "pretty-checkbox-vue";
Vue.use(PrettyCheckbox);
import { BProgress } from 'bootstrap-vue'
Vue.component('b-progress', BProgress)

export default {
  name: "RecipeDetails",
  data() {
    return {
      animate: true,
      valueProgress: 0,
      itensIngredients: [{}],
      itensPreparation: [{}],
      recipe: {
        name: "",
        description: "",
        timeOfPreparation: "",
        methodOfPreparation: [{}],

      }
    };
  },
  created() {
    this.recipeId = this.$route.params.id;
    this.getRecipe();
  },
  methods: {
    addIngredients(value) {
      if (!this.itensIngredients.includes(value)) {
      this.itensIngredients.push(value);
      }
    },
    addPreparation(value){
      if (!this.itensPreparation.includes(value)) {
      this.itensPreparation.push(value);
      this.valueProgress = ((100 / this.recipe.methodOfPreparation.length) * this.itensPreparation.length);
      }
    },
    getRecipe() {
      axios
        .get(`${process.env.VUE_APP_NODE}/findById/${this.recipeId}`)
        .then(response => {
          this.recipe = response.data.recipe;
        });
    },
    getImage(value) {
      switch (value) {
        case "Arroz de Mariscos para 2 pessoas":
          return require("../assets/images/prato-arroz-grande.jpg");
        case "Moqueca Tropical":
          return require("../assets/images/prato-moqueca-grande.jpg");
        case "Frutos do Mar ao Azeite de Ervas":
          return require("../assets/images/prato-fruto-grande.jpg");
        case "Massa espaguete à Italiana":
          return require("../assets/images/prato-massa-grande.jpg");
        case "Bobó de Lagosta":
          return require("../assets/images/prato-moqueca-grande.jpg");
      }
    }
  }
};
</script>

<style>
.timeOfPreparation {
  background-color: white;
  width: 220px;
  height: 60px;
  margin-left: 85%;
}
.textPrincipal {
  margin-left: 43px;
  text-align: initial;
  padding-top: 17rem;
}

.imageBackground {
  width: 100%;
  height: 30rem;
  color: white;
  background-position: 20% 92%;
  background-size: cover;
  -o-background-size: cover;
}
</style>

