<template lang="html">
  <div class="navigation">
    <nav>
      <button type="button" v-on:click.once="handleCategory(22)">Geography</button>
      <button type="button" v-on:click.once="handleCategory(21)">Sport</button>
      <button type="button" v-on:click.once="handleCategory(23)">History</button>
      <button type="button" v-on:click.once="handleCategory(9)">General Knowledge</button>


      <select v-on:change="handleSelectUser" v-model="selectedUser">
        <option disabled value="" selected>Select a user...</option>
        <option v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>
      </select>


    </nav>
  </div>
</template>

<script>
import { eventBus } from '../main.js'
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
    },
    handleSelectUser(){
      eventBus.$emit('user-selected', this.selectedUser)
    }

  },
  mounted(){
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data => this.categories = data.trivia_categories)


  }
}
</script>

<style lang="css" scoped>

</style>
