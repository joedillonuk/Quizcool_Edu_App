<template lang="html">
<div class="question-font">
<ol v-for=" question in questions" >
  <question-item :question="question"/>
</ol>
<!-- <button v-on:submit="addUserScore" type="button" name="button">Finish</button> -->
</div>
</template>

<script>
import QuestionItem from './QuestionItem.vue'
export default {
  name: 'question-grid',
  props: ['questions'],
  components:{
    'question-item': QuestionItem
  }
}
</script>

<style lang="css" scoped>
.question-font{
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
}
</style>
