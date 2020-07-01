<template lang="html">
  <div class="columns">
    <div class= "column is-one-third"></div>
    <div class= "card column is-one-third card-bkg has-text-centered">
      <h1 class="main-font"><b>Hey {{selectedUser.name}}, you scored {{totalScore + puzzleScore}} points!.</b></h1>
<br>
    <h2 class="main-font">You answered <strong>{{currentScore.length}}</strong> questions.</h2>
    <h2 class="main-font" v-if="currentScore.length">You got <strong>{{totalScore}}</strong> correct, (that's {{percentage}}%) and got <strong>{{puzzleScore}}</strong> points for the puzzle!</h2>

<br>
    <h2 class="main-font" v-if="highScoreString">{{highScoreString}}</h2>
<br>
    <button class="button" v-if="!displayLeaderboard" v-on:click="sortUsers">Display Leaderboard</button>
    <button class="button" v-on:click="playAgain">Play Again</button>
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
  props: ['currentScore', 'highScoreString', 'selectedUser', 'puzzleScore'],
  mounted(){



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
    playAgain(){
      location.reload();
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
