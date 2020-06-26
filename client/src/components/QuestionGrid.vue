<template lang="html">
<div>
<ol v-for=" question in questions" >
  <question-item :question="question"/>
</ol>
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
</style>
