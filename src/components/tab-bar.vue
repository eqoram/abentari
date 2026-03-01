<template>
  <div v-if="ptabalways || (tabOptions && tabOptions.length > 1)" style="padding-top: 100px">
    <div>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        align="justify"
        :active-color="pcolor"
        style="z-index: 999"
      >
        <q-tab style="pointer-events: none" :name="tab" :label="tab" />
        <q-btn-dropdown v-if="tabOptions.length > 1" auto-close stretch flat label="More">
          <q-list>
            <div v-for="taboption in tabOptions" v-bind:key="taboption.name">
              <q-item
                v-if="taboption.name != tab"
                clickable
                @click="
                  tab = taboption.name;
                  tabid = taboption.id;
                  $emit('updatevalue', tab);
                  $emit('updateid', tabid);
                "
              >
                <q-item-section class="text-center">{{ taboption.name }}</q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
      <q-separator />
    </div>
  </div>
  <div v-else>
    <h2 :class="'text-' + pcolor">{{ tab }}&nbsp;</h2>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  // name: 'ComponentName',
  props: {
    pcolor: {
      type: String,
      default: 'secondary',
    },
    ptab: {
      type: String,
    },
    pid: {
      type: String,
    },
    ptaboptions: {
      type: Array,
    },
    ptabalways: {
      type: Boolean,
      default: false,
    },
    pshowtabs: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const tab = ref('');
    const tabOptions = ref([]);
    const tabid = ref('');
    if (props.pshowtabs) {
      tab.value = props.ptab;
      tabOptions.value = props.ptaboptions;
      tabid.value = props.pid;
    } else {
      tab.value = '';
      tabOptions.value = ref([]);
    }

    watch(props, () => {
      if (props.pshowtabs) {
        tab.value = props.ptab;
        tabOptions.value = props.ptaboptions;
        tabid.value = props.pid;
      } else {
        tab.value = '';
        tabOptions.value = ref([]);
      }
    });

    return {
      tab,
      tabOptions,
      tabid,
    };
  },
};
</script>
