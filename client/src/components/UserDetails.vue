<template lang="html">
<div class="">
  <h2>Hi, {{selectedUser.name}}</h2>
  <h2>total points: {{selectedUser.points}}</h2>
  <h2>level: {{selectedUser.level}}</h2>
  <button type="button" name="button">Log out(?)</button>
  <h2 class="main-font">You have answered {{currentScore.length}} questions.</h2>
  <h2 class="main-font" v-if="currentScore.length">Your score is {{totalScore}}.</h2>
  <h2 class="main-font" v-if="percentage">You have answered {{percentage}}% of questions right.</h2>
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
      users: [],
      currentScore: []
    }
  },
props: ['selectedUser'],
  mounted(){
      eventBus.$on("send-score", score => {
        this.currentScore.push(score);
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
    }
  },
}
</script>

<style lang="css" scoped>
</style>
