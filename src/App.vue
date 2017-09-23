<template>
  <div id="app">
    <header>
      <b-navbar type="dark" variant="dark" toggleable>
        <b-navbar-brand href="/#" router-tag="Home">Recipes Editor</b-navbar-brand>
        <b-nav-item href="/#/categories" router-tag="Categories">Categories</b-nav-item>
        <b-nav-item href="/#/ingredients" router-tag="Ingredients">Ingredients</b-nav-item>
        <b-nav-item href="/#/measures" router-tag="Measures">Measures</b-nav-item>
        <b-nav-item href="/#/recipes" router-tag="Recipes"> Recipes</b-nav-item>
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-form right>
            <b-form-input class="mr-sm-2" type="text" placeholder="Search"></b-form-input>
            <b-button @click.preventDefault="search" variant="outline-success" type="submit">
              <icon name="filter"></icon>
            </b-button>
          </b-nav-form>
        </b-nav>
      </b-navbar>
    </header>
    <main>
      <b-container class="mt-2">
        <router-view></router-view>
      </b-container>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    search () {
      this.$root.$emit('show::modal', 'modalEdit')
    }
  }
}
</script>

<style scoped>
li {
  display: inline-block;
  margin: 0 10px;
}
li > a {
   color: yellowgreen
}
</style>
