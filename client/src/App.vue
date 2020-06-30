<template lang="html">
<div class="bkg">

<home-page v-if="!selectedUser"/>
<div >
<navigation-bar v-if="selectedUser" :selectedUser="selectedUser"/>

</div>
<welcome-page v-if="!selectedCategory && !selectedDifficulty"  :selectedUser="selectedUser"/>
<div v-if="!completedQuiz">
<!-- <select v-model="selectedDifficulty" v-if="selectedUser && selectedUser.level.length > 1">
  <option v-for="difficulty in selectedUser.level" :value="difficulty">{{difficulty}}</option>
</select> -->
<question-grid :questions = "questions" v-if="selectedCategory && selectedDifficulty"/>
</div>
<div v-if="completedQuiz">
<results :currentScore="currentScore"/>
</div>
<div class="center" v-if="completedQuiz">
  <puzzle/>
</div>

</div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import QuestionGrid from "./components/QuestionGrid.vue";
import QuestionItem from "./components/QuestionItem.vue";
import HomePage from './components/HomePage.vue'
import UserDetails from './components/UserDetails.vue'
import Results from './components/Results.vue'
import Puzzle from './components/Puzzle.vue'
import WelcomePage from './components/WelcomePage.vue'


import { eventBus } from "./main.js";

export default {
  name: "app",
  data() {
    return {
      questions: [],
      selectedCategory: null,
      selectedUser: null,
      completedQuiz: null,
      selectedDifficulty: null,
      currentScore: []
    };
  },
  components: {
    "navigation-bar": NavigationBar,
    "question-grid": QuestionGrid,
    'home-page': HomePage,
    'user-details': UserDetails,
    'results': Results,
    'puzzle': Puzzle,
    'welcome-page': WelcomePage
  },



  mounted() {
    eventBus.$on('user-selected', (user)=>{
      this.selectedUser = user
    })
    eventBus.$on('selected-difficulty', (level) => {
      this.selectedDifficulty = level
    })
    eventBus.$on("category-selected", category => {
      this.selectedCategory = category;

      eventBus.$on('quiz-completed', (quiz) => {
        // this.sleep(3000)
        this.completedQuiz = quiz
      })

      eventBus.$on('current-score', result => {
        this.currentScore = result
      })



      fetch(
        `https://opentdb.com/api.php?amount=3&category=${this.selectedCategory}&difficulty=${this.selectedDifficulty}&type=multiple`
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
    },
    onListUpdated(level){
     this.selectedDifficulty = level
  }
  }

};
</script>

<style lang="css">
.main-font {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
}
.bkg {
  background: url('./assets/backgrounds/home.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 900px;
}
/* .bkg{
  background-size: cover;
  background-image: url('./assets/backgrounds/home.jpg');
  height: 900px;
} */

</style>
