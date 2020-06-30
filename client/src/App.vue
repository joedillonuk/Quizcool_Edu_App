<template lang="html">
<div class="bkg">

<home-page v-if="!selectedUser"/>
<div >
  <navigation-bar v-if="selectedUser" :selectedUser="selectedUser"/>
  <!-- <user-details :selectedUser="selectedUser" v-if="selectedUser"/> -->
</div>

<div v-if="!completedQuiz">
<!-- <user-details :selectedUser="selectedUser" v-if="selectedUser"/> -->
<!-- <navigation-bar/> -->
<select v-model="selectedDifficulty" v-if="selectedUser && selectedUser.level.length > 1">
  <option v-for="difficulty in selectedUser.level" :value="difficulty">{{difficulty}}</option>
</select>
<question-grid :questions = "questions" v-if="selectedCategory"/>
</div>
<div v-if="completedQuiz">
<!-- <user-details :selectedUser="selectedUser"/> -->
<results :selectedUser="selectedUser"/>
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


import { eventBus } from "./main.js";

export default {
  name: "app",
  data() {
    return {
      questions: [],
      selectedCategory: null,
      selectedUser: null,
      completedQuiz: null,
      selectedDifficulty: "easy"
    };
  },
  components: {
    "navigation-bar": NavigationBar,
    "question-grid": QuestionGrid,
    'home-page': HomePage,
    'user-details': UserDetails,
    'results': Results
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
        `https://opentdb.com/api.php?amount=3&category=${this.selectedCategory}&difficulty=${this.selectedDifficulty}&type=boolean`
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

<style lang="css" scoped>
.main-font {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
}
.bkg{
  background-size: cover;
  background-image: url('./assets/backgrounds/home.jpg');
}
</style>
