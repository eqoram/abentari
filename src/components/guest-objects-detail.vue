<!--
http://localhost:9200/#/guest/objects/c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b/
-->
<template>
  <main-objects-detail
    :pguest="true"
    plinkobject="guest-objects"
    plinkobjectdetail="guest-objects-detail"
  ></main-objects-detail>
</template>

<script>
import MainObjectsDetail from 'components/main-objects-detail.vue';
export default {
  // name: 'ComponentName',
  components: { MainObjectsDetail },
  setup() {},
};
</script>
