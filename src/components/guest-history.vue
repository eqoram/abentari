<!--
http://localhost:9200/#/guest/objects/c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b/
-->
<template>
  <main-history
    :pguest="true"
    plinkobject="guest-history"
    plinkobjectdetail="guest-history-detail"
  ></main-history>
</template>

<script>
import MainHistory from 'components/main-history.vue';
export default {
  // name: 'ComponentName',
  components: { MainHistory },
  setup() {},
};
</script>
