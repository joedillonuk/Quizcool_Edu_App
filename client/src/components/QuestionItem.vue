<template lang="html">

  <div>
    <p>{{escapeHtml(question.question)}}</p>
    <div class="main-font" v-if="!this.answer">
      <label for="answer">Answer:</label>
      <input v-on:change="sendScore()" v-model="answer" type="radio" name="answer" value="True">True</input>
      <input v-on:change="sendScore()" v-model="answer" type="radio" name="answer" value="False">False</input>
    </div>
    <br>

    <!-- <div v-if="!this.answer">
      <button v-model="this.userScore" v-on:click="decideAnswer" type="button" name="button">Submit</button>
    </div> -->

    <!-- <div>
      <p class="correct" v-if="this.answer === question.correct_answer">You answered {{this.answer}}. You are correct!</p>
      <p class="incorrect" v-if="this.answer === question.incorrect_answers[0]">You answered {{this.answer}}. You are incorrect.</p>
      <br>
    </div> -->

    <div>
      <img class="correct" v-if="this.answer === question.correct_answer" src="../assets/feedback/correct.png">
      <img class="incorrect" v-if="this.answer === question.incorrect_answers[0]" src="../assets/feedback/incorrect.png">
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
        answer: null,
        userScore: 0
      }
    },
    computed: {
      // userScore: function(){
      //   let score = 0;
      //   if (this.answer === this.question.correct_answer){
      //     score += 1
      //   }
      //   return score
      // }
    },
    methods: {
      sendScore() {
          if (this.answer === this.question.correct_answer){
            this.userScore += 1
          }

        if (this.answer){
          eventBus.$emit('send-score', this.userScore)
        }
        // this.sleep(3000)
      },
      // sleep: function(milliseconds) {
      //   const date = Date.now();
      //   let currentDate = null;
      //   do {
      //     currentDate = Date.now();
      //   } while (currentDate - date < milliseconds);
      // },

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
    },

  }
  </script>





  <style lang="css" scoped>

{/* .correct {
  color: green;
}

.incorrect {
  color: red;
} */}

img {
  width: 40px;
  margin: 10px
}

  </style>
