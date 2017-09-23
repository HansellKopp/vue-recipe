<template>
  <b-container fluid>
    <b-card-group deck>
      <b-card title="Big Ray's Kielbasa Cabbage Skillet for a Crowd"
          img-src="http://lorempixel.com/400/200/food/1/"
          img-alt="Img"
          img-top
      >
        <p class="card-text">
            <h3>Dificult</h3>
            <h3>3 Portionen</h3>
            <h3>Ingredients</h3>
            <ul v-for="ingredient in ingredients">
              <li>{{ ingredient.name }}</li>
            </ul>
            <h3>Directions</h3>
            <p>
              Place potatoes in a microwave-safe bowl; cook in microwave until partially tender, about 8 minutes.
Heat 2 tablespoons butter in a Dutch oven or large cast iron skillet over medium heat; cook and stir sausage and onions until browned, about 5 minutes. Transfer sausage and onions to a bowl.
Heat remaining 2 tablespoons butter in the same Dutch oven; cook and stir cabbage until tender, about 5 minutes.
Combine tomatoes, sugar, and paprika in a bowl; pour over cabbage and bring to a boil. Reduce heat and add potatoes and sausage-onion mixture. Cover Dutch oven and simmer until potatoes are tender, about 40 minutes.
            <p>
        </p>
        <div slot="footer">
            <small class="text-muted">Modify</small>
        </div>
        </b-card>
    </b-card-group>
  </b-container>
</template>


<script>
const model = { id: null, name: '', active: true }
const items = [ ]
const ingredients = [
  { name: '3 large potatoes' },
  { name: 'cubed 1/4 cup butter' },
  { name: 'divided 1 pound Polish kielbasa sausage' },
  { name: 'cut into 1/2-inch slices 2 onions' },
  { name: 'chopped 1 large head cabbage' },
  { name: 'coarsely chopped 2 (15 ounce)' },
  { name: 'cans diced tomatoes' },
  { name: '1/4 cup white sugar' }
]
export default {
  name: 'recipes',
  data () {
    return {
      items,
      ingredients,
      model,
      fields: {
        id: { label: 'id', sortable: true },
        name: { label: 'name', sortable: true },
        active: { label: 'is Active', sortable: true },
        actions: { label: 'Actions' }
      },
      filter: null,
      filteredItems: []
    }
  },
  methods: {
    add () {
    },
    edit (item, index, button) {
    },
    remove (item, index, button) {
      if (item.id) {
        this.$http.delete(`recipe/${item.id}`)
            .then(response => {
              this.getItems()
            }, error => {
              console.log(error)
            })
      }
    },
    clearData () {
      this.model = model
    },
    getItems () {
      this.$http.get('recipe')
        .then(response => {
          this.items = response.data.data
        }, error => {
          console.log('error', error)
        })
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
    },
    handleSubmit () {
      if (this.isValidModel()) {
        if (!this.model.id) {
          this.$http.post('recipe', { ...this.model })
            .then(response => {
              this.getItems()
            }, error => {
              console.log(error)
            })
        } else {
          this.$http.put(`recipe/${this.model.id}`, { ...this.model })
            .then(response => {
              this.getItems()
            }, error => {
              console.log(error)
            })
        }
      } else {
        console.log('invalid')
      }
    },
    isValidModel () {
      return (this.model.name.length > 3)
    }
  },
  created: function () {
    // this.getItems()
  }
}
</script>

<style scoped>
.container {
  background-color: #e3f2fd;
}
</style>
