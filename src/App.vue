<template>
  <Header />
  <View />
</template>

<script>
import Header from "./components/Header";
import View from "./components/View";

export default {
  name: "App",
  components: {
    Header,
    View
  },
};
</script>

<style>
@import "./assets/css/app.css";
</style>
