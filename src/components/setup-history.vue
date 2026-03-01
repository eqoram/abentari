<!--
http://localhost:9200/#/guest/objects/c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b/
-->
<template>
  <main-history
    :psetup="true"
    :psearch="false"
    :pshowsearch="false"
    pmaincolor="secondary"
    plinkobject="setup-history"
    plinkobjectdetail="setup-history-detail"
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
