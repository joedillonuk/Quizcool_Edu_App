<template lang="html">
<div class="navigation">

</div>
</template>

<script>
export default {
  name: 'navigation-bar',
  data(){
    return {
      categories: []
    }
  },
  mounted(){
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data => this.categories = data.trivia_categories)
  }
}
</script>

<style lang="css" scoped>
</style>
