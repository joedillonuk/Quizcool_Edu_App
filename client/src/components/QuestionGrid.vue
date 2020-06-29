<template lang="html">
<div class="question-font columns">
  <div class="column is-one-third"></div>
  <div class="card column is-one-third card-bkg">
<ol v-for=" question in questions" >
  <question-item :question="question"/>
</ol>
</div>
<div class="column is-one-third"></div>
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
.card{
  margin-top: 80px;
  /* box-shadow: 5px 10px green; */

}
.card-bkg{
  background-color: #e8e4e1;
  /* opacity: 0.5; */
}
</style>
