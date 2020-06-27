<template lang="html">
<div>
<navigation-bar :users = "users"/>
<question-grid :questions = "questions"/>

<!-- Running total display for test -->
<!-- Displays the number of questions answered -->
<!-- Total score and percentage correct to be added -->
<!-- (currentScore.reduce did not work withing double curlies) -->
<br>
<br>
<h2>You have answered {{currentScore.length}} questions.</h2>
<h2 v-if="currentScore.length">Your score is {{totalScore}}.</h2>
</div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import QuestionGrid from './components/QuestionGrid.vue'
import UserService from './services/UserService.js'
import QuestionItem from './components/QuestionItem.vue'


import { eventBus } from './main.js'



export default {
  name: 'app',
  data(){
    return {
      questions: [],
      category: [],
      selectedCategory: null,
      users: [],
      selectedUser: null,
      currentScore: []
    }
  },
  components:{
    'navigation-bar': NavigationBar,
    'question-grid': QuestionGrid
  },

  mounted(){
    UserService.getUsers()
        .then(users => this.users = users);

    eventBus.$on('category-selected', (category) => {
      this.selectedCategory = category

      fetch(`https://opentdb.com/api.php?amount=3&category=${this.selectedCategory}&difficulty=easy&type=boolean`)
      .then( res => res.json())
      .then(data => {this.questions = data.results
        this.category = data.results[0].category
      })
    }),

    eventBus.$on('user-selected', (user) => {
      this.selectedUser = user})

    eventBus.$on('send-score', (score) => {
      this.currentScore.push(score)})

  },
  computed: {
    totalScore: function(){
      return this.currentScore.reduce((sum, current) => sum + current, 0)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
