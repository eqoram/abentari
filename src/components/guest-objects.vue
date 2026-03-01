<!--
http://localhost:9200/#/guest/objects/c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b/
-->
<template>
  <main-objects
    :pguest="true"
    plinkobject="guest-objects"
    plinkobjectdetail="guest-objects-detail"
  ></main-objects>
</template>

<script>
import MainObjects from 'components/main-objects.vue';
export default {
  // name: 'ComponentName',
  components: { MainObjects },
  setup() {},
};
</script>
