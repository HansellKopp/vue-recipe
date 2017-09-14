<template>
  <div id="app">
    <header>
      <b-navbar type="light" variant="light" toggleable>
        <b-navbar-brand href="/#" router-tag="Home">Recipes Editor</b-navbar-brand>
        <b-nav-item href="/#/categories" router-tag="Categories">Categories</b-nav-item>
        <b-nav-item href="/#/measures" router-tag="Measures">Measures</b-nav-item>
        <b-nav-item href="/#/recipes" router-tag="Recipes"> Recipes</b-nav-item>
      </b-navbar>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
