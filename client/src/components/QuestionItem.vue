<template lang="html">

  <div>
    <p>{{escapeHtml(question.question)}}</p>
    <div v-if="!this.answer">
      <label for="answer">Answer:</label>
      <input v-on:change="sendScore()" v-model="answer" type="radio" name="answer" value="True">True</input>
      <input v-on:change="sendScore()" v-model="answer" type="radio" name="answer" value="False">False</input>
    </div>
    <br>

    <!-- <div v-if="!this.answer">
      <button v-model="this.userScore" v-on:click="decideAnswer" type="button" name="button">Submit</button>
    </div> -->

    <div>
      <p class="correct" v-if="this.answer === question.correct_answer">You answered {{this.answer}}. You are correct!</p>
      <p class="incorrect" v-if="this.answer === question.incorrect_answers[0]">You answered {{this.answer}}. You are incorrect.</p>
      <br>
    </div>

  </div>
  </template>

  <script>
  import { eventBus } from '../main.js'



  export default {
    name: 'question-item',
    props: ['question'],
    data(){
      return {
        answer: null
      }
    },
    computed: {
      userScore: function(){
        let score = 0;
        if (this.answer === this.question.correct_answer){
          score += 1
        }
        return score
      }
    },
    methods: {
      sendScore() {
        if(this.answer){
          eventBus.$emit('send-score', this.userScore)
        }
      },

      escapeHtml(question) {
        return question
        .replace(/&amp/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "")
        .replace(/&#039;/g, "'")
        .replace(/&deg;/g, "°");
      }
    },
    mounted() {
      eventBus.$on('category-selected', (category) => {
      this.answer = null})
    }
  }
  </script>





  <style lang="css" scoped>

.correct {
  color: green;
}

.incorrect {
  color: red;
}

  </style>
