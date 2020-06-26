<template lang="html">
  <div>
    <p>{{question.question}}</p>
    <label for="answer">Answer:</label>
    <input v-model="answer" type="radio" name="answer" :value="true">True</input>
    <input v-model="answer" type="radio" name="answer" :value="false">False</input>
    <br>
    <button v-on:click="decideAnswer" type="button" name="button">Submit</button>
    <p v-if="this.answer === question.correct_answer">Correct</p>
    <p v-if="this.answer ==! question.correct_answer">Wrong</p>
  </div>
</template>

<script>
export default {
  name: 'question-item',
  props: ['question'],
  data(){
    return {
      answer: null
    }
  },
  methods: {
    decideAnswer: function(){

    }
  }
}
</script>

<style lang="css" scoped>
</style>
