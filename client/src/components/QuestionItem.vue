<template lang="html">

  <div>

    <audio id="correct">
      <source src="../assets/sfx/correct.wav" type="audio/wav">
        </audio>

        <audio id="incorrect">
          <source src="../assets/sfx/incorrect.wav" type="audio/wav">
            </audio>

        <p>{{escapeHtml(question.question)}}</p>
        <div class="main-font" v-if="!this.answer">
          <label for="answer">Answer:</label>
          <div v-for="i in answers">
            <input v-on:change="sendScore()" v-model="answer" type="radio" name="answer" :value="i"> {{ i }}</input>
            <br>
          </div>
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
      <img class="incorrect" v-if="this.answer !== question.correct_answer && this.answer" src="../assets/feedback/incorrect.png">
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
      userScore: 0,
      answers: []    }
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

        let audio = document.getElementById("correct");
        this.playAudio(audio);
        eventBus.$emit('send-score', this.userScore)
      }

      if (this.answer !== this.question.correct_answer){

        let audio = document.getElementById("incorrect");
        this.playAudio(audio);

        eventBus.$emit('send-score', this.userScore)
      }
      // this.sleep(3000)
    },
    sleep: function(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    },

    escapeHtml(question) {
      return question
      .replace(/&amp/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "")
      .replace(/&#039;/g, "'")
      .replace(/&deg;/g, "°");
    },

    getAnswers(){
      this.question.incorrect_answers.map((incorrectAnswer) => {
        this.answers.push(incorrectAnswer)
      })
      this.answers.push(this.question.correct_answer);
      return this.answers
    },
<<<<<<< HEAD

    shuffleAnswers(array){
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
=======
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
        .replace(/&deg;/g, "°")
        .replace(/&Pi;/g, "π")
        .replace(/&Sigma;/g, "Σ")
        .replace(/&Omicron;/g, "Ο")
        .replace(/&Nu;/g, "Ν");
      },

      getAnswers(){
        this.question.incorrect_answers.map((incorrectAnswer) => {
          this.answers.push(incorrectAnswer)
        })
        this.answers.push(this.question.correct_answer);
        return this.answers
      },

      shuffleAnswers(array){
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
>>>>>>> aae3b514306ad08fbc4a4add835b64a6b72cbc2f
      }
    },
    playAudio(audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    // pauseAudio(audio) {
    //   this.audio.pause();
    // }
  },
  mounted() {
    eventBus.$on('category-selected', (category) => {
      this.answer = null})

      this.getAnswers();
      this.shuffleAnswers(this.answers);
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
  width: 175px;
  margin: 10px;
  padding-bottom: 10px;
<<<<<<< HEAD
  text-align:center;
=======
  text-align: center;
>>>>>>> aae3b514306ad08fbc4a4add835b64a6b72cbc2f
}

input {
  font-weight: 100
}

</style>
