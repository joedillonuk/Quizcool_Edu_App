<template lang="html">
  <div>
    <div class="columns">
      <div class="column is-one-third"></div>
      <div class="card column is-one-third">
        <header class="card-header">
          <p class="card-header-title is-centered">Welcome</p>
        </header>
        <div class="card-content">
          <div class="content is-centered">
            <select v-on:change="handleSelectUser" v-model="selectedUser">
              <option class="main-font" disabled value="" selected>Select a user...</option>
              <option class="main-font" v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>
            </select>
            <p>create new user</p>
            <form v-on:submit="createUser">
              <input placeholder="Enter Name" type="text" v-model="name">
              <input class="" type="submit" value="Add User">
            </form>
            </div>
            <div class="column is-one-third"></div>
          </div>
        </div>

    </div>
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
      UserService.updateUser(payload)
      .then(user => {this.users.push(user)
        ,
        this.selectedUser = user.name
      })
      this.name = ''
    }
  },
  components:{
    'user-details': UserDetails
  }
}
</script>

<style lang="css" scoped>
.card{
  margin-top: 200px;
  margin-bottom: 250px;
  /* margin-right: 100px; */
  text-align: center;
  background-color: #ffe680;
}
/* .background{
  background-image: url('../assets/backgrounds/home.jpeg');
} */
</style>
