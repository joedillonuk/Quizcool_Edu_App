<template lang="html">
<div class="">
  <p>Welcome</p>
  <user-details/>
  <p>create new user</p>
  <form v-on:submit="createUser">
  <label for="">Name</label>
  <input type="text" v-model="name">
  <input type="submit" name="" value="Add User">
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
      points: 0
    }
  },
  methods:{
    createUser(event){
      event.preventDefault()
      const payload = {
        name: this.name,
        level: this.level,
        points: this.points
      }
    eventBus.$emit('new-user', payload)
    this.name = ''
    }
  },
  components:{
    'user-details': UserDetails
  }
}
</script>

<style lang="css" scoped>
</style>
