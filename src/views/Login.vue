
<template>
  <div class="imageBackgroundLogin">
    <div class="container">
      <form>
        <div class="row ml-5 mb-5" style="padding-left: 25px;">
          <img src="../assets/images/logo-coco-bambu.png" />
        </div>
        <div class="form-group col-1 col-icon">
          <span class="span-icon">
            <img src="../assets/images/icon-login.png" />
          </span>
          <input
            type="text"
            v-model="user"
            class="inputforIcon form-control"
            placeholder="Nome do usuário"
            required
          />
        </div>
        <div class="form-group col-1 col-icon">
          <span class="span-icon">
            <img src="../assets/images/icon-key.png" />
          </span>
          <input
            type="password"
            v-model="password"
            class="inputforIcon form-control"
            placeholder="Senha"
            required
          />
        </div>
        <div class="form-group">
          <button
            v-on:click="valid()"
            style="width: 300px;background-color: rgb(234, 126, 32);"
            type="button"
            class="btn btn-primary"
            data-toggle="button"
            aria-pressed="false"
            autocomplete="off"
          >Acessar</button>
        </div>
      </form>
      <router-view />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "App",
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    valid() {
      if (this.user == "Teste" && this.password == "123") {
        this.$router.push({ path: "/receitas" });
      } else {
        Swal({
          title: "Nome do usuário ou senha incorreta.",
          text: "Por favor, tente novamente.",
          type: "warning"
        });
      }
    }
  }
};
</script>


 