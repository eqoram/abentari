<template>
  <q-page v-if="showElements">
    <div style="margin: 0vw">
      <component :is="CommonComponent"></component>
    </div>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div style="min-width: 100vw">
      <div style="margin-left: 45%; width: 10%">
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
      <div class="q-mt-lg" style="text-align: center">
        <p></p>
      </div>
    </div>
  </q-page>
</template>

<script>
import GuestObjectsDetail from 'components/guest-objects-detail.vue';
import GuestObjects from 'components/guest-objects.vue';
import MainHome from 'components/main-home.vue';
import MainPages from 'components/main-pages.vue';
import MainObjectsDetail from 'components/main-objects-detail.vue';
import MainObjects from 'components/main-objects.vue';
import UserMfaSetup from 'components/user-mfa-setup.vue';
import SetupFieldsDetail from 'components/setup-fields-detail.vue';
import SetupObjectsDetail from 'components/setup-objects-detail.vue';
import SetupObjects from 'components/setup-objects.vue';
import SetupPermissionsDetail from 'components/setup-permissions-detail.vue';
import SetupProfilesDetail from 'components/setup-profiles-detail.vue';
import SetupProfiles from 'components/setup-profiles.vue';
import SetupSettings from 'components/setup-settings.vue';
import SetupUsersDetail from 'components/setup-users-detail.vue';
import SetupUsers from 'components/setup-users.vue';
import CompSpinner from 'components/comp-spinner.vue';
import GuestHistory from 'components/guest-history.vue';
import GuestHome from 'components/guest-home.vue';
import GuestPages from 'components/guest-pages.vue';
import MainHistory from 'components/main-history.vue';
import Setupactions from 'components/setup-actions.vue';
import SetupactionsDetail from 'components/setup-actions-detail.vue';
import SetupCpermissions from 'components/setup-cpermissions.vue';
import SetupCpermissionsDetail from 'components/setup-cpermissions-detail.vue';
import SetupCsql from 'components/setup-csql.vue';
import SetupCsqlDetail from 'components/setup-csql-detail.vue';
import SetupGeneral from 'components/setup-general.vue';
import SetupHistory from 'components/setup-history.vue';
import SetupPages from 'components/setup-pages.vue';
import SetupPagesDetail from 'components/setup-pages-detail.vue';
import SetupApps from 'components/setup-apps.vue';
import SetupAppsDetail from 'components/setup-apps-detail.vue';
import SetupSettingsDetail from 'components/setup-settings-detail.vue';
import SetupRun from 'components/setup-run.vue';
import SetupRetrieve from 'components/setup-retrieve.vue';
import SetupDeploy from 'components/setup-deploy.vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { defineComponent, ref, defineAsyncComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase, supabaseUrl, supabaseAnonKey } from '../helpers/supabase';
var $q;
export default defineComponent({
  name: 'main-page',
  components: {
    GuestObjectsDetail,
    GuestObjects,
    MainHome,
    MainPages,
    MainObjectsDetail,
    MainObjects,
    UserMfaSetup,
    SetupFieldsDetail,
    SetupObjectsDetail,
    SetupObjects,
    SetupPermissionsDetail,
    SetupProfilesDetail,
    SetupProfiles,
    SetupSettings,
    SetupUsersDetail,
    SetupUsers,
    CompSpinner,
    GuestHistory,
    GuestHome,
    GuestPages,
    MainHistory,
    Setupactions,
    SetupactionsDetail,
    SetupCpermissions,
    SetupCpermissionsDetail,
    SetupCsql,
    SetupCsqlDetail,
    SetupGeneral,
    SetupHistory,
    SetupPages,
    SetupPagesDetail,
    SetupApps,
    SetupAppsDetail,
    SetupSettingsDetail,
    SetupRun,
    SetupRetrieve,
    SetupDeploy,
  },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const userid = ref('');
    const useremail = ref('');
    const luser = ref({});
    const lprofile = ref({});
    let CommonComponent;
    const lcomponent = ref(null);

    /*if (route.name.startsWith("object-")) {
      CommonComponent = defineAsyncComponent(() =>
        import("src/components/object-list.vue")
      );
    } else {
      CommonComponent = defineAsyncComponent(() =>
        import("components/" + route.name + ".vue")
      );
    }*/

    lcomponent.value = null;
    CommonComponent = defineAsyncComponent({
      loader: () =>
        //import("components/" + route.name + ".vue")

        import(`../components/${route.name}.vue`),

      delay: 400,
      loadingComponent: CompSpinner,
      error: (error) => console.log(error),
    });

    onMounted(() => {
      checkVersion();
    });

    const lversion = ref('');
    function checkVersion() {
      console.log('version: 0.1.1');
      fetch(window.location.origin + '/version.json?' + Date.now())
        .then((serverPromise) =>
          serverPromise.json().then((response) => {
            let lkey = 'version';
            let jsonversion = response.version;
            let lsversion = $q.localStorage.getItem(lkey);
            if (!lsversion || lsversion != jsonversion) {
              $q.localStorage.set(lkey, jsonversion);
              window.location.reload(true);
            } else {
              lversion.value = jsonversion;
            }
          }),
        )
        .finally((response) => {
          checkIfUserIsLoggedIn();
        });
    }

    function checkIfUserIsLoggedIn() {
      (async () => {
        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
            userid.value = data.session.user.id;
            useremail.value = data.session.user.email;
            getXUser();
            //showElements.value = true;
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

    function getXUser() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('xusers')
            .select('*')
            .eq('user_id', userid.value)
            .eq('is_active', true);

          if (error) throw error;

          let mobjects = [];
          if (data !== undefined && data != null && data.length > 0) {
            // found
            // console.log('a1');
            // console.log(data[0]);
            luser.value = data[0];
            getProfile();
          } else {
            //NOT found
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      })();
    }

    function getProfile() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', luser.value['profile_id'])
            .eq('is_active', true);

          if (error) throw error;

          let mobjects = [];
          if (data !== undefined && data != null && data.length > 0) {
            // found
            // console.log('a2');
            // console.log(data[0]);
            lprofile.value = data[0];
            checkMFA();
          } else {
            //NOT found
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      })();
    }

    function checkMFA() {
      (async () => {
        if (lprofile.value['mfa_enabled'] && !luser.value['mfa_enabled']) {
          if (route.name != 'user-mfa-setup') {
            router.replace({ name: 'user-mfa-setup' });
          } else {
            showElements.value = true;
          }
        } else if (luser.value['mfa_enabled']) {
          const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

          if (error) {
            console.error('Error getting AAL:', error);
            return;
          }

          const aal = data.currentLevel;

          if (aal === 'aal2') {
            // console.log('User is authenticated with MFA.');
            // console.log(aal);
            showElements.value = true;
          } else {
            // console.log('User is not authenticated with MFA.');
            // console.log(aal);
            router.replace({ name: 'start-mfa' });
          }
        } else {
          showElements.value = true;
        }
      })();
    }

    return {
      CommonComponent,
      showElements,
      lcomponent,
    };
  },
});
</script>
