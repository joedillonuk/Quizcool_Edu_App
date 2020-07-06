<template lang="html">
  <div id="loading"/>

</template>

<script>
export default {
  props: ['icon']
}
</script>

<style lang="css" scoped>
/* .geography{
  background: url("../../assets/icons/geography-color.png")
} */

#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 30px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
