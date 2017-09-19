import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Recipes from '@/components/Recipes'
import Categories from '@/components/Categories'
import Measures from '@/components/Measures'
import Icon from 'vue-awesome/components/Icon'
// import icons
import 'vue-awesome/icons/plus' // Add
import 'vue-awesome/icons/trash' // Delete
import 'vue-awesome/icons/pencil' // edit
import 'vue-awesome/icons/filter' // filter

Vue.component('icon', Icon)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/measures',
      name: 'Measures',
      component: Measures
    }
  ]
})
