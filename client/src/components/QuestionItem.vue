<template lang="html">
  <div>
    <p>{{escapeHtml(question.question)}}</p>
    <label for="answer">Answer:</label>
    <input v-model="answer" type="radio" name="answer" value="True">True</input>
    <input v-model="answer" type="radio" name="answer" value="False">False</input>
    <br>
    <button v-model="this.userScore" v-on:click="decideAnswer" type="button" name="button">Submit</button>
    <p v-if="this.answer === question.correct_answer">Correct</p>
    <p v-if="this.answer === question.incorrect_answers[0]">Wrong</p>
  </div>
</template>

<script>
export default {
  name: 'question-item',
  props: ['question'],
  data(){
    return {
      answer: null,
      userScore: 0
    }
  },
  methods: {
    decideAnswer: function(){
      if (this.answer === this.question.correct_answer && this.userScore === 0){
        this.userScore += 1
      } else {
        this.userScore = this.userScore
      }
    },
    escapeHtml(question) {
    return question
         .replace(/&amp/g, " ")
         .replace(/&lt;/g, "<")
         .replace(/&gt;/g, ">")
         .replace(/&quot;/g, "")
         .replace(/&#039;/g, "'");
 }
  }
}
</script>

<style lang="css" scoped>
</style>
