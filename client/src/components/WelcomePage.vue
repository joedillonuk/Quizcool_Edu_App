<template lang="html">
  <div class="columns" v-if="selectedUser">
    <div class="column is-one-third"></div>
    <div class="card column is-one-third card-bkg" >
      <h2>Welcome {{selectedUser.name}}</h2>
      <h3>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."<br>
        Please select difficulty level:
        <select v-model="selectedDifficulty">
          <option disabled value="" ></option>
          <option v-for="difficulty in selectedUser.level" :value="difficulty">{{difficulty}}</option>
        </select>
      </h3>
      <input type="submit" v-on:click="sendLevel">

    </div>
    <div class="column is-one-third"></div>
  </div>
</template>

<script>
import { eventBus } from '../main.js'
export default {
  name: 'welcome-page',
  props: ['selectedUser'],
  data(){
    return {
      selectedDifficulty: null
    }
  },
  mounted(){
    
  },
  methods:{
    sendLevel(){
      eventBus.$emit('selected-difficulty', this.selectedDifficulty)
    }
  }
}
</script>

<style lang="css" scoped>
.card{
  margin-top: 160px;
  margin-bottom: 200px;
}
.card-bkg{
  background-color: #ffe680;
}
</style>
