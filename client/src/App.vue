<template lang="html">
<div>
<navigation-bar :category = "category"/>
<question-grid :questions = "questions"/>
</div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import QuestionGrid from './components/QuestionGrid.vue'
export default {
  name: 'app',
  data(){
    return {
      questions: [],
      category: []
    }
  },
  components:{
    'navigation-bar': NavigationBar,
    'question-grid': QuestionGrid
  },

  mounted(){
    fetch('https://opentdb.com/api.php?amount=3&category=22&difficulty=easy&type=boolean')
    .then( res => res.json())
    .then(data => {this.questions = data.results
      this.category = data.results[0].category
    })
  }
}
</script>

<style lang="css" scoped>
</style>
