<template>
  <div id="header" class="row">
    <div class="col-3 col-lg-4 menu-item">
      <a href="" class="bloobloom-header-button">
        <span>Menu</span>
      </a>

      <a href="/stores" class="bloobloom-header-button">
        <span>Free eye test</span>
      </a>

      <a href="/pages/about-us" class="bloobloom-header-button">
        <span>About us</span>
      </a>
    </div>

    <div class="col-6 col-lg-4 menu-item">
      <a href="/">
        <img class="menu-logo" :src="require('../assets/img/logo.svg')" />
      </a>
    </div>

    <div class="col-3 col-lg-4 menu-item">
      <a href="/pages/help" class="bloobloom-header-button">
        <span>HELP</span>
      </a>

      <a href="/login" class="bloobloom-header-button">
        <span>Login</span>
      </a>

      <a href="/cart" class="bloobloom-header-button">
        <span>Bag (<span class="bag-quanity">0</span>)</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>
