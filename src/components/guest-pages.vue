<!--
http://localhost:9200/#/guest/pages/c_error__/
-->
<template>
  <main-pages
    :pguest="true"
    plinkpage="guest-pages"
    plinkpagedetail="guest-pages-detail"
  ></main-pages>
</template>

<script>
import MainPages from 'components/main-pages.vue';
export default {
  // name: 'ComponentName',
  components: { MainPages },
  setup() {},
};
</script>
