<template lang="html">
  <div v-if="selectedUser">
    <div v-if="completedQuiz">
      <h1>Well done {{selectedUser.name}}!</h1>
      <h2>You scored {{this.totalScore}}.</h2>
      <h2>Level: {{selectedUser.level.length}}</h2>
      <!-- <button type="button" name="button" v-on:click="logOut">Log out</button> -->
      <p class="main-font">You have answered {{currentScore.length}} questions.</p>
      <p class="main-font" v-if="percentage">You have answered {{percentage}}% of questions right.</p>
    </div>
    <div v-if="!completedQuiz">
      <h2 class="main-font" v-if="currentScore.length">Your score is {{totalScore}}.</h2>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService.js";
import { eventBus } from '../main.js'
import HomePage from './HomePage.vue'
export default {
  name: 'user-details',
  data(){
    return {
      currentScore: []
    }
  },
  props: ['selectedUser'],
  mounted(){
    eventBus.$on("send-score", score => {
      this.currentScore.push(score);
      if(this.totalScore > this.selectedUser.highScore){
        this.selectedUser.highScore = this.totalScore
        this.postUserScore()
      }
      this.sendResult()

    });


    // eventBus.$on('new-user', (payload) => {
    //     UserService.updateUser(payload)
    //     .then(user => {this.users.push(user)
    //       ,
    //   this.selectedUser = user
    // })

  },
  computed: {
    totalScore: function() {
      return this.currentScore.reduce((sum, current) => sum + current, 0);
    },
    percentage: function() {
      return Math.round((100 / this.currentScore.length) * this.totalScore);
    },
    completedQuiz: function(){
      if (this.currentScore.length == 3){
        // this.sleep(3000)
        return true
      } else {
        return false
      }
    },

  },
  methods:{
    logOut(){
      location.reload();
    },
    sendResult: function(){
      if(this.completedQuiz == true){
        eventBus.$emit('quiz-completed', this.completedQuiz)
      }
    },
    sleep: function(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    },
    postUserScore: function(){
      let id = this.selectedUser._id;
      const user = {
        highScore: this.selectedUser.highScore
      }
      UserService.updateExistingUser(id, user)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
