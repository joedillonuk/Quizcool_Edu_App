<template lang="html">
  <div class="columns">
    <div class= "column is-one-third"></div>
    <div class= "card column is-one-third card-bkg">
      <h2 class="main-font">You have answered {{currentScore.length}} questions.</h2>
      <h2 class="main-font" v-if="currentScore.length">Your score is {{totalScore}}.</h2>
      <h2 class="main-font" v-if="percentage">You have answered {{percentage}}% of questions right.</h2>
      <button class="button" type="button" name="button" v-on:click="postPuzzleScore">Save Score</button>
      <button class="button" v-if="!displayLeaderboard" v-on:click="sortUsers">Display Leaderboard</button>
      <div v-if="displayLeaderboard">
        <table class="table is-striped" style="width:100%">
          <tr class="">
            <th>Name</th>
            <th>High Score</th>
          </tr>
          <tr v-for="user in users">
            <td>{{user.name}}</td>
            <td>{{user.highScore}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="column is-one-third">

    </div>
  </div>
</template>

<script>
import UserDetails from './UserDetails.vue'
import UserService from '../services/UserService.js'
import { eventBus } from '../main.js'

export default {
  name: 'results',
  data(){
    return {
      users: [],
      displayLeaderboard: null
    }
  },
  props: ['currentScore', 'selectedUser'],
  mounted(){

    this.postPuzzleScore()
    
    UserService.getUsers()
    .then(users => (this.users = users))


    // this.sortUsers();

  },
  computed: {
    totalScore: function() {
      return this.currentScore.reduce((sum, current) => sum + current, 0);
    },
    percentage: function() {
      return Math.round((100 / this.currentScore.length) * this.totalScore);
    }
  },
  methods: {
    sortUsers: function(){
      if (this.users){
        this.users.sort(function(a, b) {
          return b.highScore - a.highScore
        });
      }
      this.displayLeaderboard = true
    },

    postPuzzleScore: function(){
      if(this.selectedUser.highScore < this.totalScore){
        let id = this.selectedUser._id;
        const user = {
          highScore: this.totalScore
        }
        UserService.updateExistingUser(id, user)
      }
    }
  }

}
</script>

<style lang="css" scoped>
.card{
  margin-top: 100px;
  margin-bottom: 400px;
}
.card-bkg{
  background-color: #ffe680;
}
</style>
