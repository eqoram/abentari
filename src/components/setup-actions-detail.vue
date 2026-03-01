<template>
  <div>
    <q-page-sticky
      style="
        z-index: 99;
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
      "
      position="top-left"
      :offset="[80, 20]"
    >
      <q-btn fab color="secondary" @click="backButton()">
        <q-icon name="arrow_back_ios_new" class="text-white" />
      </q-btn>
    </q-page-sticky>
  </div>
  <blank-bar pbgcolor="bg-secondary" ptext="actions"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
    :pshowtabs="showTabs"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <div v-if="tab == 'general' || tab == 'new'">
          <detail-main
            :psetup="true"
            pmaincolor="secondary"
            pobject="actions"
            psingular="action"
            :pelements="[
              {
                label: 'id',
                name: 'id',
                type: 'id',
                value: null,
                required: true,
                notEditable: true,
              },
              {
                label: 'api_name',
                name: 'api_name',
                type: 'api',
                value: null,
                prefix: 'c_',
                required: true,
                notEditable: true,
              },
              {
                label: 'created_by',
                name: 'created_by',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'created_at',
                name: 'created_at',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'modified_by',
                name: 'modified_by',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'modified_at',
                name: 'modified_at',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'name',
                name: 'name',
                type: 'text',
                value: null,
                required: true,
              },
              {
                label: 'description',
                name: 'description',
                type: 'longtext',
                value: null,
                required: false,
              },
              {
                label: 'type',
                name: 'type',
                type: 'picklist',
                value: null,
                required: true,
                options: [
                  { label: 'home', value: 'home' },
                  { label: 'page list', value: 'pagelist' },
                  { label: 'page detail', value: 'pagedetail' },
                ],
              },
              {
                label: 'relation',
                name: 'relation',
                type: 'relation',
                value: null,
                required: true,
                showcondition:
                  'lrecord.value[`type`] && (lrecord.value[`type`] == `pagelist` || lrecord.value[`type`].value == `pagelist` || lrecord.value[`type`] == `pagedetail` || lrecord.value[`type`].value == `pagedetail`)',
                load: true,
                loadtable: 'objects',
                loadcolumn: 'name',
                loadvalue: 'api_name',
                phideiframebutton: true,
              },
              {
                label: 'is_active',
                name: 'is_active',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                label: 'action',
                name: 'action',
                type: 'longtext',
                value: null,
                required: true,
              },
            ]"
            pbacklink="setup-actions"
            :pupdateaction="true"
          ></detail-main>
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
import BlankBar from 'components/blank-bar.vue';
import TabBar from 'components/tab-bar.vue';
import DetailMain from 'components/detail-main.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
var $q;
export default {
  // name: 'ComponentName',
  components: { BlankBar, TabBar, DetailMain },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const maincolor = ref('secondary');
    const isEdit = ref(false);
    const userid = ref('');
    const useremail = ref('');
    const parameter = ref(false);
    const parameterid = ref('');
    const showTabs = ref(true);
    const tab = ref('general');
    const tabOptions = ref([{ name: 'general' }]);

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
            userid.value = data.session.user.id;
            useremail.value = data.session.user.email;
            if (route.params.pid) {
              parameter.value = true;
              parameterid.value = route.params.pid;
              showElements.value = true;
            } else {
              tab.value = 'new';
              tabOptions.value = ['new'];
              showElements.value = true;
            }
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

    function backButton() {
      if (window.history.state.back != null) {
        router.back();
      } else {
        router.replace({
          name: 'setup-actions',
          params: { objectapiname: route.params.objectapiname },
        });
      }
    }

    return {
      showElements,
      maincolor,
      parameterid,
      showTabs,
      tab,
      tabOptions,
      backButton,
    };
  },
};
</script>
