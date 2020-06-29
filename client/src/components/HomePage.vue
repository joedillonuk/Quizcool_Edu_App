<template lang="html">
  <div class="card has-text-centered" style="width: 300px;">
    <div class="columns.is-centered">
      <!-- <div class="column"></div> -->
      <div class="column">
        <header class="card-header">
          <p class="card-header-title is-centered">Welcome</p>
        </header>
        <!-- <user-details :selectedUser="selectedUser" v-if="selectedUser"/> -->
        <div class="card-content">
          <div class="content">
            <select v-on:change="handleSelectUser" v-model="selectedUser">
              <option class="main-font" disabled value="" selected>Select a user...</option>
              <option class="main-font" v-for="(user, index) in users"  :value="user" :key="index">{{user.name}}</option>
            </select>
            <p>create new user</p>
            <form v-on:submit="createUser">
              <!-- <label for="">Name</label> -->
              <input placeholder="Enter Name" type="text" v-model="name">
              <input class="" type="submit" value="Add User">
            </form>
            <!-- <div class="column"></div> -->
          </div>
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
.card.has-text-centered{
  display: flex;
  justify-content: center;
  margin-left: 400px;
  margin-right: 400px;
  margin-top: 150px;
}
/* .background{
  background-image: url('../assets/backgrounds/home.jpeg');
} */
</style>
