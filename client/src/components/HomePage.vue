<template lang="html">
  <div>
    <div class="columns">
      <div class="column is-one-third"></div>
      <div class="card column is-one-third">
        <header class="card-header">
          <p class="card-header-title is-centered">Welcome!</p>
        </header>
        <div class="card-content">
          <div class="content is-centered">
            <label for="">Please select user</label>
            <p></p>
            <select v-on:change="handleSelectUser" v-model="selectedUser" class="select is-small">

              <option class="main-font" disabled value="" selected>Select a user...</option>
              <option class="main-font" v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>
            </select>
            <p></p>
            <p></p>
            <p class="main-font">Or <strong>create new user</strong> to play!</p>
            <form v-on:submit="createUser">
              <input placeholder="Enter Name" type="text" v-model="name" class="input is-dark">
              <p></p>
              <p></p>
              <input class="button" type="submit" value="Add User">
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
  margin-bottom: 230px;
  text-align: center;
  background-color: #41E0B5;
}
.user{
  margin-top: 35px;
  font-family: 'Ubuntu', sans-serif;
  /* font-weight: 500; */
}
.background{
  background-image: url('../assets/backgrounds/home.jpg');
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.button{
  background-color: white;
  color: black;
  border: 1px solid grey;
}


</style>
