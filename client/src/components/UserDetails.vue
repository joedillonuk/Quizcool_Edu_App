<template lang="html">
<div class="">
  <select v-on:change="handleSelectUser" v-model="selectedUser">
    <option class="main-font" disabled value="" selected>Select a user...</option>
    <option class="main-font" v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>

  </select>
  <h2 class="main-font">You have answered {{currentScore.length}} questions.</h2>
  <h2 class="main-font" v-if="currentScore.length">Your score is {{totalScore}}.</h2>
  <h2 class="main-font" v-if="percentage">You have answered {{percentage}}% of questions right.</h2>
</div>
</template>

<script>
import UserService from "../services/UserService.js";
import { eventBus } from '../main.js'
export default {
  name: 'user-details',
  data(){
    return {
      users: [],
      selectedUser: null,
      currentScore: []
    }
  },
  methods: {
    handleSelectUser(){
      eventBus.$emit('user-selected', this.selectedUser)
    }
  },
  mounted(){
      UserService.getUsers().then(users => (this.users = users));

      eventBus.$on("send-score", score => {
        this.currentScore.push(score);
      });

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
