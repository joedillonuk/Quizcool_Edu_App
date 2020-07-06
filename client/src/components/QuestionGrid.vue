<template lang="html">

    <div class="question-font columns">
      <div class="column is-one-third"></div>
      <div class="card column is-one-third card-bkg">
        <spinner v-if="loading" class="spinner"/>
        <div v-else>
        <ol v-for=" question in questions" >
          <question-item :question="question"/>
        </ol>
        </div>
        <br>
        <!-- <div class="next" v-if="this.currentScore.length % 5 == 0">
        <h2><strong>Please select next category</strong></h2>
      </div> -->
    </div>
    <div class="column is-one-third"></div>
  </div>

</template>

<script>
import QuestionItem from './QuestionItem.vue'
export default {
  name: 'question-grid',
  props: ['questions', 'currentScore', 'loading'],
  components:{
    'question-item': QuestionItem
  }
}
</script>

<style lang="css">
.spinner{
  display:block;
  justify-content: center;
  margin-left: 210px;
}
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
.next{
  text-align: center;
}
</style>
