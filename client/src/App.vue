<template lang="html">
<div>
<home-page v-if="!selectedUser"/>
<navigation-bar v-if="selectedUser"/>
<!-- <navigation-bar/> -->


<question-grid :questions = "questions"/>

</div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import QuestionGrid from "./components/QuestionGrid.vue";
import QuestionItem from "./components/QuestionItem.vue";
import HomePage from './components/HomePage.vue'


import { eventBus } from "./main.js";

export default {
  name: "app",
  data() {
    return {
      questions: [],
      selectedCategory: null,
      selectedUser: null
    };
  },
  components: {
    "navigation-bar": NavigationBar,
    "question-grid": QuestionGrid,
    'home-page': HomePage
  },

  mounted() {
    eventBus.$on('user-selected', (user)=>{
      this.selectedUser = user
    })
    eventBus.$on("category-selected", category => {
      this.selectedCategory = category;

      



      fetch(
        `https://opentdb.com/api.php?amount=3&category=${this.selectedCategory}&difficulty=easy&type=boolean`
      )
        .then(res => res.json())
        .then(data => {
          this.questions = data.results;
        });
    })
  }

};
</script>

<style lang="css">
.main-font {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
}
</style>
