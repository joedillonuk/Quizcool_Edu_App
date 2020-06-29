<template lang="html">
<div>

<home-page v-if="!selectedUser"/>

<navigation-bar v-if="selectedUser"/>
<div v-if="!completedQuiz">
<user-details :selectedUser="selectedUser" v-if="selectedUser"/>
<!-- <navigation-bar/> -->
<question-grid :questions = "questions"/>
</div>
<div v-if="completedQuiz">
Well done!
</div>
</div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import QuestionGrid from "./components/QuestionGrid.vue";
import QuestionItem from "./components/QuestionItem.vue";
import HomePage from './components/HomePage.vue'
import UserDetails from './components/UserDetails.vue'


import { eventBus } from "./main.js";

export default {
  name: "app",
  data() {
    return {
      questions: [],
      selectedCategory: null,
      selectedUser: null,
      completedQuiz: null
    };
  },
  components: {
    "navigation-bar": NavigationBar,
    "question-grid": QuestionGrid,
    'home-page': HomePage,
    'user-details': UserDetails
  },

  mounted() {
    eventBus.$on('user-selected', (user)=>{
      this.selectedUser = user
    })
    eventBus.$on("category-selected", category => {
      this.selectedCategory = category;

      eventBus.$on('quiz-completed', (quiz) => {
        // this.sleep(3000)
        this.completedQuiz = quiz
      })



      fetch(
        `https://opentdb.com/api.php?amount=3&category=${this.selectedCategory}&difficulty=easy&type=boolean`
      )
        .then(res => res.json())
        .then(data => {
          this.questions = data.results;
        });
    })
  },
  methods: {
    sleep: function(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }
  }

};
</script>

<style lang="css">
.main-font {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
}
</style>
