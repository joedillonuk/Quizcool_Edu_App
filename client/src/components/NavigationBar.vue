<template lang="html">
  <div class="navigation">
    <nav>
      <button type="button" v-on:click="geography">Geography</button>
      <button type="button" v-on:click="sport">Sport</button>
      <button type="button" v-on:click="history">History</button>

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
    geography(){
      this.selectedCategory = 22
      eventBus.$emit('category-selected', this.selectedCategory)
    },
    sport(){
      this.selectedCategory = 21
      eventBus.$emit('category-selected', this.selectedCategory)
    },
    history(){
      this.selectedCategory = 23
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
