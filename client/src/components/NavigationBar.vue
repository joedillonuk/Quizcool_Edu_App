<template lang="html">
  <div class="navigation">
    <nav>
      <!-- <button type="button" v-on:click.once="handleCategory(22)">Geography</button>
      <button type="button" v-on:click.once="handleCategory(21)">Sport</button>
      <button type="button" v-on:click.once="handleCategory(23)">History</button>
      <button type="button" v-on:click.once="handleCategory(9)">General Knowledge</button> -->

      <img v-if="this.selectedCategory !== 22" v-on:click.once="handleCategory(22)" src="../assets/icons/geography-bw.png" alt="geography">
      <img v-if="this.selectedCategory === 22" v-on:click.once="handleCategory(22)" src="../assets/icons/geography-color.png" alt="geography">

      <img v-if="this.selectedCategory !== 21" v-on:click.once="handleCategory(21)" src="../assets/icons/sport-bw.png" alt="sport">
      <img v-if="this.selectedCategory === 21" v-on:click.once="handleCategory(21)" src="../assets/icons/sport-color.png" alt="sport">

      <img v-if="this.selectedCategory !== 23" v-on:click.once="handleCategory(23)" src="../assets/icons/history-bw.png" alt="history">
      <img v-if="this.selectedCategory === 23" v-on:click.once="handleCategory(23)" src="../assets/icons/history-color.png" alt="history">

      <img v-if="this.selectedCategory !== 17" v-on:click.once="handleCategory(17)" src="../assets/icons/science-bw.png" alt="science">
      <img v-if="this.selectedCategory === 17" v-on:click.once="handleCategory(17)" src="../assets/icons/science-color.png" alt="science">

<user-details/>
    </nav>

  </div>
</template>

<script>
import { eventBus } from '../main.js'
import UserDetails from './UserDetails.vue'

export default {
  name: 'navigation-bar',
  props: ['users'],
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
  width: 40px;
  margin: 10px
}
</style>
