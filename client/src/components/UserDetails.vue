<template lang="html">
<div class="">
  <select v-on:change="handleSelectUser" v-model="selectedUser">
    <option disabled value="" selected>Select a user...</option>
    <option v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>

  </select>

  <h2>You have answered {{currentScore.length}} questions.</h2>
  <h2 v-if="currentScore.length">Your score is {{totalScore}}.</h2>
  <h2 v-if="percentage">You have answered {{percentage}}% of questions right.</h2>
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
      eventBus.$on('new-user', (payload) => {
        UserService.updateUser(payload)
        .then(user => {this.users.push(user),
      this.selectedUser = user})
      this.handleSelectUser()
      })

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
