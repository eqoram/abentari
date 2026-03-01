<!--
copy over main-page.vue except for the checkIfUserIsLoggedIn() function
http://localhost:9200/#/guest/objects/c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b/
-->
<template>
  <q-page>
    <div style="margin: 0vw">
      <component :is="CommonComponent"></component>
    </div>
  </q-page>
</template>

<script>
import GuestHome from 'components/guest-home.vue';
import GuestObjectsDetail from 'components/guest-objects-detail.vue';
import GuestObjects from 'components/guest-objects.vue';
import MainHome from 'components/main-home.vue';
import MainObjectsDetail from 'components/main-objects-detail.vue';
import MainObjects from 'components/main-objects.vue';
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
import { copyToClipboard, useQuasar } from 'quasar';
import { defineComponent, ref, defineAsyncComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase, supabaseUrl, supabaseAnonKey } from '../helpers/supabase';
var $q;
export default defineComponent({
  name: 'guest-page',
  components: {
    GuestHome,
    GuestObjectsDetail,
    GuestObjects,
    MainHome,
    MainObjectsDetail,
    MainObjects,
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
  },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(true);
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
    });

    onMounted(() => {
      checkVersion();
    });

    const lversion = ref('');
    function checkVersion() {
      console.log('version: 0.1.2');
      fetch(window.location.origin + '/version.json?' + Date.now())
        .then((serverPromise) =>
          serverPromise.json().then((response) => {
            let lkey = 'version';
            let jsonversion = response.version;
            let lsversion = $q.localStorage.getItem(lkey);
            if (!lsversion || lsversion != jsonversion) {
              // here
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
            router.replace({ name: 'main-home' });
          } else {
            // user is NOT logged in
          }
        } catch (error) {
          console.log(error);
        } finally {
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
