<template>
  <b-container fluid>
    <b-jumbotron>
      <b-row class="justify-content-md-center">
        <b-col sm="6">
          <b-card title="Your recipes source"
                  img-src="https://lorempixel.com/600/300/food/5/"
                  img-alt="Image"
                  img-top
                  tag="article"
          >
            <p class="card-text">
              Find and share everyday cooking inspiration on Allrecipes. Discover recipes, cooks, videos, and how-tos based on the food you love and the friends you follow.
            </p>
            <b-button href="/#/recipes" router-tag="Recipes" variant="outline-primary">Let's do it</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>