<template lang="html">
<div class="question-font columns">
  <div class="column is-one-third"></div>
  <div class="card column is-one-third card-bkg">
<ol v-for=" question in questions" >
  <question-item :question="question"/>
</ol>
<br>
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

<style lang="css">
.question-font{
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
}
.card{
  margin-top: 80px;
  margin-bottom: 200px;

}
.card-bkg{
  background-color: #41E0B5;
}

</style>
