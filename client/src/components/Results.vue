<template lang="html">
  <div>
    <button v-if="!displayLeaderboard" v-on:click="sortUsers">Display Leaderboard</button>
    <div v-if="displayLeaderboard">
      <table style="width:100%">
        <tr>
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
</template>

<script>
import UserDetails from './UserDetails.vue'
import UserService from '../services/UserService.js'

export default {
  name: 'results',
  data(){
    return {
      users: [],
      displayLeaderboard: null
    }
  },
  mounted(){
    UserService.getUsers()
    .then(users => (this.users = users))

    // this.sortUsers();

  },
  methods: {
    sortUsers: function(){
      if (this.users){
        this.users.sort(function(a, b) {
          return b.highScore - a.highScore
        });
      }
      this.displayLeaderboard = true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
