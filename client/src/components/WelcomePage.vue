<template lang="html">
  <div class="columns" v-if="selectedUser">
    <div class="column is-one-third"></div>
    <div class="card column is-one-third card-bkg has-text-centered" >
      <h2>Hi <strong>{{selectedUser.name}}</strong>,</h2>
      <h3>Are you ready to test your knowledge in :
        Geography,
        Sports,
        History,
        Science and Computing<strong>?</strong><br>
        Are you up for competition with other players<strong>?</strong><br>
        <strong>Answer all questions from each category to receive bonus</strong>
        Let's select difficulty level first, then pick a category:<br>
        <select class="select is-small" v-model="selectedDifficulty"v-on:change="sendLevel">
          <option value="easy" >Select a level...</option>
          <option v-for="difficulty in selectedUser.level" :value="difficulty">{{difficulty}}</option>
        </select>
      </h3>
<h4>Once you collect more points more difficulty level will become available</h4>

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
