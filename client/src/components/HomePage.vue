<template lang="html">
<div class="">
  <p>Welcome</p>
  <!-- <user-details/> -->
  <select v-on:change="handleSelectUser" v-model="selectedUser">
    <option class="main-font" disabled value="" selected>Select a user...</option>
    <option class="main-font" v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>
  </select>
  <p>create new user</p>
  <form v-on:submit="createUser">
  <label for="">Name</label>
  <input type="text" v-model="name">
  <input type="submit" value="Add User">
  </form>
</div>
</template>

<script>
import UserDetails from './UserDetails.vue'
import UserService from '../services/UserService.js'
import { eventBus } from '../main.js'
export default {
  name: 'home-page',
  data(){
    return{
      name: null,
      level: 0,
      points: 0,
      selectedUser: null,
      users: []
    }
  },
  mounted(){
      UserService.getUsers().then(users => (this.users = users));
    },
  methods:{

      handleSelectUser(){
        eventBus.$emit('user-selected', this.selectedUser)
      },


    createUser(event){
      event.preventDefault()
      const payload = {
        name: this.name,
        level: this.level,
        points: this.points
      }
    eventBus.$emit('new-user', payload)
    this.name = ''
    this.users.push(payload)
    }
  },
  components:{
    'user-details': UserDetails
  }
}
</script>

<style lang="css" scoped>
</style>
