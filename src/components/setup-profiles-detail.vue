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
  <blank-bar pbgcolor="bg-secondary" ptext="profiles"></blank-bar>
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
            pobject="profiles"
            psingular="profile"
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
                type: 'p',
                text: 'NOTICE: the url for guest users is yourdomain.com/#/guest/home',
                showcondition:
                  'lrecord.value[`api_name`] && (lrecord.value[`api_name`] == `unauthenticated` || lrecord.value[`api_name`].value == `unauthenticated`)',
              },
              {
                label: 'description',
                name: 'description',
                type: 'longtext',
                value: null,
                required: false,
              },
              {
                label: 'is_active',
                name: 'is_active',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                label: 'is_public',
                name: 'is_public',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'mfa_enabled',
                name: 'mfa_enabled',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'home_message',
                name: 'home_message',
                type: 'longtext',
                value: null,
                required: false,
                placeholder: true,
                placeholdervalue: '<h1>this is a message displayed on the home page</h1>',
              },
              {
                type: 'p',
                text: 'NOTICE: unauthenticated and public profiles are visible to everyone',
              },
            ]"
            pbacklink="setup-profiles"
            :pupdateobject="true"
            :pupdatepage="true"
            :pupdateaction="true"
            :pupdatepermission="true"
          ></detail-main>
        </div>
        <div v-if="tab == 'permissions'">
          <list-item
            :psetup="true"
            pidentifier="permission"
            pname="permission"
            pdetaillink="setup-permissions-detail"
            :ploaddata="true"
            pobject="permissions"
            porderby="permission"
            :pfilterdata="true"
            pfilterby="profile_id"
            :pfilter="parameterid"
            :pparam="true"
            pparamname="pprofileid"
            :pparamvalue="parameterid"
            :pshowaddbutton="true"
            paddbuttonurl="setup-permissions-detail"
            :paddbuttonparameter="true"
            paddbuttonparameterid="pprofileid"
            :paddbuttonparametervalue="parameterid"
            pmaincolor="secondary"
            psearchlabel="permission"
          ></list-item>
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
import ListItem from 'components/list-item.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
var $q;
export default {
  // name: 'ComponentName',
  components: { BlankBar, TabBar, DetailMain, ListItem },
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
    const tabOptions = ref([{ name: 'general' }, { name: 'permissions' }]);

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
          name: 'setup-profiles',
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
