<!--
http://localhost:9200/#/guest/home/
-->
<template>
  <main-home :pguest="true"></main-home>
</template>

<script>
import MainHome from 'components/main-home.vue';
export default {
  // name: 'ComponentName',
  components: { MainHome },
  setup() {},
};
</script>
