<template>
  <div style="background-color: #f6f6f6;">
    <div
      class="imageBackground"
      style="padding-top: 20px;"
      v-bind:style="{ backgroundImage: 'url(' + getImage(this.recipe.name) + ')' }"
    >
      <div class="row">
        <div class="col-2 buttonBackRecipeDetails">
          <img src="../assets/images/icon-back.png" />
          <router-link style="font-size: 23px;" :to="{ name: 'receitas' }">Voltar</router-link>
        </div>
        <div class="timeOfPreparation">
          <div class="col-3 mt-3">
            <img src="../assets/images/icon-time.png" />
          </div>
          <div class="col-9 alignDescription">
            Tempo de preparo
            <br />
            <center style="font-weight:bold;">{{recipe.timeOfPreparation}}</center>
          </div>
        </div>
      </div>
      <div class="textPrincipal">
        <div style="font-weight: bold;font-size: 28px;margin-bottom: -15px;">{{recipe.name}}</div>
        <br />
        <div style="font-size: 18px;width: 100%;font-weight: 600;">{{recipe.description}}</div>
      </div>
    </div>

    <div class="mt-4" style="padding-left: 43px;">
      <h4 class="titleTop">Ingredientes</h4>
      <div class="colorDefault" v-for="(itemI, index) in this.recipe.ingredients" :key="index">
        <div class="custom-control custom-checkbox custom-control-inline mb-2">
          <input
            type="checkbox"
            class="custom-control-input"
            :id="itemI"
            @change="addIngredients(index,$event.target.checked)"
          />
          <label style="padding-left: 15px;" class="custom-control-label" :for="itemI">{{itemI}}</label>
        </div>
      </div>
    </div>

    <div class="mt-4" style="padding-left: 43px; background-color: white;">
      <h4 class="titleTop">Modo de preparo</h4>
     
      <div class="colorDefault" v-for="(itemP,index) in this.recipe.methodOfPreparation" :key="index">
        <div class="custom-control custom-checkbox custom-control-inline row ml-1">
          <input type="checkbox" class="custom-control-input" :id="index"
            @change="addPreparation(index,$event.target.checked)"/>
             
          <label class="col-5 custom-control-label" style="font-weight: bold;" :for="index">Passo {{itemP.step}}</label>
         
            <label class="alignTextValuePreparation ml-3">{{itemP.value}}</label>
        </div>
      </div>
    </div>
    <div class="row mt-3 mb-3" style="padding-left: 43px;">
      <div class="col-9 mb-3">
        <label>Status {{valueProgress | formattedDouble}} % pronto e minuto(s) {{totalHour}} utilizado(s)</label>
        <b-progress :value="valueProgress" variant="success" striped :animated="animate"></b-progress>
      </div>
      <div class="col mt-4">
        <button
          v-show="!started"
          type="button"
          class="btn btn-secondary btn-lg buttonPreparation"
          v-on:click="startPreparation()"
        >Iniciar preparação</button>
        <button
          v-show="started"
          type="button"
          class="btn btn-secondary btn-lg buttonFinished"
          v-on:click="finishedPreparation()"
        >Finalizar</button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";

import { BProgress } from "bootstrap-vue";
Vue.component("b-progress", BProgress);

import Buefy from "buefy";
Vue.use(Buefy);

export default {
  name: "RecipeDetails",
  data() {
    return {
      animate: true,
      valueProgress: 0,
      itensIngredients: [],
      itensPreparation: [],
      hour: 0,
      minute: 0,
      second: 0,
      decimi: 0,
      started: false,
      totalHour: "",
      stop: true,
      recipe: {
        name: "",
        description: "",
        timeOfPreparation: "",
        methodOfPreparation: [{}]
      }
    };
  },
  created() {
    this.recipeId = this.$route.params.id;
    this.getRecipe();
  },
  methods: {
    startCronometro() {
      if (this.stop == true) {
        this.stop = false;
        this.started = true;
        this.cronometro();
      }
    },

    cronometro: function() {
      if (this.stop == false) {
        this.decimi++;
        if (this.decimi > 9) {
          this.decimi = 0;
          this.second++;
        }
        if (this.second > 59) {
          this.second = 0;
          this.minute++;
        }
        if (this.minute > 59) {
          this.minute = 0;
          this.hour++;
        }
        this.mostra();
        let vm = this;
        setTimeout(function() {
          vm.cronometro();
        }, 100);
      }
    },
    mostra() {
      if (this.hour < 10) this.totalHour = "0";
      else this.totalHour = this.hour;
      if (this.minute < 10) this.totalHour = this.totalHour;
      this.totalHour = this.totalHour + this.minute + ":";
      if (this.second < 10) this.totalHour = this.totalHour;
      this.totalHour = this.totalHour + this.second + ":" + this.decimi;
    },
    stopCronometro() {
      this.stop = true;
    },
    finishedPreparation(){
      if (this.itensPreparation.length != this.recipe.methodOfPreparation.length) {
        Swal.fire({
          text:
            "Para finalizar a preparação, certifique-se de que você tem todos os passos do modo de preparo selecionados!",
          confirmButtonText: "Entendi",
          showCancelButton: false,
          showCloseButton: true
        });
      }else{
      this.stopCronometro();
      Swal.fire({
          title: "OBRIGADO",
          text:"Prato finalizado com sucesso em " + this.hour +" minutos e "+  this.second +" segundos",
          confirmButtonText: "Ok",
          showCancelButton: false,
          showCloseButton: true
        });
      }
    },
    startPreparation() {
      if (this.itensIngredients.length != this.recipe.ingredients.length) {
        Swal.fire({
          text:
            "Para iniciar a preparação, certifique-se de que você tem todos os ingredientes selecionados!",
          confirmButtonText: "Entendi",
          showCancelButton: false,
          showCloseButton: true
        });
      } else {
        this.startCronometro();
      }
    },
    addIngredients(index, event) {
      if (event) {
        if (!this.itensIngredients.includes(this.recipe.ingredients[index])) {
          this.itensIngredients.push(this.recipe.ingredients[index]);
        }
      } else {
        if (this.itensIngredients) {
          var value = this.itensIngredients.indexOf(
            this.recipe.ingredients[index]
          );
          this.itensIngredients.splice(value, 1);
        }
      }
    },
    addPreparation(index, event) {
      if (event) {
        if (
          !this.itensPreparation.includes(
            this.recipe.methodOfPreparation[index]
          )
        ) {
          this.itensPreparation.push(
            this.recipe.methodOfPreparation[index].step
          );
          this.valueProgress =
            (100 / this.recipe.methodOfPreparation.length) *
            this.itensPreparation.length;
        }
      } else {
        if (this.itensPreparation) {
          var value = this.itensPreparation.indexOf(
            this.recipe.methodOfPreparation[index].step
          );
          this.itensPreparation.splice(value, 1);
          this.valueProgress =
            (100 / this.recipe.methodOfPreparation.length) *
            this.itensPreparation.length;
        }
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
