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
  <blank-bar pbgcolor="bg-secondary" ptext="users"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <detail-main
          :psetup="true"
          pmaincolor="secondary"
          pobject="xusers"
          psingular="user"
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
              label: 'user_id',
              name: 'user_id',
              type: 'id',
              value: null,
              required: true,
              notEditable: false,
            },
            {
              type: 'p',
              text: 'NOTICE: this will be overwritten once the user signs up',
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
              label: 'profile (profile_id)',
              name: 'profile_id',
              type: 'relation',
              value: null,
              required: true,
              load: true,
              loadtable: 'profiles',
              loadcolumn: 'name',
              loadvalue: 'id',
              phideiframebutton: true,
            },
            {
              label: 'email (invite_email)',
              name: 'invite_email',
              type: 'text',
              value: null,
              required: true,
            },
            {
              label: 'secret (invite_secret)',
              name: 'invite_secret',
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
              label: 'is_active',
              name: 'is_active',
              type: 'bool',
              value: true,
              required: true,
            },
            {
              label: 'invite_open',
              name: 'invite_open',
              type: 'bool',
              value: true,
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
              label: 'skip puser creation (skip_puser)',
              name: 'skip_puser',
              type: 'bool',
              value: false,
              required: true,
            },
            {
              type: 'p',
              text: 'NOTICE: puser records are being used to look up users in the owner field',
            },
          ]"
          pbacklink="setup-users"
          :psilentelements="[
            {
              name: 'invite_open',
              value: true,
            },
          ]"
        ></detail-main>
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
  name: 'setup-users-detail',
  components: { BlankBar, TabBar, DetailMain },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const maincolor = ref('secondary');
    const userid = ref('');
    const useremail = ref('');
    const tab = ref('general');
    const tabOptions = ref(['general']);

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
            } else {
              tab.value = 'new';
              tabOptions.value = ['new'];
            }
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

    function backButton() {
      if (window.history.state.back != null) {
        router.back();
      } else {
        router.replace({ name: 'setup-users' });
      }
    }

    return {
      showElements,
      maincolor,
      tab,
      tabOptions,
      backButton,
    };
  },
};
</script>
