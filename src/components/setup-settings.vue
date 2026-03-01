<template>
  <button-back pmaincolor="secondary"></button-back>
  <blank-bar pbgcolor="bg-secondary" ptext="settings"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <div v-for="element in tabOptions" :key="element.name">
          <div v-if="tab == element.name">
            <list-item
              :psetup="true"
              pidentifier="name"
              pname="name"
              pdetaillink="setup-settings-detail"
              :ploaddata="true"
              pobject="settings"
              porderby="name"
              :pshowaddbutton="true"
              paddbuttonurl="setup-settings-detail"
              pmaincolor="secondary"
            ></list-item>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
  <div v-else>
    <div style="margin-left: 40%; width: 20%; margin-top: 20dvh">
      <div style="height: 10dvh">
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from 'components/button-back.vue';
import BlankBar from 'components/blank-bar.vue';
import TabBar from 'components/tab-bar.vue';
import ListItem from 'components/list-item.vue';
import { useQuasar } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../helpers/supabase';
var $q;
export default defineComponent({
  name: 'setup-settings',
  components: { ButtonBack, BlankBar, TabBar, ListItem },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const tab = ref('all settings');
    const tabOptions = ref([{ name: 'all settings' }]);

    onMounted(() => {
      checkIfUserIsLoggedIn();
    });

    function checkIfUserIsLoggedIn() {
      (async () => {
        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
            showElements.value = true;
          } else {
            // user is NOT logged in
            router.replace({ name: 'start-login' });
          }
        } catch (error) {
          if (error instanceof Error) {
            router.replace({ name: 'start-login' });
          }
        } finally {
        }
      })();
    }

    return {
      showElements,
      tab,
      tabOptions,
    };
  },
});
</script>
