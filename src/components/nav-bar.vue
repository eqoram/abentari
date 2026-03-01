<template>
  <q-page-sticky
    style="
      z-index: 99;
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    "
    position="top-left"
    :offset="[20, 20]"
  >
    <q-btn fab color="white" @click="storeDrawer.drawer = !storeDrawer.drawer">
      <q-icon name="menu" class="text-primary" />
    </q-btn>
  </q-page-sticky>
  <q-drawer
    v-model="storeDrawer.drawer"
    show-if-above
    bordered
    style="max-width: 400px; width: 40vw; min-width: 250px"
  >
    <nav-item
      :pbgcolor="props.pgcolor"
      :pmaintext="props.pmaincolor"
      :puseremail="props.puseremail"
      :pshowhome="props.pshowhome"
      :pshowuser="props.pshowuser"
      :pshowversion="props.pshowversion"
    ></nav-item>
  </q-drawer>
</template>

<script>
import NavItem from 'components/nav-item.vue';
import { defineComponent, ref, onMounted } from 'vue';
import { useDrawerStore } from '../stores/drawer';
export default defineComponent({
  components: { NavItem },
  props: {
    pbgcolor: {
      type: String,
      default: 'bg-primary',
    },
    pmaintext: {
      type: String,
      default: 'abentari',
    },
    puseremail: {
      type: String,
      default: 'user',
    },
    pshowhome: {
      type: Boolean,
      default: true,
    },
    pshowuser: {
      type: Boolean,
      default: true,
    },
    pshowversion: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const showDrawer = ref(false);
    const storeDrawer = useDrawerStore();

    onMounted(() => {});

    return {
      showDrawer,
      storeDrawer,
      props,
    };
  },
});
</script>
