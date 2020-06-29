<template lang="html">

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>

      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <img class="" v-if="this.selectedCategory !== 22" v-on:click.once="handleCategory(22)" src="../assets/icons/geography-bw.png" alt="geography">
          <img class="" v-if="this.selectedCategory === 22" v-on:click.once="handleCategory(22)" src="../assets/icons/geography-color.png" alt="geography">
        </a>

        <a class="navbar-item">
          <img class="" v-if="this.selectedCategory !== 21" v-on:click.once="handleCategory(21)" src="../assets/icons/sport-bw.png" alt="sport">
          <img class="" v-if="this.selectedCategory === 21" v-on:click.once="handleCategory(21)" src="../assets/icons/sport-color.png" alt="sport">
        </a>

        <a class="navbar-item">
          <img v-if="this.selectedCategory !== 23" v-on:click.once="handleCategory(23)" src="../assets/icons/history-bw.png" alt="history">
          <img v-if="this.selectedCategory === 23" v-on:click.once="handleCategory(23)" src="../assets/icons/history-color.png" alt="history">
        </a>

        <a class="navbar-item">
          <img v-if="this.selectedCategory !== 17" v-on:click.once="handleCategory(17)" src="../assets/icons/science-bw.png" alt="science">
          <img v-if="this.selectedCategory === 17" v-on:click.once="handleCategory(17)" src="../assets/icons/science-color.png" alt="science">
        </a>

        <div class="navbar-end">
          <user-details :selectedUser="selectedUser" v-if="selectedUser" class="navbar-item"/>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import { eventBus } from '../main.js'
import UserDetails from './UserDetails.vue'

export default {
  name: 'navigation-bar',
  props: ['users', 'selectedUser'],
  data(){
    return {
      categories: [],
      selectedCategory: null,
      selectedUser: null
    }
  },
  methods:{
    handleCategory(category){
      this.selectedCategory = category
      eventBus.$emit('category-selected', this.selectedCategory)
    }

  },
  mounted(){
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data => this.categories = data.trivia_categories)


  },
  components: {
    'user-details': UserDetails
  }
}
</script>

<style lang="css" scoped>
img {
  width: 30px;
  margin: 10px
}

.navbar{
  background-color: #84a9ac;
}
</style>
