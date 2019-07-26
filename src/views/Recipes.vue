<template>
  <div>
    <div class="row" style="background-color: black;height: 65px;padding-left: 20px;">
      <div class="col-2 mt-3">
        <img src="../assets/images/logo-coco-bambu-mini.png">
      </div>
      <div class="col mt-3">
        <div class="form-group">
          <span class="span-icon-m">
            <img src="../assets/images/icon-busca.png">
          </span>
          <input
            class="form-control"
            type="text"
            v-model="searchItem"
            v-on:keyup="doFilter(searchItem)"
            placeholder="Buscar receita..."
          >
        </div>
      </div>
      <div class="col mr-2" style="text-align: right;">
        <i class="fa fa-user-circle-o fa-2x" style="color:white;" aria-hidden="true"></i>
        <br><font style="color:white;">
          <router-link :to="{ name: 'login' }">Sair</router-link>
          </font>
      </div>
    </div>
    <div class="row alignTextRecipe">
      Últimos pedidos
      </div>
    <v-client-table :columns="columns" :options="options" :data="data">
      <div slot="image" slot-scope="props">
        <div>
          <img :src="getImage(props.row.name)">
        </div>
      </div>

      <div style="width: 40%;" slot="description" slot-scope="props">
        <div>
          <h5>{{props.row.name}}</h5>
          <br>
          <div>{{props.row.description}}</div>
        </div>
      </div>

      <div slot="status" slot-scope="props">
        <div style="color: #26ac26;">{{props.row.status}}</div>
      </div>

      <div slot="date" slot-scope="props">
        <div class="circuloCinza">
          <div class="centerData">{{props.row.date | formattedDate}}</div>
        </div>
      </div>
      <div slot="action" slot-scope="props">
        <div class="circuloLaranja"> 
          <div class="centerRecipe"><router-link :to="{ name: 'listRecipes', params: { id:props.row._id  } }">
         <center class="viewRecipe">Ver<br>receita</center>
      </router-link></div>
        </div>
      </div>
    </v-client-table>
     <router-view />
    <loading-spinner v-bind:loading="loading"></loading-spinner>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import LoadingSpinner from "../components/Spinner.vue";
import { ClientTable, Event } from "vue-tables-2";
Vue.use(ClientTable);

export default {
  name: "Recipes",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      loading: false,
      searchItem: "",
      data: [],
      columns: ["image", "description", "status", "date", "action"],
      options: {
        uniqueKey: "key",
        responseAdapter({ data }) {
          return {
            data,
            count: data.length
          };
        },
        texts: {
          count:
            "Mostrando de {from} a {to} total {count} resultados|{count} resultados|Um resultado",
          filter: "Pesquisar:",
          filterPlaceholder: "Nome, idade, cargo",
          limit: "Resultados:",
          page: "Página:",
          noResults: "Não há resultados",
          filterBy: "Filtrar por {column}",
          loading: "Carregando..."
        },
        headings: {
          image: "",
          description: "",
          status: "",
          date: "",
          action: ""
        },
        perPageValues: [],
        perPage: 50,
        filterable: false,
        customFilters: [
          {
            name: "receipefilter",
            callback(row, query) {
              return row.name.indexOf(query) > -1;
            }
          }
        ]
      }
    };
  },
  created() {
    this.getRecipes();
  },
  methods: {
    doFilter(searchText) {
      Event.$emit("vue-tables.filter::receipefilter", searchText);
    },
    getRecipes() {
      axios.get(`${process.env.VUE_APP_NODE}/findAll`).then(response => {
        this.data = response.data.recipes;
      });
    },
    openRecipeDetails(idRecipe){
      this.$router.push({name:'listRecipes', params: {id: idRecipe}});
    },
    getImage(value) {
      switch (value) {
        case "Arroz de Mariscos para 2 pessoas":
          return require("../assets/images/prato-arroz-marisco-peq.jpg");
        case "Moqueca Tropical":
          return require("../assets/images/prato-moqueca-peq.jpg");
        case "Frutos do Mar ao Azeite de Ervas":
          return require("../assets/images/prato-fruto-peq.jpg");
        case "Massa espaguete à Italiana":
          return require("../assets/images/prato-massa-peq.jpg");
        case "Bobó de Lagosta":
          return require("../assets/images/prato-moqueca-peq.jpg");
      }
    }
  }
};
</script>

<style>
a, a:visited {
    color: white;
}
.span-icon-m {
  display: inline-block;
  position: absolute;
  left: 270px;
}
.circuloCinza {
  border-radius: 100%;
  display: inline-block;
  height: 120px;
  width: 120px;
  background-color: #ccccca;
}

.viewRecipe{
  font-weight: bold;
  color: white;
  font-size: 20px;
}

.circuloLaranja {
  border-radius: 100%;
  display: inline-block;
  height: 120px;
  width: 120px;
  background-color: orange;
}
.centerData {
  margin-top: 20%;
  margin-left: 15%;
}
.table th,
.table td {
  padding: 0.75rem;
  background-color: #e9ecf5db;
  vertical-align: top;
}
.centerRecipe {
    margin-top: 20%;
    margin-left: 0%;
}
.alignTextRecipe{
    font-size: 20px;
    font-weight: 600;
    margin-left: 1%;
    margin-top: 1%;
}
.table-bordered th, .table-bordered td {
    /* border: 1px solid #dee2e6; */
}
</style>
