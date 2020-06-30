<template lang="html">
<div>
  <p class="main-font navbar-item" >Total Points: {{this.totalScore}}</p>
  <p class="main-font navbar-item" >High Score: {{selectedUser.highScore}}</p>
  <!-- <label for="">Level:</label>
  <select v-model="selectedDifficulty" v-if="selectedUser && selectedUser.level.length > 1">
    <option v-for="difficulty in selectedUser.level" :value="difficulty">{{difficulty}}</option>
  </select> -->
        <div class="navbar-item has-dropdown is-hoverable" v-if="selectedUser">

          <!-- <p class="main-font navbar-item" >Level: {{selectedUser.level}}</p> -->

          <a class="navbar-link">
            {{selectedUser.name}}
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" v-on:click="logOut">
              Log Out
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" v-on:click="deleteUser">
              Delete Account
            </a>
          </div>
          <div class="">
          </div>

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
      this.currentScore.push(score)

      if(this.totalScore > this.selectedUser.highScore){
        this.selectedUser.highScore = this.totalScore
        this.postUserScore()
      }
      this.sendResult()
      this.sendScore()
    });



  },
  computed: {
    totalScore: function() {
      return this.currentScore.reduce((sum, current) => sum + current, 0);
    },
    percentage: function() {
      return Math.round((100 / this.currentScore.length) * this.totalScore);
    },
    completedQuiz: function(){
      if (this.currentScore.length == 10){
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
    deleteUser(){
      let id = this.selectedUser._id;
      UserService.deleteUser(id)
      location.reload()
    },
    sendResult: function(){
      if(this.completedQuiz == true){
        eventBus.$emit('quiz-completed', this.completedQuiz)
      }
    },
    sendScore: function(){
      eventBus.$emit('current-score', this.currentScore)
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
