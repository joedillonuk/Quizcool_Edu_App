<template lang="html">
  <div>
<div class="navbar-end">
  <p class="main-font navbar-item" >Total Points: {{this.totalScore}}</p>
  <p class="main-font navbar-item" >High Score: {{selectedUser.highScore}}</p>
  <!-- <label for="">Level:</label>
  <select v-model="selectedDifficulty" v-if="selectedUser && selectedUser.level.length > 1">
    <option v-for="difficulty in selectedUser.level" :value="difficulty">{{difficulty}}</option>
  </select> -->
        <div class="navbar-item has-dropdown is-hoverable" v-if="selectedUser">

          <!-- <p class="main-font navbar-item" >Level: {{selectedUser.level}}</p> -->

          <a class="navbar-link">
            <strong>{{selectedUser.name}}</strong>
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
      currentScore: [],
      puzzleScore: null,
      originalHighScore: null,

    }
  },
  props: ['selectedUser', 'selectedDifficulty'],
  mounted(){
    this.originalHighScore = this.selectedUser.highScore
    // added 'puzzle-result' eventBus. This is being added in the totalScore below.
        eventBus.$on('puzzle-result', (result)=>{
          this.puzzleScore = result;
          if (this.percentage >= 70 && this.selectedDifficulty === 'easy' && this.selectedUser.level.length === 1){
            this.selectedUser.level.push('medium');
            this.postUserScore();
            let message = `You have unlocked medium difficulty!`
            eventBus.$emit('level-message', message)
          } else if (this.percentage >= 70 && this.selectedDifficulty === 'medium' && this.selectedUser.level.length === 2){
            this.selectedUser.level.push('hard');
            this.postUserScore();
            let message = `You have unlocked hard difficulty!`
            eventBus.$emit('level-message', message)
          }
          this.updateIfHighScore();
        })

    eventBus.$on("send-score", score => {
      this.currentScore.push(score)


      this.updateIfHighScore()
      this.sendResult()
      this.sendScore()
    });




  },
  computed: {

    // updated totalScore to include the completed puzzleScore
    // puzzleScore is being added via the mounted 'puzzle-result' eventBus
    totalScore: function() {
      return (this.currentScore.reduce((sum, current) => sum + current, 0)) + this.puzzleScore;
    },
    percentage: function() {
      return Math.round((100 / this.currentScore.length) * this.totalScore);
    },
    completedQuiz: function(){
      if (this.currentScore.length == 6){
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
        level: this.selectedUser.level,
        highScore: this.selectedUser.highScore
      }
      UserService.updateExistingUser(id, user)
    },
    updateIfHighScore: function(){
      if(this.totalScore > this.selectedUser.highScore){
        // let originalHighScore = this.selectedUser.highScore
        this.selectedUser.highScore = this.totalScore
        this.postUserScore()
        // let newHighScore = this.selectedUser.highScore
        const highScoreString = `You got a new high score! You beat your previous best by ${this.selectedUser.highScore - this.originalHighScore} points!`
        eventBus.$emit('high-score', highScoreString)
        console.log(highScoreString);

      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
