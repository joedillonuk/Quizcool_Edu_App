<template lang="html">
  <div>
    <img class="center" src="../assets/icons/question.png" alt="logo">
    <div class="columns">
      <div class="column is-one-third"></div>
      <div class="card column is-one-third">
        <header class="card-header">
          <p class="card-header-title is-centered">Welcome!</p>
        </header>
        <div class="card-content">
          <div class="content is-centered">
            <select v-on:change="handleSelectUser" v-model="selectedUser">
              <option class="main-font" disabled value="" selected>Select a user...</option>
              <option class="main-font" v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>
            </select>
            <p class="user">create new user</p>
            <form v-on:submit="createUser">
              <input placeholder="Enter Name" type="text" v-model="name" class="input">
              <!-- <div class="field"> -->
  <!-- <p class="control has-icons-left has-icons-right">
    <input class="input" type="text" placeholder="enter name...">
    <span class="icon is-small is-left">
      <i class="fa fa-user-circle"></i>
    </span></p></div> -->
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
      level: ["easy"],
      highScore: 0,
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
        highScore: this.highScore
      }
      UserService.updateUser(payload)
      .then(user => {this.users.push(user)
        ,
      this.selectedUser = this.users[(this.users.length) - 1]
      eventBus.$emit('user-selected', this.selectedUser)
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
  margin-bottom: 230px;
  text-align: center;
  background-color: #41E0B5;
}
.user{
  margin-top: 35px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
}
.background{
  background-image: url('../assets/backgrounds/home.jpg');
}
img.center {
    display: block;
    margin: 0 auto;
    height: 150px;
    width: 150px;
    padding-top: 15px
}
.columns{
  margin-top: -165px
}
</style>
