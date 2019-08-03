
<template>
  <div>
    <div style="margin-top: -16px;">
      <router-link to="/login" class="nav-link"></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "./assets/css/style.css";
@import url(
  https://fonts.googleapis.com/css?family=Nunito:regular,
  900,
  700%7CNunito+Sans%7C
);
</style>
 